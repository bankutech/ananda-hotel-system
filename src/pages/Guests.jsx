import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, X, Search } from 'lucide-react';

const Guests = () => {
  const { guests, addGuest, updateGuest } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idDocument: ''
  });

  const handleOpenModal = (guest = null) => {
    if (guest) {
      setEditingGuest(guest);
      setFormData(guest);
    } else {
      setEditingGuest(null);
      setFormData({ name: '', phone: '', email: '', idDocument: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGuest(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGuest) {
      updateGuest(editingGuest.id, formData);
    } else {
      addGuest(formData);
    }
    handleCloseModal();
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone.includes(searchTerm)
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Guests Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Register Guest
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>ID Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map(guest => (
                <tr key={guest.id}>
                  <td style={{ fontWeight: '500' }}>{guest.name}</td>
                  <td>{guest.phone}</td>
                  <td>{guest.email}</td>
                  <td>{guest.idDocument}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => handleOpenModal(guest)}>
                      Edit Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No guests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingGuest ? 'Edit Guest Profile' : 'Register New Guest'}</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form id="guest-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>ID Document (Passport/Driver's License)</label>
                  <input type="text" required value={formData.idDocument} onChange={e => setFormData({...formData, idDocument: e.target.value})} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="guest-form" className="btn btn-primary">{editingGuest ? 'Save Changes' : 'Register Guest'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guests;
