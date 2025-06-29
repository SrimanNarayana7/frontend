import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blush-400/10 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-500/10 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gold-400/10 rounded-full opacity-30 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Sparkles className="w-8 h-8 text-gold-400 mr-3" />
              <span className="text-gold-400 font-medium text-lg">Premium Beauty Services</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
              Enhance Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-400 to-primary-500 block">
                Natural Beauty
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Discover the art of permanent makeup and aesthetic treatments that bring out your natural radiance. 
              Our expert team combines skill, artistry, and the latest techniques to help you look and feel your best.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToBooking}
                className="bg-gradient-to-r from-blush-400 to-primary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blush-500 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Book Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <Link
                to="/services"
                className="border-2 border-primary-400 text-primary-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-400 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202407/make-up-artist-applying-permanent-make-up-on-lips-at-beauty-treatment-beautician-contouring-young-w-31073190-1x1.jpg?VersionId=p7REoVO9SQoBdi9hDV3cex.w6_na8Mb4"
                alt="Beauty Treatment"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating testimonial card */}
            <div className="absolute -bottom-6 -left-6 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl max-w-xs animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center mb-3">
                <div className="flex text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-300 ml-2">5.0 Rating</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                "Absolutely amazing results! Professional and caring service."
              </p>
              <p className="text-xs text-gray-400">- Sarah M.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;