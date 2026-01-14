import api from './axiosConfig';
import { Student } from '../types';

// Fetch all students
export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students');
  return response.data;
};

// Delete a student (We will use this later)
export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};