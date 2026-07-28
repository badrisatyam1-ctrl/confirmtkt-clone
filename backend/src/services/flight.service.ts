import { prisma } from '../utils/prisma.util';

export class FlightService {
  /**
   * Search for flights based on multiple segments (handles one-way, round-trip, multi-city)
   */
  async searchFlights(segments: { originCity: string, destinationCity: string, date: string }[]) {
    // For a real production app, we would query each segment and build complex itineraries
    // including layovers. For this implementation, we will query direct flights for each segment
    // and group them by the segment index.
    
    const results = await Promise.all(segments.map(async (seg, index) => {
      const searchDate = new Date(seg.date);
      
      const trips = await prisma.trip.findMany({
        where: {
          route: {
            originCity: { contains: seg.originCity, mode: 'insensitive' },
            destinationCity: { contains: seg.destinationCity, mode: 'insensitive' }
          },
          date: searchDate,
          vehicle: { type: 'FLIGHT' },
          status: { not: 'CANCELLED' }
        },
        include: {
          route: {
            include: {
              stops: { include: { stop: true }, orderBy: { order: 'asc' } }
            }
          },
          vehicle: {
            include: { operator: true, seatLayouts: true }
          }
        }
      });

      return {
        segmentIndex: index,
        origin: seg.originCity,
        destination: seg.destinationCity,
        date: seg.date,
        flights: trips.map(trip => {
          return {
            id: trip.id,
            airline: trip.vehicle.operator.name,
            airlineLogo: trip.vehicle.operator.logo,
            flightNumber: trip.vehicle.registrationNumber, // e.g. 6E-201
            aircraft: trip.vehicle.name, // e.g. Airbus A320
            departureTime: trip.actualDeparture,
            arrivalTime: trip.actualArrival,
            duration: trip.route.estimatedDuration, // in minutes
            baseFare: trip.baseFare,
            availableCapacity: trip.availableCapacity,
            originCode: trip.route.stops[0].stop.code,
            destinationCode: trip.route.stops[trip.route.stops.length - 1].stop.code,
            stops: trip.route.stops.length - 2 // Intermediate stops
          };
        })
      };
    }));

    return results;
  }

  /**
   * Get flight ancillaries (meals, baggage) based on the trip
   */
  async getFlightAncillaries(tripId: string) {
    // In a full DB schema, these would be queried from an Addon or Ancillary table.
    // For our implementation, we mock standard aviation ancillaries.
    return {
      tripId,
      meals: [
        { id: 'm1', name: 'Veg Sandwich + Juice', price: 250, type: 'VEG' },
        { id: 'm2', name: 'Chicken Wrap + Coffee', price: 350, type: 'NON_VEG' },
        { id: 'm3', name: 'Paneer Tikka Roll', price: 300, type: 'VEG' }
      ],
      baggage: [
        { id: 'b1', weight: '5 KG Extra', price: 1500 },
        { id: 'b2', weight: '10 KG Extra', price: 2800 },
        { id: 'b3', weight: '15 KG Extra', price: 4000 }
      ]
    };
  }

  /**
   * Get graphical seat layout for flights (Economy, Premium, Business)
   */
  async getSeatLayout(tripId: string) {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        vehicle: {
          include: {
            seatLayouts: {
              include: { seats: true }
            }
          }
        }
      }
    });

    if (!trip) throw new Error('Trip not found');

    const bookedSeats = await prisma.bookingSeat.findMany({
      where: {
        booking: { tripId: tripId, status: { in: ['CONFIRMED', 'PENDING'] } }
      }
    });

    const bookedSeatIds = new Set(bookedSeats.map(bs => bs.seatId));
    const layout = trip.vehicle.seatLayouts[0];
    if (!layout) throw new Error('Seat layout not configured for this aircraft');

    const seats = layout.seats.map(seat => ({
      id: seat.id,
      seatNumber: seat.seatNumber, // e.g. 1A, 1B, 12F
      row: seat.row,
      column: seat.column,
      seatClass: seat.seatClass, // ECONOMY, BUSINESS, FIRST_CLASS
      price: trip.baseFare + seat.priceOffset,
      isAvailable: !bookedSeatIds.has(seat.id) && seat.isAvailable
    }));

    return {
      layoutId: layout.id,
      name: layout.name, // e.g. Standard A320 Configuration
      rows: layout.rows,
      columns: layout.columns,
      seats
    };
  }
}
