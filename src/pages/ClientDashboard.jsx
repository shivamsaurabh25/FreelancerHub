import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Briefcase, Users, DollarSign, Clock } from 'lucide-react';

const ClientDashboard = () => {
  const { userData } = useAuth();

  const stats = [
    { icon: <Briefcase className="w-6 h-6" />, label: 'Active Jobs', value: '5' },
    { icon: <Users className="w-6 h-6" />, label: 'Hired Freelancers', value: '12' },
    { icon: <DollarSign className="w-6 h-6" />, label: 'Total Spent', value: '$8,500' },
    { icon: <Clock className="w-6 h-6" />, label: 'In Progress', value: '3' }
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {userData?.name}!
            </h1>
            <p className="text-white/70">Manage your projects and find talent</p>
          </div>
          <Link to="/create-job" className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0">
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </Link>
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
            <h2 className="text-xl font-semibold text-white mb-4">Your Job Posts</h2>
            <p className="text-white/70">Your posted jobs and their application status will appear here.</p>
          </div>

          <div className="card-glass">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Applications</h2>
            <p className="text-white/70">New applications from freelancers will be shown here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
