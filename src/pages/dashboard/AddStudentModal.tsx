import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import { createStudent } from '../../api/students';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    mobile: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createStudent(formData);
      toast.success('Student added successfully!');
      onSuccess(); // Refresh the list
      onClose();   // Close modal
      setFormData({ firstName: '', lastName: '', email: '', dob: '', mobile: '', address: '' }); // Reset form
    } catch (error: any) {
      // Handle the "Duplicate Email" error we built in the backend!
      if (error.response?.status === 409) {
        toast.error('Email already exists!');
      } else {
        toast.error('Failed to add student');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">New Student</h2>
          <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" required value={formData.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" required value={formData.lastName} onChange={handleChange} />
          </div>

          <Input label="Email Address" name="email" type="email" required value={formData.email} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Date of Birth" name="dob" type="date" required value={formData.dob} onChange={handleChange} />
            <Input label="Mobile No" name="mobile" value={formData.mobile} onChange={handleChange} />
          </div>

          <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={onClose} className="w-auto">Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="w-auto gap-2">
              <Save size={18} /> Save Student
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;