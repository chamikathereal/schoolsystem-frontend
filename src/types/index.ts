// 1. User Interface (Matches your Backend User Entity)
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: 'PRINCIPAL' | 'TEACHER' | 'CLERK';
}

// 2. Auth Response (Matches Backend AuthResponse)
export interface AuthResponse {
  token: string;
}

// 3. Student Interface (Matches Backend StudentResponseDto)
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  address?: string;
  dob?: string;
  age?: number;
}