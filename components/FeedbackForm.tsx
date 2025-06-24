
import React, { useState } from 'react';
import { Feedback } from '../types';
import StarRatingInput from './StarRatingInput';
import { AIRPORT_RIDES, TOUR_EXPERIENCES, ART_TOURS } from '../constants';

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
}

const allServices = [...AIRPORT_RIDES, ...TOUR_EXPERIENCES, ...ART_TOURS];

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [serviceUsed, setServiceUsed] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    const feedbackData: Feedback = {
      id: `feedback-${Date.now()}`,
      name,
      email,
      rating,
      message,
      timestamp: new Date(),
      serviceUsed: serviceUsed || undefined,
    };
    onSubmit(feedbackData);
    // Reset form
    setName('');
    setEmail('');
    setRating(0);
    setMessage('');
    setServiceUsed('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="serviceUsed" className="block text-sm font-medium text-slate-700 mb-1">Service Used (Optional)</label>
        <select
          id="serviceUsed"
          value={serviceUsed}
          onChange={(e) => setServiceUsed(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white"
        >
          <option value="">Select a service if applicable</option>
          {allServices.map(service => (
            <option key={service.id} value={service.name}>{service.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Your Rating</label>
        <StarRatingInput value={rating} onChange={setRating} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Your Feedback</label>
        <textarea 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
          rows={5}
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Tell us about your experience..."
        />
      </div>
      <div>
        <button 
          type="submit"
          className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;