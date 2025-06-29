import React from 'react';
import { Clock } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  isSelected?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, isSelected }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(service);
    }
  };

  return (
    <div
      className={`bg-dark-800 border border-dark-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer hover:border-primary-500/50 ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-900/20 border-primary-500' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image || `https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1`}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-blush-400 to-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {service.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-playfair font-semibold text-white mb-2">
          {service.name}
        </h3>
        
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{service.duration}</span>
          </div>
          
          {onSelect && (
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-blush-100/10 text-primary-400 hover:bg-blush-200/20 border border-primary-500/30'
              }`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;