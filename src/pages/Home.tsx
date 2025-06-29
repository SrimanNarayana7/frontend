

import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, Users } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Treatments',
      description: 'State-of-the-art permanent makeup and aesthetic treatments tailored to your unique beauty.'
    },
    {
      icon: Heart,
      title: 'Caring Service',
      description: 'Our team provides personalized care with attention to detail and your comfort in mind.'
    },
    {
      icon: Award,
      title: 'Expert Professionals',
      description: 'Certified and experienced artists using the latest techniques and highest quality products.'
    },
    {
      icon: Users,
      title: 'Satisfied Clients',
      description: 'Join thousands of happy clients who trust us with their beauty transformation.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5,
      text: 'Amazing experience! My eyebrows look perfect and natural. The staff was incredibly professional and made me feel comfortable throughout the entire process.'
    },
    {
      name: 'Emily Davis',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5,
      text: 'I love my new permanent makeup! It saves me so much time in the morning and looks absolutely beautiful. Highly recommend Brows and Beyond.'
    },
    {
      name: 'Jessica Wilson',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5,
      text: 'The best decision I made! Professional service, beautiful results, and amazing aftercare. I feel more confident than ever.'
    }
  ];

  return (
    <div className="bg-black">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">
              Why Choose Brows and Beyond?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine artistry, expertise, and premium care to deliver exceptional results that enhance your natural beauty.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blush-400/20 to-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blush-400/30 group-hover:to-primary-500/30 transition-all duration-300 border border-blush-400/30">
                  <feature.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our range of permanent makeup and aesthetic treatments designed to enhance your natural beauty.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://t4.ftcdn.net/jpg/03/43/62/77/240_F_343627733_pob8pYDxtP754uAy76gxaA95G0qu1gxh.jpg"
                alt="Eyebrow Treatments"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Eyebrow Treatments</h3>
                <p className="text-gray-300">Perfect your brows with our microblading and permanent makeup services.</p>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://t4.ftcdn.net/jpg/06/34/83/33/360_F_634833308_kfLFGbGvcD5323kqcF5jp6NrPwTiYle5.jpg"
                alt="Lip Treatments"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Lip Treatments</h3>
                <p className="text-gray-300">Enhance your lips with our permanent lip color and contouring services.</p>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <img
                src="  https://holisticaesthetics.whitecoats.com/wp-content/uploads/sites/55/elementor/thumbs/Picture14-r1jc2hlaj0dm130na625kpoad4p39ckhme4hnbhtlc.jpg"
                alt="Skincare"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Skincare</h3>
                <p className="text-gray-300">Rejuvenate your skin with our advanced aesthetic treatments.</p>
              </div>
            
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/services"
              className="bg-gradient-to-r from-blush-400 to-primary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blush-500 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300">
              Real experiences from our satisfied clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black border border-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <div className="flex text-gold-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold text-white mb-4">
            Ready to Enhance Your Beauty?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your consultation today and discover the perfect treatment for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-gradient-to-r from-blush-400 to-primary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blush-500 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              Contct Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;