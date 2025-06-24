
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number; // in USD
  imageUrl: string;
  category: ServiceCategory;
}

export enum ServiceCategory {
  AIRPORT_RIDE = "Airport Ride",
  TOUR_EXPERIENCE = "Tour Experience",
  ART_TOUR = "Art Tour",
}

export interface AirportRide extends Service {
  vehicleType: string;
  capacity: number; // Max passengers
}

export interface Tour extends Service {
  duration: string; // e.g., "4 hours", "Full Day"
  highlights: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  bookingDate: string; 
  numberOfPeople: number;
  notes?: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number; // 0-5
  message: string;
  timestamp: Date;
  serviceUsed?: string; // Optional: which service they are giving feedback for
}

export interface NavItem {
  label: string;
  path: string;
}