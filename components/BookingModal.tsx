
import React, { useState, useEffect, useMemo } from 'react';
import { Service, Booking } from '../types';
import { XIcon, UserIcon, CalendarIcon } from './Icons';

interface BookingModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (bookingDetails: Booking) => void;
  existingBookings: Booking[];
}

const BookingModal: React.FC<BookingModalProps> = ({ service, isOpen, onClose, onBook, existingBookings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (service) {
      // Reset form when service changes or modal opens
      setName('');
      setEmail('');
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]); // Default to tomorrow
      setNumPeople(1);
      setNotes('');
    }
  }, [service, isOpen]);

  const bookedDatesForThisService = useMemo(() => {
    if (!service || !existingBookings) return new Set<string>();
    return new Set(
      existingBookings
        .filter(b => b.serviceId === service.id)
        .map(b => b.bookingDate) // Assumes YYYY-MM-DD string format
    );
  }, [service, existingBookings]);

  const isDateBooked = useMemo(() => {
    if (!date) return false;
    return bookedDatesForThisService.has(date);
  }, [date, bookedDatesForThisService]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDateBooked) {
        alert("This date is already booked for this service. Please choose another date.");
        return;
    }
    const bookingDetails: Booking = {
      id: `booking-${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      customerName: name,
      customerEmail: email,
      bookingDate: date,
      numberOfPeople: numPeople,
      notes: notes,
    };
    onBook(bookingDetails);
  };
  
  const minDate = useMemo(() => {
    const today = new Date();
    // Set to midnight to correctly compare with date input value
    today.setHours(0, 0, 0, 0); 
    // Example: allow booking from tomorrow
    // today.setDate(today.getDate() + 1); 
    return today.toISOString().split('T')[0];
  }, []);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-emerald-700">Book: {service.name}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 transition-colors">
            <XIcon className="h-7 w-7" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="text-slate-400" />
              </div>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
               </div>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="text-slate-400" />
                </div>
                <input 
                  type="date" 
                  id="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                  min={minDate}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${isDateBooked ? 'border-red-500 ring-red-500' : 'border-slate-300'}`}
                />
              </div>
              {isDateBooked && (
                <p className="text-xs text-red-600 mt-1">This date is already booked for this service. Please select another date.</p>
              )}
            </div>
            <div>
              <label htmlFor="numPeople" className="block text-sm font-medium text-slate-700 mb-1">Number of People</label>
              <input 
                type="number" 
                id="numPeople" 
                value={numPeople} 
                onChange={(e) => setNumPeople(parseInt(e.target.value))} 
                required 
                min="1"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">Additional Notes (Optional)</label>
            <textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Any special requests or information..."
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isDateBooked}
              className={`px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors ${
                isDateBooked 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              Confirm Booking (${service.price * numPeople})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
