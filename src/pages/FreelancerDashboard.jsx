import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Briefcase, Star, TrendingUp } from 'lucide-react';

const FreelancerDashboard = () => {
  const { userData } = useAuth();

  const stats = [
    { icon: <Briefcase className="w-6 h-6" />, label: 'Active Projects', value: '3' },
    { icon: <Star className="w-6 h-6" />, label: 'Rating', value: '4.9' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'This Month', value: '$2,400' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Completed', value: '28' }
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userData?.name}!
          </h1>
          <p className="text-white/70">Here's your freelancer dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card-glass">
              <div className="flex items-center space-x-3">
                <div className="text-purple-400">{stat.icon}</div>
                <div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-glass">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
            <p className="text-white/70">Your active and recent projects will appear here.</p>
          </div>

          <div className="card-glass">
            <h2 className="text-xl font-semibold text-white mb-4">Available Jobs</h2>
            <p className="text-white/70">New job opportunities matching your skills will be shown here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
