import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SearchParams, Seat } from '@/types';

interface BookingState {
  // Search
  searchParams: SearchParams | null;

  // Selected trip
  selectedTripId: string | null;

  // Seat selection
  selectedSeats: Seat[];

  // Boarding & dropping points
  boardingStopId: string | null;
  droppingStopId: string | null;

  // Passenger info
  passengers: Array<{
    name: string;
    age: number;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    seatId: string;
  }>;

  // Contact info
  contactEmail: string;
  contactPhone: string;

  // Coupon
  couponCode: string | null;
  discountAmount: number;

  // Actions
  setSearchParams: (params: SearchParams) => void;
  setSelectedTrip: (tripId: string) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clearSeats: () => void;
  setBoardingStop: (stopId: string) => void;
  setDroppingStop: (stopId: string) => void;
  setPassengers: (passengers: BookingState['passengers']) => void;
  setContactInfo: (email: string, phone: string) => void;
  setCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
  resetBooking: () => void;

  // Computed
  getTotalFare: () => number;
  getFinalAmount: () => number;
}

const initialState = {
  searchParams: null,
  selectedTripId: null,
  selectedSeats: [],
  boardingStopId: null,
  droppingStopId: null,
  passengers: [],
  contactEmail: '',
  contactPhone: '',
  couponCode: null,
  discountAmount: 0,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSearchParams: (searchParams) => set({ searchParams }),

      setSelectedTrip: (selectedTripId) =>
        set({ selectedTripId, selectedSeats: [], passengers: [] }),

      addSeat: (seat) =>
        set((state) => ({
          selectedSeats: [...state.selectedSeats, seat],
        })),

      removeSeat: (seatId) =>
        set((state) => ({
          selectedSeats: state.selectedSeats.filter((s) => s.id !== seatId),
          passengers: state.passengers.filter((p) => p.seatId !== seatId),
        })),

      clearSeats: () => set({ selectedSeats: [], passengers: [] }),

      setBoardingStop: (boardingStopId) => set({ boardingStopId }),

      setDroppingStop: (droppingStopId) => set({ droppingStopId }),

      setPassengers: (passengers) => set({ passengers }),

      setContactInfo: (contactEmail, contactPhone) => set({ contactEmail, contactPhone }),

      setCoupon: (couponCode, discountAmount) => set({ couponCode, discountAmount }),

      clearCoupon: () => set({ couponCode: null, discountAmount: 0 }),

      resetBooking: () => set(initialState),

      getTotalFare: () => {
        const { selectedSeats } = get();
        return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
      },

      getFinalAmount: () => {
        const { discountAmount } = get();
        const totalFare = get().getTotalFare();
        return Math.max(0, totalFare - discountAmount);
      },
    }),
    {
      name: 'travelbooking-booking',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
