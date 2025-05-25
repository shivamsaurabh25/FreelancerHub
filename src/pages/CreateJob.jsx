import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createJob } from '../services/firebase';
import { Plus, X, DollarSign, Clock, MapPin, Briefcase } from 'lucide-react';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    location: 'Remote',
    skills: [],
    experience: 'intermediate',
    category: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.skills.length === 0) {
      setError('Please add at least one required skill.');
      setLoading(false);
      return;
    }

    try {
      const jobData = {
        ...formData,
        clientId: user.uid,
        clientName: userData?.name || user.displayName || 'Unknown Client',
        company: userData?.company || 'Freelance Project'
      };

      const jobId = await createJob(jobData);
      console.log('Job created with ID:', jobId);

      // Show success message and redirect
      alert('Job posted successfully!');
      navigate('/client-dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Post a New Job</h1>
            <p className="text-white/70">Find the perfect freelancer for your project</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-white/80 text-sm font-medium mb-2">
                Job Title *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-glass pl-12"
                  placeholder="e.g. Full Stack Developer for E-commerce Website"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-white/80 text-sm font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-glass appearance-none"
                required
              >
                <option value="">Select a category</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="design">Design & Creative</option>
                <option value="writing">Writing & Content</option>
                <option value="marketing">Digital Marketing</option>
                <option value="data-science">Data Science & Analytics</option>
                <option value="consulting">Business Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-white/80 text-sm font-medium mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="input-glass resize-none"
                placeholder="Describe your project in detail. Include requirements, objectives, and any specific instructions..."
                required
              />
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-white/80 text-sm font-medium mb-2">
                  Budget *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input-glass pl-12"
                    placeholder="e.g. $3,000 - $5,000"
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-white/80 text-sm font-medium mb-2">
                  Duration *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input-glass pl-12"
                    placeholder="e.g. 2-3 months"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-white/80 text-sm font-medium mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-glass pl-12 appearance-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                Experience Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'New to this field' },
                  { value: 'intermediate', label: 'Intermediate', desc: '2-5 years experience' },
                  { value: 'expert', label: 'Expert', desc: '5+ years experience' }
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience: level.value })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.experience === level.value
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/70 hover:border-white/30'
                    }`}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm opacity-70">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Required Skills *
              </label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="input-glass flex-1"
                    placeholder="Type a skill and press Enter"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill(e)}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="btn-primary px-4 py-3 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-lg"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/client-dashboard')}
                className="btn-glass px-8 py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.skills.length === 0}
                className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Post Job</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
