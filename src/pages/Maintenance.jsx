import React, { useState, useEffect } from 'react';
import { Wrench, CheckCircle } from 'lucide-react';

const Maintenance = () => {
  const [tickets, setTickets] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New ticket form state
  const [roomId, setRoomId] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const fetchData = async () => {
    try {
      const [ticketsRes, roomsRes] = await Promise.all([
        fetch('http://localhost:8080/api/maintenance'),
        fetch('http://localhost:8080/api/rooms')
      ]);
      if (ticketsRes.ok) setTickets(await ticketsRes.json());
      if (roomsRes.ok) setRooms(await roomsRes.json());
    } catch (e) {
      console.error("Failed to fetch maintenance data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getHeaders = () => {
    const token = localStorage.getItem('hms_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  const addTicket = async (e) => {
    e.preventDefault();
    if (!roomId) return;
    
    const ticket = {
      room: { id: parseInt(roomId) },
      issueDescription,
      priority,
      status: 'Open'
    };
    
    const res = await fetch(`http://localhost:8080/api/maintenance/add`, { 
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ticket)
    });
    
    if (res.ok) {
      const newTicket = await res.json();
      setTickets([...tickets, newTicket]);
      setIssueDescription('');
      
      // Update room in local state if high priority
      if (priority === 'High' || priority === 'Critical') {
         setRooms(rooms.map(r => r.id === parseInt(roomId) ? {...r, maintenanceStatus: 'OutOfOrder'} : r));
      }
    }
  };

  const resolveTicket = async (id) => {
    const res = await fetch(`http://localhost:8080/api/maintenance/resolve/${id}`, { 
      method: 'PUT',
      headers: getHeaders()
    });
    if (res.ok) {
      const updatedTicket = await res.json();
      setTickets(tickets.map(t => t.id === id ? updatedTicket : t));
    }
  };

  if (loading) return <div>Loading maintenance data...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Maintenance Tickets</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Report Issue</h2>
          <form onSubmit={addTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Room</label>
              <select className="form-input" value={roomId} onChange={e => setRoomId(e.target.value)} required>
                <option value="">Select Room...</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>Room {r.number}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Issue Description</label>
              <textarea 
                className="form-input" 
                value={issueDescription} 
                onChange={e => setIssueDescription(e.target.value)} 
                required 
                rows={3}
              />
            </div>
            <div>
              <label className="form-label">Priority</label>
              <select className="form-input" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Submit Ticket</button>
          </form>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Active Tickets</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.room?.number || 'Unknown'}</td>
                    <td>{ticket.issueDescription}</td>
                    <td>
                      <span className={`badge ${ticket.priority === 'Critical' ? 'occupied' : 'maintenance'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${ticket.status === 'Resolved' ? 'available' : 'occupied'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>
                      {ticket.status !== 'Resolved' && (
                        <button 
                          className="btn btn-outline" 
                          onClick={() => resolveTicket(ticket.id)}
                        >
                          <CheckCircle size={16} /> Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No maintenance tickets.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
