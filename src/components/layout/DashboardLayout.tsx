import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, GraduationCap } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <GraduationCap className="text-blue-500" />
          <span className="font-bold text-lg">School System</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg text-white cursor-pointer transition-colors">
            <Users size={20} />
            <span className="font-medium">Students</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Teachers</span>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet /> {/* This is where child pages (like StudentList) will appear */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;