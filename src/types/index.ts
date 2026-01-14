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

// 4. Login Request
// Add these to src/types/index.ts
export interface LoginRequest {
  email: string;
  password: string;
}

// 5. Register Request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'PRINCIPAL' | 'TEACHER';
}