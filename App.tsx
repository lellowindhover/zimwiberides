
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import BookingModal from './components/BookingModal';
import FeedbackForm from './components/FeedbackForm';
import { StarIcon, TicketIcon, MapPinIcon, PaletteIcon, ChatBubbleLeftRightIcon, UserIcon } from './components/Icons';
import { Service, Booking, Feedback as FeedbackType, ServiceCategory } from './types';
import { AIRPORT_RIDES, TOUR_EXPERIENCES, ART_TOURS, MOCK_FEEDBACKS } from './constants';

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>(MOCK_FEEDBACKS);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showFeedbackConfirmation, setShowFeedbackConfirmation] = useState(false);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  const handleConfirmBooking = (bookingDetails: Booking) => {
    console.log('Booking Confirmed:', bookingDetails);
    setBookings(prev => [...prev, bookingDetails]);
    handleCloseModal();
    setShowBookingConfirmation(true);
    setTimeout(() => setShowBookingConfirmation(false), 3000); // Hide after 3 seconds
  };
  
  const handleFeedbackSubmit = (feedback: FeedbackType) => {
    console.log('Feedback Submitted:', feedback);
    setFeedbacks(prev => [feedback, ...prev]); // Add new feedback to the top
    setShowFeedbackConfirmation(true);
    setTimeout(() => setShowFeedbackConfirmation(false), 3000); // Hide after 3 seconds
  };

  const PageContainer: React.FC<{title: string; icon?: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center mb-8">
        {icon && <span className="mr-3 text-emerald-600">{icon}</span>}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{title}</h1>
      </div>
      {children}
    </div>
  );

  const HomePage: React.FC = () => (
    <>
      <div className="relative bg-gradient-to-r from-emerald-700 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/zimbabweview/1920/1080" alt="Scenic view of Zimbabwe" className="w-full h-full object-cover opacity-30"/>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Discover Zimbabwe with <span className="text-amber-300">ZimVibe Rides</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-emerald-100">
            Your trusted partner for unforgettable airport transfers, curated tours, and inspiring art experiences.
          </p>
          <div className="mt-10">
            <a
              href="#/tours"
              className="inline-block bg-orange-500 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105 duration-300"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
      
      <PageContainer title="Featured Services">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AIRPORT_RIDES.slice(0,1).map(service => <ServiceCard key={service.id} service={service} onBook={handleBookNow} />)}
          {TOUR_EXPERIENCES.slice(0,1).map(service => <ServiceCard key={service.id} service={service} onBook={handleBookNow} />)}
          {ART_TOURS.slice(0,1).map(service => <ServiceCard key={service.id} service={service} onBook={handleBookNow} />)}
        </div>
      </PageContainer>
       <div className="bg-slate-100 py-12">
        <PageContainer title="Why Choose ZimVibe Rides?">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <MapPinIcon className="h-12 w-12 text-emerald-600"/>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Local Expertise</h3>
              <p className="text-slate-600">Deep knowledge of Zimbabwe's gems, ensuring authentic experiences.</p>
            </div>
            <div className="p-6">
               <div className="flex justify-center mb-4">
                <UserIcon className="h-12 w-12 text-emerald-600"/>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Trusted Guides</h3>
              <p className="text-slate-600">Friendly, professional, and certified guides for a safe journey.</p>
            </div>
            <div className="p-6">
               <div className="flex justify-center mb-4">
                 <StarIcon filled className="h-12 w-12 text-emerald-600"/>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Tailored Trips</h3>
              <p className="text-slate-600">Flexible options to customize your adventure to your liking.</p>
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  );

  const ServiceListPage: React.FC<{ title: string; services: Service[]; category: ServiceCategory; icon?: React.ReactNode }> = ({ title, services, icon }) => (
    <PageContainer title={title} icon={icon}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} onBook={handleBookNow} />
        ))}
      </div>
    </PageContainer>
  );

  const FeedbackPage: React.FC = () => (
    <PageContainer title="Share Your Experience" icon={<ChatBubbleLeftRightIcon />}>
      <p className="text-slate-600 mb-8 text-lg max-w-2xl mx-auto text-center">
        We value your feedback! Let us know about your ZimVibe Rides experience to help us improve our services.
      </p>
      <FeedbackForm onSubmit={handleFeedbackSubmit} />
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Recent Feedback</h2>
        {feedbacks.length === 0 ? (
          <p className="text-center text-slate-500">No feedback submitted yet.</p>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {feedbacks.slice(0, 3).map(fb => ( // Show latest 3
              <div key={fb.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-slate-700 mr-2">{fb.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < fb.rating} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                {fb.serviceUsed && <p className="text-xs text-slate-500 italic mb-1">Feedback for: {fb.serviceUsed}</p>}
                <p className="text-slate-600">{fb.message}</p>
                <p className="text-xs text-slate-400 mt-2 text-right">{fb.timestamp.toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
  
  const ConfirmationPopup: React.FC<{message: string; show: boolean}> = ({message, show}) => {
    if (!show) return null;
    return (
      <div className="fixed bottom-5 right-5 bg-emerald-600 text-white py-3 px-5 rounded-lg shadow-lg animate-bounce z-[150]">
        {message}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/airport-rides" element={<ServiceListPage title="Airport Rides" services={AIRPORT_RIDES} category={ServiceCategory.AIRPORT_RIDE} icon={<TicketIcon className="w-8 h-8"/>} />} />
          <Route path="/tours" element={<ServiceListPage title="Tour Experiences" services={TOUR_EXPERIENCES} category={ServiceCategory.TOUR_EXPERIENCE} icon={<MapPinIcon className="w-8 h-8"/>} />} />
          <Route path="/art-tours" element={<ServiceListPage title="Guided Art Tours" services={ART_TOURS} category={ServiceCategory.ART_TOUR} icon={<PaletteIcon className="w-8 h-8"/>} />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </main>
      <Footer />
      <BookingModal 
        service={selectedService} 
        isOpen={isBookingModalOpen} 
        onClose={handleCloseModal} 
        onBook={handleConfirmBooking}
        existingBookings={bookings} 
      />
      <ConfirmationPopup message="Booking confirmed! We'll be in touch." show={showBookingConfirmation} />
      <ConfirmationPopup message="Thank you for your feedback!" show={showFeedbackConfirmation} />
    </div>
  );
};

export default App;