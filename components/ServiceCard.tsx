
import React from 'react';
import { Service, AirportRide, Tour } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const isAirportRide = (s: Service): s is AirportRide => 'vehicleType' in s;
  const isTour = (s: Service): s is Tour => 'duration' in s;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
      <img className="w-full h-56 object-cover" src={service.imageUrl} alt={service.name} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-emerald-700 mb-2">{service.name}</h3>
        <p className="text-slate-600 text-sm mb-3 flex-grow">{service.description}</p>
        
        {isAirportRide(service) && (
          <div className="text-sm text-slate-500 mb-3">
            <p>Vehicle: {service.vehicleType}</p>
            <p>Capacity: {service.capacity} passengers</p>
          </div>
        )}

        {isTour(service) && (
          <div className="text-sm text-slate-500 mb-3">
            <p>Duration: {service.duration}</p>
            {service.highlights && service.highlights.length > 0 && (
              <ul className="list-disc list-inside mt-1">
                {service.highlights.slice(0,2).map(hl => <li key={hl}>{hl}</li>)}
                {service.highlights.length > 2 && <li>...and more</li>}
              </ul>
            )}
          </div>
        )}

        <div className="mt-auto">
          <p className="text-2xl font-bold text-emerald-600 mb-4">${service.price.toFixed(2)}</p>
          <button
            onClick={() => onBook(service)}
            className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;