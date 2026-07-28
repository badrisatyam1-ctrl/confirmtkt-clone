import { Request, Response } from 'express';
import { TrainService } from '../services/train.service';

const trainService = new TrainService();

export const searchTrains = async (req: Request, res: Response) => {
  try {
    const { origin, destination, date } = req.query;

    if (!origin || !destination || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Origin, destination, and date are required' 
      });
    }

    const trains = await trainService.searchTrains(
      origin as string, 
      destination as string, 
      date as string
    );

    res.status(200).json({
      success: true,
      data: trains
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to search trains',
      error: error.message
    });
  }
};

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params;

    const availability = await trainService.getAvailability(tripId as string);

    res.status(200).json({
      success: true,
      data: availability
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch availability',
      error: error.message
    });
  }
};

export const getSchedule = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params;

    const schedule = await trainService.getTrainSchedule(tripId as string);

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch schedule',
      error: error.message
    });
  }
};
