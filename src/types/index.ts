export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  servicename: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface AppointmentBooking {
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}