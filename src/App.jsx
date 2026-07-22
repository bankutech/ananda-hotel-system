import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Guests from './pages/Guests';
import Bookings from './pages/Bookings';
import Staff from './pages/Staff';
import Housekeeping from './pages/Housekeeping';
import Maintenance from './pages/Maintenance';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('hms_token'));

  if (!token) {
    return (
      <>
        <Toaster position="top-right" />
        <Login onLogin={setToken} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/housekeeping" element={<Housekeeping />} />
              <Route path="/maintenance" element={<Maintenance />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
