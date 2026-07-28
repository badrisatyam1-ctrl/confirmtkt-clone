import { prisma } from '../utils/prisma.util';

export class BusService {
  /**
   * Search for available bus trips between origin and destination on a specific date
   */
  async searchTrips(originCity: string, destinationCity: string, date: string) {
    const searchDate = new Date(date);
    
    // Find routes matching origin and destination
    const trips = await prisma.trip.findMany({
      where: {
        route: {
          originCity: {
            contains: originCity,
            mode: 'insensitive'
          },
          destinationCity: {
            contains: destinationCity,
            mode: 'insensitive'
          }
        },
        date: searchDate,
        vehicle: {
          type: 'BUS'
        },
        status: {
          not: 'CANCELLED'
        }
      },
      include: {
        route: {
          include: {
            stops: {
              include: {
                stop: true
              },
              orderBy: {
                order: 'asc'
              }
            }
          }
        },
        vehicle: {
          include: {
            operator: true
          }
        },
        reviews: true
      }
    });

    // Calculate aggregated ratings and format response
    return trips.map(trip => {
      const avgRating = trip.reviews.length > 0 
        ? trip.reviews.reduce((acc, rev) => acc + rev.rating, 0) / trip.reviews.length 
        : 4.0; // default rating for new trips

      return {
        id: trip.id,
        operator: trip.vehicle.operator.name,
        busType: trip.vehicle.name, // e.g., "Volvo Multi-Axle I-Shift B11R Sleeper"
        amenities: trip.vehicle.amenities,
        departureTime: trip.actualDeparture,
        arrivalTime: trip.actualArrival,
        duration: trip.route.estimatedDuration,
        baseFare: trip.baseFare,
        availableSeats: trip.availableCapacity,
        rating: avgRating.toFixed(1),
        totalReviews: trip.reviews.length,
        boardingPoints: trip.route.stops.filter(s => s.order < trip.route.stops.length),
        droppingPoints: trip.route.stops.filter(s => s.order > 1)
      };
    });
  }

  /**
   * Get the seat layout for a specific vehicle and trip, including live availability
   */
  async getSeatLayout(tripId: string) {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        vehicle: {
          include: {
            seatLayouts: {
              include: {
                seats: true
              }
            }
          }
        }
      }
    });

    if (!trip) throw new Error('Trip not found');

    // Get all booked/locked seats for this trip
    const bookedSeats = await prisma.bookingSeat.findMany({
      where: {
        booking: {
          tripId: tripId,
          status: {
            in: ['CONFIRMED', 'PENDING'] // PENDING locks the seat temporarily
          }
        }
      }
    });

    const bookedSeatIds = new Set(bookedSeats.map(bs => bs.seatId));

    // Format layout with availability
    const layout = trip.vehicle.seatLayouts[0]; // Assuming 1 layout per vehicle for simplicity
    if (!layout) throw new Error('Seat layout not configured for this vehicle');

    const seats = layout.seats.map(seat => ({
      id: seat.id,
      seatNumber: seat.seatNumber,
      row: seat.row,
      column: seat.column,
      seatClass: seat.seatClass, // SLEEPER, SEATER, etc.
      price: trip.baseFare + seat.priceOffset,
      isAvailable: !bookedSeatIds.has(seat.id) && seat.isAvailable,
      isLadiesOnly: false // Could be extracted from seat metadata
    }));

    return {
      layoutId: layout.id,
      name: layout.name,
      rows: layout.rows,
      columns: layout.columns,
      seats
    };
  }
}
