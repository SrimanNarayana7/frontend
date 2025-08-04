import React from 'react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import Ashu_img from '../assets/Ashu_img.jpg';
import jeevan_img from '../assets/jeevan_img.jpg';

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: '2000+', label: 'Happy Clients' },
    { icon: Clock, value: '5+', label: 'Years Experience' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: Heart, value: '100%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
              About Brows and Beyond
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner in permanent makeup and aesthetic treatments, 
              dedicated to enhancing your natural beauty with artistry and care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                At Brows and Beyond, we believe that beauty is about enhancing what makes you uniquely you. 
                Our mission is to provide exceptional permanent makeup and aesthetic treatments that boost your 
                confidence and save you time, while maintaining the highest standards of safety and artistry.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                We combine cutting-edge techniques with personalized care to deliver results that look natural 
                and beautiful. Every treatment is customized to complement your individual features, lifestyle, 
                and beauty goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blush-400/20 border border-blush-400/30 px-4 py-2 rounded-full">
                  <span className="text-primary-400 font-medium">Professional</span>
                </div>
                <div className="bg-blush-400/20 border border-blush-400/30 px-4 py-2 rounded-full">
                  <span className="text-primary-400 font-medium">Caring</span>
                </div>
                <div className="bg-blush-400/20 border border-blush-400/30 px-4 py-2 rounded-full">
                  <span className="text-primary-400 font-medium">Artistic</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={jeevan_img}
                alt="About Us"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-300">
              Numbers that speak to our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={Ashu_img}
                alt="Founder"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-gray-300 font-medium">5.0 Rating</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold text-white mb-4">
                Meet Our Founder
              </h2>
              <h3 className="text-xl font-semibold text-primary-400 mb-4">
                Sarah Martinez, Lead Artist & Founder
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                With over 8 years of experience in permanent makeup and aesthetic treatments, 
                Sarah founded Brows and Beyond with a vision to help women feel confident and beautiful 
                in their own skin. Her passion for artistry and commitment to excellence has made her 
                one of the most sought-after permanent makeup artists in the region.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Sarah is certified in advanced microblading, permanent makeup, and various aesthetic 
                treatments. She regularly attends industry conferences and training sessions to stay 
                at the forefront of the latest techniques and technologies.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Certified Permanent Makeup Artist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Advanced Microblading Specialist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">Aesthetic Treatment Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Compassionate Care</h3>
              <p className="text-gray-300">
                We treat every client with kindness, respect, and understanding, 
                ensuring you feel comfortable and valued throughout your journey with us.
              </p>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Excellence</h3>
              <p className="text-gray-300">
                We strive for perfection in every treatment, using only the highest quality 
                products and the most advanced techniques available.
              </p>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Personalization</h3>
              <p className="text-gray-300">
                Every treatment is customized to your unique features, preferences, 
                and lifestyle to ensure results that are perfectly suited to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;