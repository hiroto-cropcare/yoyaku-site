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
  phone: string;
  email: string;
  paymentMethod: 'card' | 'paypay';
}