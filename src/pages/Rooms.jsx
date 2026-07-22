import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const Rooms = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const [formData, setFormData] = useState({
    number: '',
    type: 'Single',
    price: '',
    status: 'available'
  });

  const getRoomImage = (type) => {
    switch (type) {
      case 'Single': return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop';
      case 'Double': return 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=600&auto=format&fit=crop';
      case 'Deluxe': return 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&auto=format&fit=crop';
      case 'Suite': return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop';
      default: return 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop';
    }
  };

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData(room);
    } else {
      setEditingRoom(null);
      setFormData({ number: '', type: 'Single', price: '', status: 'available' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoom) {
      updateRoom(editingRoom.id, { ...formData, price: Number(formData.price) });
    } else {
      addRoom({ ...formData, price: Number(formData.price) });
    }
    handleCloseModal();
  };

  const filteredRooms = rooms.filter(r => {
    const matchType = filterType === 'All' || r.type === filterType;
    const matchStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchType && matchStatus;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Rooms Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Room
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: '200px' }}>
          <option value="All">All Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '200px' }}>
          <option value="All">All Statuses</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
      </div>

      <div className="room-grid">
        {filteredRooms.map(room => (
          <div key={room.id} className="room-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
              <img 
                src={getRoomImage(room.type)} 
                alt={`${room.type} Room`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div className="room-card-header" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '18px', fontWeight: '700' }}>Room {room.number}</span>
              <span className={`badge ${room.status}`}>{room.status}</span>
            </div>
            <div className="room-card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Type</span>
                <span style={{ fontWeight: '500' }}>{room.type}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Price / Night</span>
                <span className="room-price">${room.price}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleOpenModal(room)}>
                  <Edit2 size={16} /> Edit
                </button>
                <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }} onClick={() => deleteRoom(room.id)}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredRooms.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No rooms found matching the selected filters.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form id="room-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Room Number</label>
                  <input type="text" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Room Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price per Night ($)</label>
                  <input type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="room-form" className="btn btn-primary">{editingRoom ? 'Save Changes' : 'Add Room'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
