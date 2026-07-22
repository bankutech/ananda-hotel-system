import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('hms_token', data.token);
        onLogin(data.token);
        toast.success('Logged in successfully!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      toast.error('Could not connect to server');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--background-color)' }}>
      <div className="card" style={{ width: '400px', padding: '32px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--primary-color)' }}>Ananda Login</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="form-label">Username</label>
            <input className="form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
