import { Request, Response } from 'express';
import { FlightService } from '../services/flight.service';

const flightService = new FlightService();

export const searchFlights = async (req: Request, res: Response) => {
  try {
    const segmentsRaw = req.query.segments; // Expecting a JSON string of segments array

    if (!segmentsRaw) {
      return res.status(400).json({ 
        success: false, 
        message: 'Segments query parameter is required' 
      });
    }

    const segments = JSON.parse(segmentsRaw as string);

    const flights = await flightService.searchFlights(segments);

    res.status(200).json({
      success: true,
      data: flights
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to search flights',
      error: error.message
    });
  }
};

export const getFlightAncillaries = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params;
    const ancillaries = await flightService.getFlightAncillaries(tripId as string);

    res.status(200).json({
      success: true,
      data: ancillaries
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch flight ancillaries',
      error: error.message
    });
  }
};

export const getSeatLayout = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params;
    const layout = await flightService.getSeatLayout(tripId as string);

    res.status(200).json({
      success: true,
      data: layout
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch flight seat layout',
      error: error.message
    });
  }
};
