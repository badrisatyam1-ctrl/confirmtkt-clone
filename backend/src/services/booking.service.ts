import { prisma } from '../utils/prisma.util';
import crypto from 'crypto';

export class BookingService {
  /**
   * Initiates a booking by locking the selected seats for a limited time (PENDING state).
   */
  async initiateBooking(userId: string, data: {
    tripId: string,
    seatIds: string[],
    boardingStopId: string,
    droppingStopId: string,
    passengers: { firstName: string, lastName: string, age: number, gender: any }[],
    contactEmail: string,
    contactPhone: string
  }) {
    // 1. Verify trip exists
    const trip = await prisma.trip.findUnique({
      where: { id: data.tripId }
    });
    if (!trip) throw new Error('Trip not found');

    // 2. Verify all seats are available
    const existingBookings = await prisma.bookingSeat.findMany({
      where: {
        seatId: { in: data.seatIds },
        booking: {
          tripId: data.tripId,
          status: { in: ['CONFIRMED', 'PENDING'] }
        }
      }
    });

    if (existingBookings.length > 0) {
      throw new Error('One or more selected seats are already booked or locked');
    }

    // 3. Calculate fare
    const seats = await prisma.seat.findMany({
      where: { id: { in: data.seatIds } }
    });

    let totalAmount = 0;
    const seatFares: { seatId: string, fare: number }[] = [];

    for (const seat of seats) {
      const fare = trip.baseFare + seat.priceOffset;
      totalAmount += fare;
      seatFares.push({ seatId: seat.id, fare });
    }

    const bookingRef = `BKG-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // 4. Create booking transaction
    const booking = await prisma.$transaction(async (tx) => {
      // Create passengers
      const createdPassengers = await Promise.all(data.passengers.map(p => 
        tx.passenger.create({ data: p })
      ));

      // Create booking record
      const b = await tx.booking.create({
        data: {
          bookingRef,
          userId,
          tripId: data.tripId,
          boardingStopId: data.boardingStopId,
          droppingStopId: data.droppingStopId,
          status: 'PENDING',
          totalAmount,
          finalAmount: totalAmount,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          
          // Connect passengers
          passengers: {
            create: createdPassengers.map(p => ({
              passengerId: p.id
            }))
          },
          
          // Connect seats
          seats: {
            create: seatFares.map(sf => ({
              seatId: sf.seatId,
              fare: sf.fare
            }))
          }
        }
      });

      return b;
    });

    return booking;
  }

  /**
   * Generates a 10 digit standard PNR for train bookings
   */
  private generatePNR(): string {
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000);
    return pnr.toString();
  }

  /**
   * Initiates a Train booking by automatically assigning seats/berths based on requested class
   */
  async initiateTrainBooking(userId: string, data: {
    tripId: string,
    seatClass: string, // e.g. "3A", "SL"
    passengers: { firstName: string, lastName: string, age: number, gender: any, berthPreference?: string }[],
    contactEmail: string,
    contactPhone: string
  }) {
    // 1. Verify trip
    const trip = await prisma.trip.findUnique({
      where: { id: data.tripId },
      include: {
        vehicle: {
          include: {
            seatLayouts: {
              where: { name: data.seatClass },
              include: { seats: true }
            }
          }
        },
        route: {
          include: { stops: { include: { stop: true }, orderBy: { order: 'asc' } } }
        }
      }
    });

    if (!trip) throw new Error('Trip not found');
    const layout = trip.vehicle.seatLayouts[0];
    if (!layout) throw new Error(`Class ${data.seatClass} not found on this train`);

    // 2. Find available seats
    const bookedSeats = await prisma.bookingSeat.findMany({
      where: {
        booking: { tripId: data.tripId, status: { in: ['CONFIRMED', 'PENDING'] } }
      }
    });
    const bookedSeatIds = new Set(bookedSeats.map(bs => bs.seatId));

    let availableSeats = layout.seats.filter(s => s.isAvailable && !bookedSeatIds.has(s.id));
    
    if (availableSeats.length < data.passengers.length) {
      throw new Error(`Only ${availableSeats.length} seats available in ${data.seatClass}. Try WL or RAC options (not implemented).`);
    }

    // Allocate seats
    const allocatedSeats = availableSeats.slice(0, data.passengers.length);
    let totalAmount = 0;
    
    const seatFares = allocatedSeats.map(seat => {
      const fare = trip.baseFare + seat.priceOffset;
      totalAmount += fare;
      return { seatId: seat.id, fare };
    });

    const pnrNumber = this.generatePNR();

    // 4. Create booking transaction
    const booking = await prisma.$transaction(async (tx) => {
      const createdPassengers = await Promise.all(data.passengers.map(p => 
        tx.passenger.create({ data: {
          firstName: p.firstName,
          lastName: p.lastName,
          age: p.age,
          gender: p.gender
        }})
      ));

      // Origin and Destination stops
      const boardingStopId = trip.route.stops[0].stop.id;
      const droppingStopId = trip.route.stops[trip.route.stops.length - 1].stop.id;

      const b = await tx.booking.create({
        data: {
          bookingRef: pnrNumber, // Use PNR as the booking reference for trains
          userId,
          tripId: data.tripId,
          boardingStopId,
          droppingStopId,
          status: 'PENDING',
          totalAmount,
          finalAmount: totalAmount,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          
          passengers: {
            create: createdPassengers.map(p => ({ passengerId: p.id }))
          },
          seats: {
            create: seatFares
          }
        }
      });

      return b;
    });

    return booking;
  }

  /**
   * Generates a standard 6-character alphanumeric aviation PNR
   */
  private generateFlightPNR(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    for (let i = 0; i < 6; i++) {
      pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
  }

  /**
   * Initiates a Flight booking, handling multiple segments (e.g. Round Trip) and ancillaries.
   */
  async initiateFlightBooking(userId: string, data: {
    segments: {
      tripId: string,
      seatIds: string[],
      boardingStopId: string,
      droppingStopId: string,
    }[],
    passengers: { firstName: string, lastName: string, age: number, gender: any, passportNumber?: string }[],
    contactEmail: string,
    contactPhone: string,
    ancillaries?: { meals: any[], baggage: any[] } // Stored in metadata
  }) {
    
    // Calculate total base fare and seat offsets across all segments
    let totalAmount = 0;
    const seatFares: { seatId: string, fare: number }[] = [];

    // Verify all trips and seats
    for (const segment of data.segments) {
      const trip = await prisma.trip.findUnique({ where: { id: segment.tripId } });
      if (!trip) throw new Error(`Trip ${segment.tripId} not found`);

      const seats = await prisma.seat.findMany({ where: { id: { in: segment.seatIds } } });
      if (seats.length !== segment.seatIds.length) throw new Error(`Some seats not found in trip ${segment.tripId}`);

      const existingBookings = await prisma.bookingSeat.findMany({
        where: { seatId: { in: segment.seatIds }, booking: { tripId: segment.tripId, status: { in: ['CONFIRMED', 'PENDING'] } } }
      });

      if (existingBookings.length > 0) throw new Error('One or more selected seats are already booked on segment ' + segment.tripId);

      for (const seat of seats) {
        const fare = trip.baseFare + seat.priceOffset;
        totalAmount += fare;
        seatFares.push({ seatId: seat.id, fare });
      }
    }

    // Add ancillaries cost
    let ancillaryCost = 0;
    if (data.ancillaries) {
      data.ancillaries.meals.forEach(m => ancillaryCost += m.price);
      data.ancillaries.baggage.forEach(b => ancillaryCost += b.price);
    }
    totalAmount += ancillaryCost;

    const flightPNR = this.generateFlightPNR();

    // Create booking transaction (For simplicity, we create one master booking linking to the first segment, 
    // but a real multi-segment system would create a Parent Booking and Child Segment Bookings).
    // Using the first segment as the primary tripId here for the demo schema compatibility.
    
    const primarySegment = data.segments[0];

    const booking = await prisma.$transaction(async (tx) => {
      const createdPassengers = await Promise.all(data.passengers.map(p => 
        tx.passenger.create({ data: {
          firstName: p.firstName,
          lastName: p.lastName,
          age: p.age,
          gender: p.gender,
          idProofType: p.passportNumber ? 'PASSPORT' : null,
          idProofNumber: p.passportNumber
        }})
      ));

      const b = await tx.booking.create({
        data: {
          bookingRef: flightPNR,
          userId,
          tripId: primarySegment.tripId, // Assuming master trip record
          boardingStopId: primarySegment.boardingStopId,
          droppingStopId: primarySegment.droppingStopId,
          status: 'PENDING',
          totalAmount,
          finalAmount: totalAmount,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          
          passengers: {
            create: createdPassengers.map(p => ({ passengerId: p.id }))
          },
          seats: {
            create: seatFares
          }
        }
      });

      // We'll store multi-segment references and ancillaries in a separate table or metadata if schema allowed.
      // For this implementation, the primary segment and seats cover the core flow.

      return b;
    });

    return booking;
  }

  /**
   * Applies a coupon code to a PENDING booking
   */
  async applyCoupon(bookingId: string, couponCode: string) {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new Error('Booking not found');
    if (booking.status !== 'PENDING') throw new Error('Cannot apply coupon to non-pending booking');

    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });
    if (!coupon || !coupon.isActive) throw new Error('Invalid or expired coupon');

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) throw new Error('Coupon is expired');
    if (coupon.usageLimit > 0 && coupon.currentUsage >= coupon.usageLimit) throw new Error('Coupon usage limit reached');
    if (booking.totalAmount < coupon.minBookingAmount) throw new Error(`Minimum booking amount of ${coupon.minBookingAmount} required`);

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'FIXED') {
      discount = coupon.discountValue;
    } else if (coupon.discountType === 'PERCENTAGE') {
      discount = (booking.totalAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    const finalAmount = booking.totalAmount - discount;

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        discountAmount: discount,
        finalAmount: finalAmount > 0 ? finalAmount : 0,
        couponId: coupon.id
      }
    });

    return updatedBooking;
  }

  /**
   * Confirms a booking after successful payment
   */
  async confirmBooking(bookingId: string, paymentDetails: { providerRefId: string, amount: number, provider: string }) {
    return prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({ 
        where: { id: bookingId },
        include: { coupon: true }
      });
      
      if (!booking) throw new Error('Booking not found');
      if (booking.status === 'CONFIRMED') return booking; // Already confirmed

      // 1. Create Payment record
      await tx.payment.create({
        data: {
          bookingId,
          amount: paymentDetails.amount,
          provider: paymentDetails.provider,
          providerRefId: paymentDetails.providerRefId,
          status: 'SUCCEEDED'
        }
      });

      // 2. Update booking status
      const confirmedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: 'CONFIRMED' }
      });

      // 3. Create Invoice
      await tx.invoice.create({
        data: {
          invoiceNumber: `INV-${booking.bookingRef}`,
          bookingId,
          totalAmount: booking.finalAmount,
          taxAmount: booking.finalAmount * 0.18 // Assuming 18% GST for example
        }
      });

      // 4. Update coupon usage
      if (booking.couponId) {
        await tx.coupon.update({
          where: { id: booking.couponId },
          data: { currentUsage: { increment: 1 } }
        });
      }

      // 5. Update Trip capacity
      const seatCount = await tx.bookingSeat.count({ where: { bookingId } });
      await tx.trip.update({
        where: { id: booking.tripId },
        data: { availableCapacity: { decrement: seatCount } }
      });

      return confirmedBooking;
    });
  }

  /**
   * Cancels a booking and initiates refund process
   */
  async cancelBooking(bookingId: string, userId: string) {
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId }
    });

    if (!booking) throw new Error('Booking not found');
    if (booking.status === 'CANCELLED') throw new Error('Booking is already cancelled');
    if (booking.status !== 'CONFIRMED') throw new Error('Can only cancel confirmed bookings');

    return prisma.$transaction(async (tx) => {
      // 1. Update booking status
      const cancelled = await tx.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' }
      });

      // 2. Update trip capacity
      const seatCount = await tx.bookingSeat.count({ where: { bookingId } });
      await tx.trip.update({
        where: { id: booking.tripId },
        data: { availableCapacity: { increment: seatCount } }
      });

      // Note: Actual refund gateway logic would go here. 
      // For this system, we create a PENDING refund record.
      const payment = await tx.payment.findUnique({ where: { bookingId } });
      if (payment) {
        await tx.refund.create({
          data: {
            paymentId: payment.id,
            amount: payment.amount, // Full refund for simplicity; actual logic requires policy check
            status: 'PENDING',
            reason: 'User initiated cancellation'
          }
        });
      }

      return cancelled;
    });
  }

  async getUserBookings(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        trip: {
          include: {
            route: true,
            vehicle: { include: { operator: true } }
          }
        },
        seats: { include: { seat: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
