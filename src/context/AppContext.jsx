import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

const API_BASE = 'http://localhost:8080/api';

const getHeaders = () => {
  const token = localStorage.getItem('hms_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('hms_theme') || 'dark');
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => { 
    localStorage.setItem('hms_theme', theme); 
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const fetchData = async () => {
    try {
      const [roomsRes, guestsRes, bookingsRes, staffRes] = await Promise.all([
        fetch(`${API_BASE}/rooms`),
        fetch(`${API_BASE}/guests`),
        fetch(`${API_BASE}/bookings`),
        fetch(`${API_BASE}/staff`)
      ]);
      if (roomsRes.ok) setRooms(await roomsRes.json());
      if (guestsRes.ok) setGuests(await guestsRes.json());
      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        // Map backend's nested room/guest to roomId/guestId expected by frontend components
        const mappedBookings = data.map(b => ({
          ...b,
          roomId: b.room ? b.room.id : null,
          guestId: b.guest ? b.guest.id : null
        }));
        setBookings(mappedBookings);
      }
      if (staffRes.ok) setStaff(await staffRes.json());
    } catch (e) {
      console.error("Failed to fetch data from API", e);
      toast.error("Network Error: Could not fetch initial data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addRoom = async (room) => {
    try {
      const res = await fetch(`${API_BASE}/rooms`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(room) });
      if(res.ok) {
        setRooms([...rooms, await res.json()]);
        toast.success("Room added successfully!");
      } else {
        toast.error("Failed to add room.");
      }
    } catch(e) { toast.error("Network Error"); }
  };
  
  const updateRoom = async (id, updatedRoom) => {
    const res = await fetch(`${API_BASE}/rooms/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(updatedRoom) });
    if(res.ok) {
      const data = await res.json();
      setRooms(rooms.map(r => r.id == id ? data : r));
    }
  };
  
  const deleteRoom = async (id) => {
    const res = await fetch(`${API_BASE}/rooms/${id}`, { method: 'DELETE', headers: getHeaders() });
    if(res.ok) setRooms(rooms.filter(r => r.id != id));
  };

  const addGuest = async (guest) => {
    try {
      const res = await fetch(`${API_BASE}/guests`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(guest) });
      if(res.ok) {
        const data = await res.json();
        setGuests([...guests, data]);
        toast.success("Guest added successfully!");
        return data;
      } else { toast.error("Failed to add guest."); }
    } catch(e) { toast.error("Network Error"); }
  };
  
  const updateGuest = async (id, updatedGuest) => {
    const res = await fetch(`${API_BASE}/guests/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(updatedGuest) });
    if(res.ok) {
      const data = await res.json();
      setGuests(guests.map(g => g.id == id ? data : g));
    }
  };

  const addBooking = async (booking) => {
    try {
      const apiPayload = {
        ...booking,
        room: { id: booking.roomId },
        guest: { id: booking.guestId }
      };
      const res = await fetch(`${API_BASE}/bookings`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(apiPayload) });
      if(res.ok) {
        const newBooking = await res.json();
        const mappedBooking = {
          ...newBooking,
          roomId: newBooking.room ? newBooking.room.id : null,
          guestId: newBooking.guest ? newBooking.guest.id : null
        };
        setBookings([...bookings, mappedBooking]);
        const roomRes = await fetch(`${API_BASE}/rooms`);
        if(roomRes.ok) setRooms(await roomRes.json());
        toast.success("Booking created successfully!");
      } else {
        toast.error("Failed to create booking.");
      }
    } catch(e) { toast.error("Network Error"); }
  };

  const checkoutBooking = async (bookingId) => {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}/checkout`, { method: 'POST', headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      const updatedBooking = {
        ...data,
        roomId: data.room ? data.room.id : null,
        guestId: data.guest ? data.guest.id : null
      };
      setBookings(bookings.map(b => b.id == bookingId ? updatedBooking : b));
      // Re-fetch rooms to get available status
      const roomRes = await fetch(`${API_BASE}/rooms`);
      if(roomRes.ok) setRooms(await roomRes.json());
    }
  };

  const addServiceToBooking = (_bookingId, _service) => {
    // Phase 2 feature not fully implemented in backend yet, keeping local state dummy logic or ignoring
  };

  const addStaff = async (employee) => {
    const res = await fetch(`${API_BASE}/staff`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(employee) });
    if(res.ok) setStaff([...staff, await res.json()]);
  };
  
  const updateStaff = async (id, updatedStaff) => {
    const res = await fetch(`${API_BASE}/staff/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(updatedStaff) });
    if(res.ok) {
        const data = await res.json();
        setStaff(staff.map(s => s.id == id ? data : s));
    }
  };
  
  const deleteStaff = async (id) => {
    const res = await fetch(`${API_BASE}/staff/${id}`, { method: 'DELETE', headers: getHeaders() });
    if(res.ok) setStaff(staff.filter(s => s.id != id));
  };

  const value = {
    theme, toggleTheme,
    rooms, addRoom, updateRoom, deleteRoom,
    guests, addGuest, updateGuest,
    bookings, addBooking, checkoutBooking, addServiceToBooking,
    staff, addStaff, updateStaff, deleteStaff
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
