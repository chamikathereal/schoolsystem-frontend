import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles


function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route: Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Placeholder for Dashboard */}
        <Route path="/dashboard" element={<div className="p-10 text-2xl">Welcome to the Dashboard! 🎓</div>} />
      </Routes>
      
      {/* Global Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
