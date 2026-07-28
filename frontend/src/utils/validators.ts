/**
 * Validation utility functions used across the application.
 */

export const validators = {
  email: (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  phone: (value: string): boolean => /^(\+91)?[6-9]\d{9}$/.test(value.replace(/\s/g, '')),

  otp: (value: string): boolean => /^\d{6}$/.test(value),

  name: (value: string): boolean => value.trim().length >= 2 && value.trim().length <= 100,

  age: (value: number): boolean => value >= 1 && value <= 120,

  password: (value: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),

  couponCode: (value: string): boolean => /^[A-Z0-9]{4,20}$/.test(value),
} as const;

/**
 * Error message constants for form validation.
 */
export const validationMessages = {
  required: (field: string) => `${field} is required`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid Indian mobile number',
  otp: 'OTP must be a 6-digit number',
  name: 'Name must be between 2 and 100 characters',
  age: 'Age must be between 1 and 120',
  password:
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character',
  couponCode: 'Coupon code must be 4-20 uppercase alphanumeric characters',
} as const;
