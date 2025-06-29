import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Service } from '../types';
import { serviceApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const categories = ['All', 'Brows', 'Lips', 'Skin Care', 'Face' , 'Waxing'];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategory]);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8081/service/AllService");
      if (response.ok) {
        const servicesData = await response.json();
        setServices(servicesData);
        
        // Check if there's a pre-selected service from navigation state
        const preSelectedService = location.state?.selectedService;
        if (preSelectedService) {
          // Navigate directly to booking with the pre-selected service
          navigate('/booking', { state: { selectedService: preSelectedService } });
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services. Please try again.');
      // Mock data for demonstration
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const handleServiceSelect = (service: Service) => {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    navigate('/booking', { state: { selectedService: service } });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of permanent makeup and aesthetic treatments, 
            each designed to enhance your natural beauty with professional care.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-full text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-dark-800 border border-dark-700 text-white px-6 py-3 rounded-full hover:bg-dark-700 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {(selectedCategory !== 'All' || searchTerm) && (
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  {selectedCategory !== 'All' ? 1 : 0}{searchTerm ? '+' : ''}
                </span>
              )}
            </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Filter by Category</h3>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm">Clear All</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blush-400 to-primary-500 text-white shadow-lg'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white border border-dark-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mb-6 text-center">
            <p className="text-gray-400">
              Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>

        {filteredServices.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blush-400 to-primary-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blush-500 hover:to-primary-600 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 bg-dark-800 border border-dark-700 rounded-3xl p-12">
          <h2 className="text-3xl font-playfair font-bold text-white mb-4">
            Ready to Book Your Treatment?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our expert team is here to help you achieve your beauty goals. 
            Schedule a consultation to discuss the perfect treatment for you.
          </p>
          <button
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login');
              } else {
                navigate('/booking');
              }
            }}
            className="bg-gradient-to-r from-blush-400 to-primary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blush-500 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;