import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
// Stripe is not strictly installed in backend, but we mock the integration conceptually, 
// or require actual stripe if needed. We will mock the intent generation for now.

const bookingService = new BookingService();

export const initiateBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const booking = await bookingService.initiateBooking(userId, req.body);
    
    res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const applyCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const updatedBooking = await bookingService.applyCoupon(id as string, code);
    
    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // In a real app, you fetch the booking, check the finalAmount, and call stripe.paymentIntents.create
    // For this demonstration, we return a mock client_secret
    
    res.status(200).json({ 
      success: true, 
      clientSecret: 'pi_mock_secret_' + id 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create payment intent' });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { providerRefId, amount, provider } = req.body;

    const confirmedBooking = await bookingService.confirmBooking(id as string, {
      providerRefId, amount, provider
    });

    // Mock Notifications
    console.log(`[EMAIL] Ticket confirmed for booking ${confirmedBooking.bookingRef}. Sent to ${confirmedBooking.contactEmail}`);
    console.log(`[SMS] Booking ${confirmedBooking.bookingRef} successful. SMS sent to ${confirmedBooking.contactPhone}`);

    res.status(200).json({ success: true, data: confirmedBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    const cancelledBooking = await bookingService.cancelBooking(id as string, userId);

    res.status(200).json({ success: true, data: cancelledBooking, message: 'Booking cancelled successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const bookings = await bookingService.getUserBookings(userId);

    res.status(200).json({ success: true, data: bookings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};
