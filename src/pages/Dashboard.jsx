import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Bed, Calendar, DollarSign, UserCheck, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { rooms, guests, bookings, staff } = useAppContext();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error("Failed to fetch analytics", err));
  }, []);

  const totalRooms = analytics ? analytics.totalRooms : rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  
  const today = new Date().toISOString().split('T')[0];
  const todaysCheckins = bookings.filter(b => b.checkIn === today && b.status === 'active').length;
  
  const revpar = analytics ? analytics.revpar : '0.00';
  const occupancyRate = analytics ? analytics.occupancyRate : '0.0';

  // Revenue by Room Type for Chart
  const revenueData = rooms.map(typeObj => {
    const type = typeObj.type;
    const typeRevenue = bookings.filter(b => b.status === 'completed' && rooms.find(r => r.id === b.roomId)?.type === type)
      .reduce((sum, b) => sum + b.totalCost, 0);
    return { name: type, value: typeRevenue };
  }).filter((v, i, a) => a.findIndex(t => t.name === v.name) === i); // Unique types

  // Occupancy Data for Pie Chart
  const occupancyData = [
    { name: 'Available', value: availableRooms, color: '#10b981' },
    { name: 'Occupied', value: occupiedRooms, color: '#ef4444' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card stat-card-hero">
          <div className="stat-title" style={{ color: 'var(--primary-color)' }}>
            <DollarSign size={20} strokeWidth={1.5} /> Revenue per Available Room
          </div>
          <div className="stat-value">${revpar}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title"><Activity size={20} strokeWidth={1} color="var(--success-color)" /> Occupancy</div>
          <div className="stat-value">{occupancyRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title"><Calendar size={20} strokeWidth={1} color="var(--warning-color)" /> Check-ins Today</div>
          <div className="stat-value">{todaysCheckins}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title"><Bed size={20} strokeWidth={1} color="var(--primary-color)" /> Total Rooms</div>
          <div className="stat-value">{totalRooms}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title"><UserCheck size={20} strokeWidth={1} color="var(--text-secondary)" /> Staff Active</div>
          <div className="stat-value">{staff.filter(s => s.status === 'Active').length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        <div className="card card-arch">
          <h2 className="display-font" style={{ marginBottom: '24px', fontSize: '22px', fontWeight: '500' }}>Revenue by Room Type</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" axisLine={false} tickLine={false} tick={{ fontFamily: 'var(--font-body)', fontSize: 13 }} />
                <YAxis stroke="var(--text-secondary)" axisLine={false} tickLine={false} tick={{ fontFamily: 'var(--font-body)', fontSize: 13 }} />
                <Tooltip cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }} contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="value" fill="var(--primary-color)" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card card-arch">
          <h2 className="display-font" style={{ marginBottom: '24px', fontSize: '22px', fontWeight: '500' }}>Current Occupancy</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyData} innerRadius={85} outerRadius={120} paddingAngle={2} dataKey="value" stroke="var(--surface-color)" strokeWidth={2}>
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-md)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="display-font" style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '500' }}>Recent Activity</h2>
        <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
          <table>
            <thead>
              <tr>
                <th style={{ background: 'transparent' }}>Guest</th>
                <th style={{ background: 'transparent' }}>Room</th>
                <th style={{ background: 'transparent' }}>Check-in</th>
                <th style={{ background: 'transparent' }}>Check-out</th>
                <th style={{ background: 'transparent' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(-5).reverse().map(booking => {
                const guest = guests.find(g => g.id === booking.guestId);
                const room = rooms.find(r => r.id === booking.roomId);
                return (
                  <tr key={booking.id}>
                    <td style={{ fontWeight: '500' }}>{guest?.name || 'Unknown'}</td>
                    <td><span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>{room?.number || 'Unknown'}</span></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{booking.checkIn}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{booking.checkOut}</td>
                    <td>
                      <span className={`badge ${booking.status}`} style={{ letterSpacing: '0.5px' }}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>No recent activity.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
