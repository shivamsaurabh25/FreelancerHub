import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/firebase';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Users, Briefcase, Phone, Globe, MapPin, CreditCard, FileText } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'freelancer',

    // Freelancer specific
    phone: '',
    location: '',
    skills: '',
    hourlyRate: '',
    portfolio: '',

    // Client specific
    companyName: '',
    industry: '',
    website: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    // Additional validation for freelancer and client fields could be added here

    try {
      // Prepare userData to pass to signUp
      let userData = {
        name: formData.name,
        userType: formData.userType,
        profileComplete: false
      };

      if (formData.userType === 'freelancer') {
        userData = {
          ...userData,
          phone: formData.phone,
          location: formData.location,
          skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean), // convert skills string to array
          hourlyRate: formData.hourlyRate,
          portfolio: formData.portfolio
        };
      } else if (formData.userType === 'client') {
        userData = {
          ...userData,
          companyName: formData.companyName,
          industry: formData.industry,
          website: formData.website
        };
      }

      await signUp(formData.email, formData.password, {
        userType: formData.userType,
        name: formData.name,
        skills: formData.skills.split(",").map(s => s.trim()),
        company: formData.company,
        website: formData.website,
        location: formData.location,
        portfolio: formData.portfolio,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      default:
        return 'Registration failed. Please try again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div className="max-w-md w-full">
        <div className="glass-strong rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Join FreelanceHub</h2>
            <p className="text-white/70">Create your account and start your journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'freelancer' })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                    formData.userType === 'freelancer'
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-white/20 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  <Users className="w-6 h-6" />
                  <span className="text-sm font-medium">Find Work</span>
                  <span className="text-xs">As Freelancer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'client' })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                    formData.userType === 'client'
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-white/20 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  <Briefcase className="w-6 h-6" />
                  <span className="text-sm font-medium">Hire Talent</span>
                  <span className="text-xs">As Client</span>
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-glass pl-12"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-glass pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Conditional Fields Based on User Type */}

            {formData.userType === 'freelancer' && (
              <>
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-white/80 text-sm font-medium mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="Enter your location"
                      required
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label htmlFor="skills" className="block text-white/80 text-sm font-medium mb-2">
                    Skills (comma separated)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="e.g., React, Node.js, UI Design"
                      required
                    />
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <label htmlFor="hourlyRate" className="block text-white/80 text-sm font-medium mb-2">
                    Hourly Rate ($)
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="number"
                      id="hourlyRate"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="Enter your hourly rate"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Portfolio */}
                <div>
                  <label htmlFor="portfolio" className="block text-white/80 text-sm font-medium mb-2">
                    Portfolio URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </>
            )}

            {formData.userType === 'client' && (
              <>
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-white/80 text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block text-white/80 text-sm font-medium mb-2">
                    Industry
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="Enter your industry"
                      required
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-white/80 text-sm font-medium mb-2">
                    Company Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="input-glass pl-12"
                      placeholder="https://companywebsite.com"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-glass pl-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-glass pl-12"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl py-3 text-white font-semibold transition-colors duration-300"
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-white/80 mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-600 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;