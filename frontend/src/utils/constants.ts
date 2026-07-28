/**
 * Application-wide constants.
 */

export const APP_CONSTANTS = {
  ITEMS_PER_PAGE: 20,
  MAX_PASSENGERS: 6,
  MAX_SEATS_PER_BOOKING: 6,
  OTP_LENGTH: 6,
  OTP_EXPIRY_SECONDS: 300,
  TOKEN_REFRESH_THRESHOLD_MS: 60_000, // Refresh token 1 minute before expiry
  SEARCH_DEBOUNCE_MS: 300,
  MAP_ANIMATION_DURATION_MS: 1500,
  TOAST_DURATION_MS: 4000,
} as const;

export const BUS_AMENITIES = [
  'WiFi',
  'Charging Point',
  'Blanket',
  'Water Bottle',
  'Reading Light',
  'TV',
  'Snacks',
  'Track My Bus',
  'Emergency Exit',
  'First Aid Kit',
  'Fire Extinguisher',
  'CCTV',
  'Hammer',
  'Air Suspension',
  'Toilet',
] as const;

export const SORT_OPTIONS = [
  { value: 'price', label: 'Price: Low to High', order: 'asc' as const },
  { value: 'price', label: 'Price: High to Low', order: 'desc' as const },
  { value: 'departure', label: 'Departure: Earliest', order: 'asc' as const },
  { value: 'departure', label: 'Departure: Latest', order: 'desc' as const },
  { value: 'duration', label: 'Duration: Shortest', order: 'asc' as const },
  { value: 'rating', label: 'Rating: Highest', order: 'desc' as const },
] as const;

export const POPULAR_ROUTES = [
  { origin: 'Bangalore', destination: 'Chennai' },
  { origin: 'Mumbai', destination: 'Pune' },
  { origin: 'Delhi', destination: 'Jaipur' },
  { origin: 'Hyderabad', destination: 'Bangalore' },
  { origin: 'Chennai', destination: 'Coimbatore' },
  { origin: 'Kolkata', destination: 'Siliguri' },
  { origin: 'Ahmedabad', destination: 'Mumbai' },
  { origin: 'Bangalore', destination: 'Goa' },
] as const;
