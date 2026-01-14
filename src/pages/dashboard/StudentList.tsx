import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { getAllStudents, deleteStudent } from '../../api/students';
import { Student } from '../../types';
import { Button } from '../../components/ui/Button';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data on Load
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await deleteStudent(id);
      toast.success('Student deleted');
      loadStudents(); // Refresh list
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <Button className="w-auto gap-2">
          <Plus size={18} /> Add Student
        </Button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Mobile</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Age</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-6 py-4 text-gray-600">{student.email}</td>
                <td className="px-6 py-4 text-gray-600">{student.mobile || "N/A"}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {student.age} Years
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(student.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {students.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No students found. Add one to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;