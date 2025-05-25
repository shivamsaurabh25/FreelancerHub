import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/firebase';
import { Menu, X, User, LogOut, Briefcase, Users, Plus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="glass-strong fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FreelanceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/browse-freelancers"
              className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-1"
            >
              <Users className="w-4 h-4" />
              <span>Find Freelancers</span>
            </Link>
            <Link
              to="/browse-jobs"
              className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-1"
            >
              <Briefcase className="w-4 h-4" />
              <span>Find Jobs</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {userData?.userType === 'client' && (
                  <Link
                    to="/create-job"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post Job</span>
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300">
                    <User className="w-5 h-5" />
                    <span className="hidden sm:block">{userData?.name || user.displayName}</span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg glass hover:bg-white/20 transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/browse-freelancers"
              className="block text-white/80 hover:text-white transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Find Freelancers
            </Link>
            <Link
              to="/browse-jobs"
              className="block text-white/80 hover:text-white transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Find Jobs
            </Link>

            {user ? (
              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="text-white font-medium">
                  {userData?.name || user.displayName}
                </div>
                {userData?.userType === 'client' && (
                  <Link
                    to="/create-job"
                    className="block text-purple-300 hover:text-purple-200 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Post Job
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="block text-white/80 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block text-white/80 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block text-red-300 hover:text-red-200 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-white/20">
                <Link
                  to="/login"
                  className="block text-white/80 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-purple-300 hover:text-purple-200 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
