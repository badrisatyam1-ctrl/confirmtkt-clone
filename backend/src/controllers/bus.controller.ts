import { Request, Response } from 'express';
import { BusService } from '../services/bus.service';

const busService = new BusService();

export const searchBuses = async (req: Request, res: Response) => {
  try {
    const { origin, destination, date } = req.query;

    if (!origin || !destination || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Origin, destination, and date are required' 
      });
    }

    const trips = await busService.searchTrips(
      origin as string, 
      destination as string, 
      date as string
    );

    res.status(200).json({
      success: true,
      data: trips
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to search buses',
      error: error.message
    });
  }
};

export const getSeatLayout = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params;

    const layout = await busService.getSeatLayout(tripId as string);

    res.status(200).json({
      success: true,
      data: layout
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seat layout',
      error: error.message
    });
  }
};
