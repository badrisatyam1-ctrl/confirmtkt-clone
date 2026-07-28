import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.util';

export const checkPnrStatus = async (req: Request, res: Response) => {
  try {
    const { pnr } = req.params as { pnr: string };

    if (!pnr) {
      return res.status(400).json({ success: false, message: 'PNR number is required' });
    }

    const booking = await prisma.booking.findUnique({
      where: { bookingRef: pnr },
      include: {
        trip: {
          include: {
            vehicle: true,
            route: {
              include: {
                stops: { include: { stop: true } }
              }
            }
          }
        },
        passengers: {
          include: { passenger: true }
        },
        seats: {
          include: { seat: true }
        }
      }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Invalid PNR Number' });
    }

    // Map passenger to their seat (Assuming order matches)
    const passengerStatus = (booking as any).passengers.map((bp: any, index: number) => {
      const assignedSeat = (booking as any).seats[index]?.seat;
      return {
        name: `${bp.passenger.firstName} ${bp.passenger.lastName}`,
        age: bp.passenger.age,
        gender: bp.passenger.gender,
        bookingStatus: booking.status,
        currentStatus: booking.status === 'CONFIRMED' ? 'CNF' : booking.status,
        coach: assignedSeat ? assignedSeat.seatClass : 'N/A', // Using seatClass as a proxy for Coach for now
        berth: assignedSeat ? assignedSeat.seatNumber : 'N/A'
      };
    });

    const boardingStation = (booking as any).trip.route.stops.find((s: any) => s.stopId === booking.boardingStopId)?.stop.name || 'Origin';
    const droppingStation = (booking as any).trip.route.stops.find((s: any) => s.stopId === booking.droppingStopId)?.stop.name || 'Destination';

    const pnrDetails = {
      pnr: booking.bookingRef,
      trainNumber: (booking as any).trip.vehicle.registrationNumber,
      trainName: (booking as any).trip.vehicle.name,
      boardingDate: (booking as any).trip.actualDeparture,
      boardingStation,
      droppingStation,
      chartStatus: booking.status === 'CONFIRMED' ? 'Chart Prepared' : 'Chart Not Prepared',
      passengers: passengerStatus
    };

    res.status(200).json({
      success: true,
      data: pnrDetails
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch PNR status',
      error: error.message
    });
  }
};
