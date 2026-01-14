import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { createStudent, updateStudent } from '../../api/students'; // Import update
import type { Student } from '../../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  studentToEdit?: Student | null; // <--- NEW PROP: The student we want to edit
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, onSuccess, studentToEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    mobile: '',
    address: ''
  });

  // <--- NEW: Populate form when "studentToEdit" changes
  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        firstName: studentToEdit.firstName,
        lastName: studentToEdit.lastName,
        email: studentToEdit.email,
        dob: studentToEdit.dob || '', // Ensure DOB is handled
        mobile: studentToEdit.mobile || '',
        address: studentToEdit.address || ''
      });
    } else {
      // Reset if we are adding a new student
      setFormData({ firstName: '', lastName: '', email: '', dob: '', mobile: '', address: '' });
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (studentToEdit) {
        // <--- EDIT MODE
        await updateStudent(studentToEdit.id, formData);
        toast.success('Student updated successfully!');
      } else {
        // <--- ADD MODE
        await createStudent(formData);
        toast.success('Student added successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
        console.error(error);
        if (error.response?.status === 409) {
            toast.error('Email already exists!');
        } else {
            toast.error('Operation failed. Please try again.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">
            {studentToEdit ? 'Edit Student' : 'New Student'} {/* Dynamic Title */}
          </h2>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" required value={formData.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" required value={formData.lastName} onChange={handleChange} />
          </div>

          {/* Email is typically read-only during edit in strict systems, but we'll allow it here */}
          <Input label="Email Address" name="email" type="email" required value={formData.email} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Date of Birth" name="dob" type="date" required value={formData.dob} onChange={handleChange} />
            <Input label="Mobile No" name="mobile" value={formData.mobile} onChange={handleChange} />
          </div>

          <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={onClose} className="w-auto">Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="w-auto gap-2">
              <Save size={18} /> {studentToEdit ? 'Update Changes' : 'Save Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;