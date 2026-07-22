import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, X, Search, Coffee, Printer } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

const Bookings = () => {
  const { bookings, rooms, guests, addBooking, checkoutBooking, addServiceToBooking } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceModalData, setServiceModalData] = useState(null);
  const [invoiceModalData, setInvoiceModalData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    guestId: '',
    roomId: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  });

  const [serviceData, setServiceData] = useState({ name: 'Room Service', price: '' });

  const availableRooms = rooms.filter(r => r.status === 'available');

  const handleOpenModal = () => {
    setFormData({
      guestId: guests.length > 0 ? guests[0].id : '',
      roomId: availableRooms.length > 0 ? availableRooms[0].id : '',
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const calculateTotalCost = (roomId, checkIn, checkOut) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return 0;
    
    let days = differenceInDays(parseISO(checkOut), parseISO(checkIn));
    if (days <= 0) days = 1; // minimum 1 night
    return days * room.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCost = calculateTotalCost(formData.roomId, formData.checkIn, formData.checkOut);
    
    addBooking({
      ...formData,
      totalCost
    });
    handleCloseModal();
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    if (serviceModalData && serviceData.name && serviceData.price) {
      addServiceToBooking(serviceModalData.id, { name: serviceData.name, price: Number(serviceData.price) });
      setServiceModalData(null);
      setServiceData({ name: 'Room Service', price: '' });
    }
  };

  const openInvoice = (booking) => {
    setInvoiceModalData(booking);
  };

  const handleCheckoutAndPrint = (bookingId) => {
    checkoutBooking(bookingId);
    window.print();
    setInvoiceModalData(null);
  };

  const filteredBookings = bookings.filter(b => {
    const guest = guests.find(g => g.id === b.guestId);
    return guest?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reservations & Bookings</h1>
        <button className="btn btn-primary" onClick={handleOpenModal} disabled={availableRooms.length === 0 || guests.length === 0}>
          <Plus size={18} /> New Booking
        </button>
      </div>

      {(availableRooms.length === 0 || guests.length === 0) && (
        <div style={{ padding: '16px', backgroundColor: 'var(--warning-bg)', color: 'var(--warning-color)', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }}>
          <strong>Note:</strong> You need at least one available room and one registered guest to create a booking.
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search bookings by guest name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => {
                const guest = guests.find(g => g.id === booking.guestId);
                const room = rooms.find(r => r.id === booking.roomId);
                const servicesTotal = (booking.services || []).reduce((sum, s) => sum + Number(s.price), 0);
                const finalCost = booking.totalCost + servicesTotal;
                
                return (
                  <tr key={booking.id}>
                    <td style={{ fontWeight: '500' }}>{guest?.name || 'Unknown'}</td>
                    <td>Room {room?.number || 'Unknown'} - {room?.type}</td>
                    <td>{booking.checkIn} to {booking.checkOut}</td>
                    <td style={{ fontWeight: '600' }}>
                      ${finalCost}
                      {servicesTotal > 0 && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(+${servicesTotal} amenities)</div>}
                    </td>
                    <td>
                      <span className={`badge ${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'active' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => setServiceModalData(booking)}>
                            <Coffee size={14} style={{ marginRight: '4px' }} /> Add Service
                          </button>
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '13px', backgroundColor: 'var(--success-color)' }} onClick={() => openInvoice(booking)}>
                            <Printer size={14} style={{ marginRight: '4px' }} /> Invoice & Checkout
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => openInvoice(booking)}>
                          <Printer size={14} style={{ marginRight: '4px' }} /> View Invoice
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No bookings found.
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
              <h2>Create New Booking</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form id="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Select Guest</label>
                  <select required value={formData.guestId} onChange={e => setFormData({...formData, guestId: e.target.value})}>
                    <option value="" disabled>Select a guest...</option>
                    {guests.map(g => (
                      <option key={g.id} value={g.id}>{g.name} ({g.phone})</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Select Room</label>
                  <select required value={formData.roomId} onChange={e => setFormData({...formData, roomId: e.target.value})}>
                    <option value="" disabled>Select a room...</option>
                    {availableRooms.map(r => (
                      <option key={r.id} value={r.id}>Room {r.number} - {r.type} (${r.price}/night)</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Check-in Date</label>
                    <input type="date" required value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Check-out Date</label>
                    <input type="date" required value={formData.checkOut} min={formData.checkIn} onChange={e => setFormData({...formData, checkOut: e.target.value})} />
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Cost:</span>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary-color)' }}>
                    ${formData.roomId && formData.checkIn && formData.checkOut ? calculateTotalCost(formData.roomId, formData.checkIn, formData.checkOut) : 0}
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="booking-form" className="btn btn-primary">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {serviceModalData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Service / Amenity</h2>
              <button onClick={() => setServiceModalData(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form id="service-form" onSubmit={handleAddServiceSubmit}>
                <div className="form-group">
                  <label>Service Name</label>
                  <select value={serviceData.name} onChange={e => setServiceData({...serviceData, name: e.target.value})}>
                    <option value="Room Service">Room Service</option>
                    <option value="Spa & Massage">Spa & Massage</option>
                    <option value="Mini Bar">Mini Bar</option>
                    <option value="Gym Pass">Gym Pass</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Charge Amount ($)</label>
                  <input type="number" required min="1" value={serviceData.price} onChange={e => setServiceData({...serviceData, price: e.target.value})} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setServiceModalData(null)}>Cancel</button>
              <button type="submit" form="service-form" className="btn btn-primary">Add Charge</button>
            </div>
          </div>
        </div>
      )}

      {invoiceModalData && (
        <div className="modal-overlay">
          <div className="modal-content large" style={{ backgroundColor: '#fff', color: '#000' }}>
            <div className="modal-header">
              <h2 style={{ color: '#000' }}>Guest Invoice</h2>
              <button onClick={() => setInvoiceModalData(null)} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body" style={{ color: '#000' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Ananda Hotel</h1>
                  <p style={{ color: '#666', fontSize: '14px' }}>123 Paradise Blvd, Resort City</p>
                  <p style={{ color: '#666', fontSize: '14px' }}>contact@anandahotels.com</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Invoice #{invoiceModalData.id}</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>Billed To:</h3>
                <p><strong>{guests.find(g => g.id === invoiceModalData.guestId)?.name}</strong></p>
                <p>{guests.find(g => g.id === invoiceModalData.guestId)?.phone}</p>
                <p>{guests.find(g => g.id === invoiceModalData.guestId)?.email}</p>
              </div>

              <table style={{ width: '100%', marginBottom: '32px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #000' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0', color: '#000' }}>Description</th>
                    <th style={{ textAlign: 'right', padding: '8px 0', color: '#000' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #eee', color: '#000' }}>
                      Room Stay ({rooms.find(r => r.id === invoiceModalData.roomId)?.type})<br/>
                      <small style={{ color: '#666' }}>{invoiceModalData.checkIn} to {invoiceModalData.checkOut}</small>
                    </td>
                    <td style={{ padding: '12px 0', borderBottom: '1px solid #eee', textAlign: 'right', color: '#000' }}>
                      ${invoiceModalData.totalCost.toFixed(2)}
                    </td>
                  </tr>
                  {(invoiceModalData.services || []).map((service, index) => (
                    <tr key={index}>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #eee', color: '#000' }}>{service.name}</td>
                      <td style={{ padding: '12px 0', borderBottom: '1px solid #eee', textAlign: 'right', color: '#000' }}>
                        ${Number(service.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <div style={{ width: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '18px', fontWeight: 'bold', borderTop: '2px solid #000', color: '#000' }}>
                    <span>Total Due:</span>
                    <span>
                      ${(invoiceModalData.totalCost + (invoiceModalData.services || []).reduce((sum, s) => sum + Number(s.price), 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '40px', color: '#666', fontSize: '14px' }}>
                Thank you for staying with Ananda Hotel!
              </div>
            </div>
            <div className="modal-footer" style={{ borderTop: 'none' }}>
              <button className="btn btn-secondary" onClick={() => setInvoiceModalData(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => {
                if (invoiceModalData.status === 'active') {
                  handleCheckoutAndPrint(invoiceModalData.id);
                } else {
                  window.print();
                }
              }}>
                {invoiceModalData.status === 'active' ? 'Check Out & Print Invoice' : 'Print Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
