import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';

const Profile = () => {
  const { userData } = useAuth();

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">Profile Settings</h1>
            <button className="btn-primary flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image and Basic Info */}
            <div className="lg:col-span-1">
              <div className="card-glass text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {userData?.name || 'User Name'}
                </h2>
                <p className="text-purple-300 capitalize">
                  {userData?.userType || 'User'}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-glass">
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-white/70">Email:</span>
                    <span className="text-white">{userData?.email || 'user@example.com'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span className="text-white/70">Phone:</span>
                    <span className="text-white">{userData?.phone || '0123456789'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-white/70">Location:</span>
                    <span className="text-white">{userData?.location || 'India'}</span>
                  </div>
                </div>
              </div>

              {userData?.userType === 'freelancer' && (
                <div className="card-glass">
                  <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-white/70">Skills:</span>
                      <p className="text-white mt-1">Add your skills to attract clients</p>
                    </div>
                    <div>
                      <span className="text-white/70">Hourly Rate:</span>
                      <p className="text-white mt-1">Set your hourly rate</p>
                    </div>
                    <div>
                      <span className="text-white/70">Portfolio:</span>
                      <p className="text-white mt-1">Showcase your work</p>
                    </div>
                  </div>
                </div>
              )}

              {userData?.userType === 'client' && (
                <div className="card-glass">
                  <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-white/70">Company:</span>
                      <p className="text-white mt-1">Add your company name</p>
                    </div>
                    <div>
                      <span className="text-white/70">Industry:</span>
                      <p className="text-white mt-1">Specify your industry</p>
                    </div>
                    <div>
                      <span className="text-white/70">Website:</span>
                      <p className="text-white mt-1">Add your website URL</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
