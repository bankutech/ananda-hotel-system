import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, X, Search } from 'lucide-react';

const Staff = () => {
  const { staff, addStaff, updateStaff, deleteStaff } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    role: 'Receptionist',
    shift: 'Morning',
    status: 'Active'
  });

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingStaff(employee);
      setFormData(employee);
    } else {
      setEditingStaff(null);
      setFormData({ name: '', role: 'Receptionist', shift: 'Morning', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStaff) {
      updateStaff(editingStaff.id, formData);
    } else {
      addStaff(formData);
    }
    handleCloseModal();
  };

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Staff Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Employee
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search by name or role..." 
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
                <th>Role</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(employee => (
                <tr key={employee.id}>
                  <td style={{ fontWeight: '500' }}>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.shift}</td>
                  <td>
                    <span className={`badge ${employee.status === 'Active' ? 'available' : 'occupied'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => handleOpenModal(employee)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => deleteStaff(employee.id)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No staff members found.
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
              <h2>{editingStaff ? 'Edit Employee' : 'Add New Employee'}</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form id="staff-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="Manager">Manager</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Shift</label>
                  <select value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})}>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="staff-form" className="btn btn-primary">{editingStaff ? 'Save Changes' : 'Add Employee'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
