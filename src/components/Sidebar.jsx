import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bed, Users, CalendarCheck, UserCog, Sparkles, Wrench } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '32px', height: '40px', background: 'var(--primary-color)', borderRadius: '16px 16px 4px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' }}>
          <div style={{ width: '12px', height: '12px', border: '2px solid var(--bg-color)', borderRadius: '50%', borderBottom: 'none' }}></div>
        </div>
        <span style={{ fontSize: '26px', fontWeight: '600', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
          Ananda
        </span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Bed size={20} />
          Rooms
        </NavLink>
        <NavLink to="/guests" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Users size={20} />
          Guests
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <CalendarCheck size={20} />
          Bookings
        </NavLink>
        <NavLink to="/staff" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <UserCog size={20} />
          Staff
        </NavLink>
        <NavLink to="/housekeeping" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Sparkles size={20} />
          Housekeeping
        </NavLink>
        <NavLink to="/maintenance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <Wrench size={20} />
          Maintenance
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
