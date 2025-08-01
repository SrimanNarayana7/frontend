// Dashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, User, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Appointment } from '../types';
import { getStatus, formatDate } from '../utils/timeUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';


const Dashboard: React.FC = () => {
  const [liveCountdowns, setLiveCountdowns] = useState<{ [id: string]: string }>({});
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  useEffect(() => {
    if (!appointments.length) return;

    countdownInterval.current = setInterval(() => {
      const now = new Date();
      const newCountdowns: { [id: string]: string } = {};

      appointments.forEach((apt) => {
        if (apt.status !== 'cancelled' && apt.date && apt.time) {
          const appointmentTime = new Date(`${apt.date} ${apt.time}`);
          const diffMs = appointmentTime.getTime() - now.getTime();
          const mins = Math.max(0, Math.floor(diffMs / 60000));
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          if (getStatus(apt.date, apt.time, apt.duration) === 'upcoming') {
            newCountdowns[apt.id] = `${h}h ${m}m left`;
          }
        }
      });

      setLiveCountdowns(newCountdowns);
    }, 60000);

    return () => countdownInterval.current && clearInterval(countdownInterval.current);
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`https://browsbeyond-production.up.railway.app/user/appointments/${user?.id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      const valid = data.filter((apt: Appointment) => apt.date && apt.time);
      setAppointments(valid); 
      console.error('Error:', e);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id: string, date: string, time: string) => {
    const now = new Date();
    const start = new Date(`${date} ${time}`);
    if ((start.getTime() - now.getTime()) / 60000 <= 60) {
      toast.error('❗ Cannot cancel within 1 hour of appointment.');
      return;
    }

    if (!window.confirm('Cancel this appointment?')) return;
    setCancellingId(id);
    try {
      const response = await fetch(`https://browsbeyond-production.up.railway.app/enquiry/${id}/cancel`, {
        method: "PUT",
      });

      if (response.ok) {
        setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt)));
        toast("Appointment cancelled successfully!");
      } else {
        toast.error('Failed to cancel appointment');
      }
    } catch (e) {
      toast.error('Failed to cancel appointment');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-900 text-blue-300';
      case 'in-progress': return 'bg-yellow-900 text-yellow-300';
      case 'completed': return 'bg-green-900 text-green-300';
      case 'cancelled': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Calendar className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Dynamic status filtering
  const upcomingOnly = appointments.filter(a => a.status !== 'cancelled' && getStatus(a.date, a.time, a.duration) === 'upcoming');
  const inProgressOnly = appointments.filter(a => a.status !== 'cancelled' && getStatus(a.date, a.time, a.duration) === 'in-progress');
  const completedOnly = appointments.filter(a => a.status !== 'cancelled' && getStatus(a.date, a.time, a.duration) === 'completed');
  const cancelledOnly = appointments.filter(a => a.status === 'cancelled');

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-playfair font-bold text-white mb-4">Welcome, {user?.username}</h1>
        <p className="text-xl text-gray-300 mb-10">Manage your appointments and track your beauty journey.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-blue-400" />
              <div className="ml-4">
                <p className="text-xl font-bold text-white">{upcomingOnly.length + inProgressOnly.length}</p>
                <p className="text-xl text-gray-300 text-sm">Upcoming</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div className="ml-4">
                <p className="text-xl font-bold text-white">{completedOnly.length + cancelledOnly.length}</p>
                <p className="text-xl text-gray-300 text-sm">Past</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 p-6 rounded-xl shadow">
            <div className="flex items-center">
              <User className="w-6 h-6 text-purple-400" />
              <div className="ml-4">
                <p className="text-xl font-bold text-white">{appointments.length}</p>
                <p className="text-xl text-gray-300 text-sm">Total Visits</p>
              </div>
            </div>
          </div>
        </div>

        {[{ title: 'Upcoming', list: upcomingOnly }, { title: 'In Progress', list: inProgressOnly }].map(({ title, list }) => (
          <div key={title} className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
            {list.length === 0 ? <p className="text-gray-500">No {title.toLowerCase()} appointments.</p> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {list.map(apt => {
                  const status = getStatus(apt.date, apt.time, apt.duration);
                  return (
                    <div key={apt.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{apt.servicename}</h3>
                          <div className="text-gray-400 text-sm">
                            {formatDate(apt.date)} • {apt.time}
                            {liveCountdowns[apt.id] && (
                              <span className="ml-2 text-xs text-blue-400">({liveCountdowns[apt.id]})</span>
                            )}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 border ${getStatusColor(status)}`}>
                          {getStatusIcon(status)}<span className="text-sm text-gray-100">{status}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-violet-300 font-semibold">Duration: {apt.duration}</span>
                        {status === 'upcoming' && (
                          <button
                            className="mt-2 text-red-600 hover:text-red-700"
                            onClick={() => handleCancelAppointment(apt.id, apt.date!, apt.time!)}
                          >
                            cancel
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {(completedOnly.length > 0 || cancelledOnly.length > 0) && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-3">Past Treatments</h2>
            {[{ title: 'Completed', list: completedOnly }, { title: 'Cancelled', list: cancelledOnly }].map(({ title, list }) => (
              <div key={title} className="mb-6">
                <h3 className="text-lg text-gray-300 mb-2">{title}</h3>
                {list.length === 0 ? (
                  <p className="text-gray-500 text-sm">No {title.toLowerCase()} treatments.</p>
                ) : (
                  <div className="divide-y divide-gray-800 border border-gray-700 rounded-lg">
                    {list.map(apt => {
                      const status = apt.status === 'cancelled' ? 'cancelled' : getStatus(apt.date, apt.time, apt.duration);
                      return (
                        <div key={apt.id} className="px-6 py-4 hover:bg-gray-800/50 transition-colors duration-200">
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <div>
                                <h4 className="text-xl font-semibold text-white">{apt.servicename}</h4>
                                <p className="text-gray-400 text-sm">{formatDate(apt.date)} at {apt.time}</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(status)}`}>
                              {getStatusIcon(status)}<span className="text-sm text-gray-100">{status}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
