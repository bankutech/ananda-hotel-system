import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';

const Housekeeping = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/housekeeping');
      if (res.ok) {
        setRooms(await res.json());
      }
    } catch (e) {
      console.error("Failed to fetch housekeeping data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getHeaders = () => {
    const token = localStorage.getItem('hms_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const markClean = async (id) => {
    const res = await fetch(`http://localhost:8080/api/housekeeping/clean/${id}`, { method: 'PUT', headers: getHeaders() });
    if (res.ok) {
      setRooms(rooms.map(r => r.id === id ? { ...r, cleaningStatus: 'Clean' } : r));
    }
  };

  const markDirty = async (id) => {
    const res = await fetch(`http://localhost:8080/api/housekeeping/dirty/${id}`, { method: 'PUT', headers: getHeaders() });
    if (res.ok) {
      setRooms(rooms.map(r => r.id === id ? { ...r, cleaningStatus: 'Dirty' } : r));
    }
  };

  if (loading) return <div>Loading housekeeping data...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Housekeeping</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Type</th>
                <th>Current Status</th>
                <th>Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.number}</td>
                  <td>{room.type}</td>
                  <td>
                    <span className={`badge ${room.cleaningStatus === 'Clean' ? 'available' : 'occupied'}`}>
                      {room.cleaningStatus || 'Unknown'}
                    </span>
                  </td>
                  <td>
                     <span className={`badge ${room.maintenanceStatus === 'Operational' ? 'available' : 'maintenance'}`}>
                      {room.maintenanceStatus || 'Unknown'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => markClean(room.id)}
                        disabled={room.cleaningStatus === 'Clean'}
                      >
                        <CheckCircle size={16} /> Clean
                      </button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => markDirty(room.id)}
                        disabled={room.cleaningStatus === 'Dirty'}
                      >
                        <Trash2 size={16} /> Dirty
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No rooms found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Housekeeping;
