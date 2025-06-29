const API_BASE_URL = 'http://192.168.0.100:8081';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth APIs
export const authApi = {
  login: (data: { username: string; password: string }) =>
    apiRequest('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: { username: string; email: string; password: string; phone: string }) =>
    apiRequest('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Service APIs
export const serviceApi = {
  getAllServices: () => apiRequest('/service/AllService'),
  
  updateSlotByDate: (date: string) =>
    apiRequest(`/service/update/${date}`, { method: 'PUT' }),
  
  getTimeSlots: (date: string) =>
    apiRequest(`/service/${date}/allTimeSlots`),
};

// Appointment APIs
export const appointmentApi = {
  bookAppointment: (data: {
    userId: string;
    serviceId: string;
    date: string;
    time: string;
    notes?: string;
  }) =>
    apiRequest('/enquiry/Appointment', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserAppointments: (userId: string) =>
    apiRequest(`/user/appointments/${userId}`),

  cancelAppointment: (appointmentId: string) =>
    apiRequest(`/enquiry/${appointmentId}/cancel`, { method: 'PUT' }),
};

// User APIs
export const userApi = {
  getProfile: (userId: string) => apiRequest(`/user/${userId}`),
  
  updateProfile: (userId: string, data: any) =>
    apiRequest(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};