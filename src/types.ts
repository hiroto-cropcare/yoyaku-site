export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export type AvailabilityStatus = 'low' | 'medium' | 'high' | 'full';

export interface TimeSlot {
  id: number;
  date: string;
  time: string;
  availability: AvailabilityStatus;
  remainingCapacity: number;
}

export interface OrderInfo {
  name: string;
  livename: string;
  email: string;
  phone: string;
  profile_url: string;
  paymentMethod: 'card' | 'paypay';
  memo?: string;
  booth_number?: string;
}