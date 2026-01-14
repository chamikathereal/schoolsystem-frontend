import api from './axiosConfig';
import type { Student } from '../types';
// import { Student } from '../types';

// Fetch all students
export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students');
  return response.data;
};

// Create a new student (We omit 'id' and 'age' because Backend generates them)
export const createStudent = async (data: Omit<Student, 'id' | 'age'>): Promise<Student> => {
  const response = await api.post<Student>('/students', data);
  return response.data;
};

// Update a student
export const updateStudent = async (id: number, data: Omit<Student, 'id' | 'age'>): Promise<Student> => {
  const response = await api.put<Student>(`/students/${id}`, data);
  return response.data;
};

// Delete a student
export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};