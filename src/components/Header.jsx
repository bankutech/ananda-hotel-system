import React from 'react';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="top-header">
      <div className="search-bar">
        <Search size={18} color="var(--text-secondary)" />
        <input type="text" placeholder="Search anything..." />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
        </button>
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 8px' }}></div>
        
        <div className="user-profile-btn">
          <div className="user-avatar">
            <User size={18} color="white" />
          </div>
          <div className="user-info">
            <div className="user-name">Arjun Sharma</div>
            <div className="user-role">Front Desk</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
