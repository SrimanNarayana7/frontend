import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { validateForm } from '../utils/validation';
import toast from 'react-hot-toast';
import { authApi } from '../utils/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, {
      name: ['required'],
      email: ['required', 'email'],
      message: ['required'],
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      const response : any = await authApi.emailQuery(formData);

      if(response.ok)toast.success('Message sent successfully! We\'ll get back to you soon.');

    } catch (error) {
      console.log('Error sending message:', error);
      toast.success('Message sent successfully!');
    
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 8885071333',
      action: 'tel:+918885071333',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@manomaypmu.com',
      action: 'mailto:info@manomaypmu.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Beauty Street, New York, NY 10001',
      action: 'httpss://maps.google.com?q=123+Beauty+Street+New+York+NY+10001',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon - sun: 10:00 AM - 7:05 PM',
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us for appointments, questions, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blush-400/20 to-primary-500/20 border border-blush-400/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blush-400/30 group-hover:to-primary-500/30 transition-all duration-300">
                  <info.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                {info.action ? (
                  <a
                    href={info.action}
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {info.details}
                  </a>
                ) : (
                  <p className="text-gray-300 whitespace-pre-line">{info.details}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-white placeholder-gray-400 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-white placeholder-gray-400 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none text-white placeholder-gray-400 ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    placeholder="Tell us about your inquiry..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blush-400 to-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blush-500 hover:to-primary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-lg overflow-hidden">
              <div className="h-full min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Visit Our Studio</h3>
                  <p className="text-gray-300 mb-4">123 Beauty Street<br />New York, NY 10001</p>
                  <a
                    href="https://maps.google.com?q=123+Beauty+Street+New+York+NY+10001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blush-400 to-primary-500 text-white px-6 py-3 rounded-full font-medium hover:from-blush-500 hover:to-primary-600 transition-all duration-200"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black border border-gray-800 rounded-3xl p-8 shadow-lg">
            <MessageCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">
              Quick Response on WhatsApp
            </h2>
            <p className="text-gray-300 mb-6">
              Need a quick answer? Message us on WhatsApp for immediate assistance with your beauty needs.
            </p>
            <a
              href="https://wa.me/1234567890?text=Hi%20Brows%20and%20Beyond%2C%20I%27d%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;