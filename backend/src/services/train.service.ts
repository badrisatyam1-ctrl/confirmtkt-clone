import { prisma } from '../utils/prisma.util';

export class TrainService {
  /**
   * Search for available trains between origin and destination on a specific date
   */
  async searchTrains(originCity: string, destinationCity: string, date: string) {
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
          type: 'TRAIN'
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
            operator: true,
            seatLayouts: true
          }
        }
      }
    });

    // Format response and determine class availability summary
    return trips.map(trip => {
      // Define available classes based on seatLayouts associated with the train
      const availableClasses = trip.vehicle.seatLayouts.map(layout => layout.name); // e.g. ["1A", "2A", "3A", "SL"]
      
      return {
        id: trip.id,
        operator: trip.vehicle.operator.name,
        trainName: trip.vehicle.name, 
        trainNumber: trip.vehicle.registrationNumber,
        departureTime: trip.actualDeparture,
        arrivalTime: trip.actualArrival,
        duration: trip.route.estimatedDuration,
        availableClasses: availableClasses.length > 0 ? availableClasses : ['1A', '2A', '3A', 'SL'], // default fallback
        baseFare: trip.baseFare,
        originStation: trip.route.stops.find(s => s.order === 1)?.stop.name || originCity,
        destinationStation: trip.route.stops.find(s => s.order === trip.route.stops.length)?.stop.name || destinationCity
      };
    });
  }

  /**
   * Get availability for different classes of a specific train trip
   */
  async getAvailability(tripId: string) {
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

    // Get booked seats for this trip
    const bookedSeats = await prisma.bookingSeat.findMany({
      where: {
        booking: {
          tripId: tripId,
          status: { in: ['CONFIRMED', 'PENDING'] }
        }
      }
    });

    const bookedSeatIds = new Set(bookedSeats.map(bs => bs.seatId));

    const availabilityByClass: Record<string, { total: number, available: number, fare: number, status: string }> = {};

    trip.vehicle.seatLayouts.forEach(layout => {
      const totalSeats = layout.seats.length;
      const availableSeats = layout.seats.filter(s => s.isAvailable && !bookedSeatIds.has(s.id)).length;
      
      // Calculate fare: Base fare + average price offset of that class for simplicity
      const avgOffset = totalSeats > 0 
        ? layout.seats.reduce((sum, s) => sum + s.priceOffset, 0) / totalSeats 
        : 0;
      
      let status = 'AVAILABLE';
      if (availableSeats === 0) status = 'WL'; // Waitlist
      else if (availableSeats < 10) status = 'RAC';

      availabilityByClass[layout.name] = {
        total: totalSeats,
        available: availableSeats,
        fare: trip.baseFare + avgOffset,
        status: status === 'AVAILABLE' ? `AVL-${availableSeats}` : status
      };
    });

    return {
      tripId,
      trainName: trip.vehicle.name,
      trainNumber: trip.vehicle.registrationNumber,
      availability: availabilityByClass
    };
  }

  /**
   * Get the full schedule/stops of a train
   */
  async getTrainSchedule(tripId: string) {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
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
        vehicle: true
      }
    });

    if (!trip) throw new Error('Trip not found');

    // Mock timings based on start time and estimated time from origin
    const startTime = new Date(trip.actualDeparture).getTime();

    const schedule = trip.route.stops.map(routeStop => {
      const arrivalTime = new Date(startTime + (routeStop.estimatedTimeFromOrigin * 60000));
      const departureTime = new Date(arrivalTime.getTime() + 10 * 60000); // Assume 10 min halt

      return {
        stationCode: routeStop.stop.code,
        stationName: routeStop.stop.name,
        day: Math.floor(routeStop.estimatedTimeFromOrigin / 1440) + 1,
        arrivalTime: routeStop.order === 1 ? 'Starts' : arrivalTime.toISOString(),
        departureTime: routeStop.order === trip.route.stops.length ? 'Ends' : departureTime.toISOString(),
        distance: routeStop.distanceFromOrigin,
        haltTime: routeStop.order === 1 || routeStop.order === trip.route.stops.length ? 0 : 10
      };
    });

    return {
      trainNumber: trip.vehicle.registrationNumber,
      trainName: trip.vehicle.name,
      schedule
    };
  }
}
