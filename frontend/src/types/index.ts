// ===========================
// User & Auth Types
// ===========================
export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  roles: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}

// ===========================
// Operator & Bus Types
// ===========================

export interface Operator {
  id: string;
  name: string;
  logo: string | null;
  contactEmail: string;
  contactPhone: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
}

export interface Bus {
  id: string;
  operatorId: string;
  operator: Operator;
  name: string;
  registrationNumber: string;
  type: BusType;
  totalSeats: number;
  amenities: string[];
  images: string[];
  layout: BusLayout;
}

export enum BusType {
  AC_SLEEPER = 'AC_SLEEPER',
  NON_AC_SLEEPER = 'NON_AC_SLEEPER',
  AC_SEATER = 'AC_SEATER',
  NON_AC_SEATER = 'NON_AC_SEATER',
  VOLVO_AC = 'VOLVO_AC',
  LUXURY = 'LUXURY',
}

export interface BusLayout {
  id: string;
  rows: number;
  columns: number;
  upperDeck: boolean;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: string;
  type: SeatType;
  price: number;
  row: number;
  column: number;
  deck: 'LOWER' | 'UPPER';
  isAvailable: boolean;
}

export enum SeatType {
  SEATER = 'SEATER',
  SLEEPER = 'SLEEPER',
  SEMI_SLEEPER = 'SEMI_SLEEPER',
}

// ===========================
// Route & Trip Types
// ===========================

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedDuration: number; // in minutes
  stops: RouteStop[];
}

export interface Stop {
  id: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  address: string;
  landmark: string | null;
}

export interface RouteStop {
  id: string;
  stop: Stop;
  order: number;
  distanceFromOrigin: number;
  estimatedTimeFromOrigin: number;
}

export interface Trip {
  id: string;
  routeId: string;
  route: Route;
  bus: Bus;
  departureTime: string;
  arrivalTime: string;
  date: string;
  status: TripStatus;
  baseFare: number;
  availableSeats: number;
  totalSeats: number;
  boardingPoints: RouteStop[];
  droppingPoints: RouteStop[];
  cancellationPolicy: CancellationPolicy;
}

export enum TripStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CancellationPolicy {
  rules: Array<{
    hoursBeforeDeparture: number;
    refundPercentage: number;
  }>;
}

// ===========================
// Booking Types
// ===========================

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  tripId: string;
  trip: Trip;
  boardingStop: Stop;
  droppingStop: Stop;
  passengers: BookingPassenger[];
  status: BookingStatus;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  couponCode: string | null;
  contactEmail: string;
  contactPhone: string;
  payment: Payment | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingPassenger {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  seatNumber: string;
  seatType: SeatType;
  fare: number;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

// ===========================
// Payment Types
// ===========================

export interface Payment {
  id: string;
  bookingId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  refundAmount: number | null;
  refundedAt: string | null;
  createdAt: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

// ===========================
// Search Types
// ===========================

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers?: number;
  busType?: BusType;
  sortBy?: 'price' | 'departure' | 'arrival' | 'duration' | 'rating';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  operatorIds?: string[];
  page?: number;
  limit?: number;
}

// ===========================
// Common Types
// ===========================

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// ===========================
// Notification Types
// ===========================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  isRead: boolean;
  data: Record<string, unknown>;
  createdAt: string;
}

export enum NotificationType {
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  REFUND_PROCESSED = 'REFUND_PROCESSED',
  TRIP_REMINDER = 'TRIP_REMINDER',
  TRIP_DELAYED = 'TRIP_DELAYED',
  PROMOTION = 'PROMOTION',
}

// ===========================
// Coupon Types
// ===========================

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minBookingAmount: number;
  maxDiscountAmount: number | null;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}
