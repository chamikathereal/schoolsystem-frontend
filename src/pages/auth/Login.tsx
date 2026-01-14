import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GraduationCap, Lock, Mail } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { loginUser } from '../../api/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      
      // 1. Save Token
      localStorage.setItem('token', response.token);
      
      // 2. Show Success Message
      toast.success('Welcome back!');
      
      // 3. Redirect to Dashboard (We will build this later)
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error(error);
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-600 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">School System</h2>
          <p className="text-blue-100">Sign in to access your portal</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="relative">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="principal@school.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-[38px]" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-[38px]" />
            </div>

            <Button 
              type="submit" 
              isLoading={isLoading}
              className="w-full mt-6"
            >
              Sign In
            </Button>

          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Contact Admin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;