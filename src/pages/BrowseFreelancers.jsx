import React from 'react';
import { Search, Filter, Star, MapPin } from 'lucide-react';

const BrowseFreelancers = () => {
  const mockFreelancers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      rating: 4.9,
      reviews: 47,
      location: 'San Francisco, CA',
      hourlyRate: 85,
      skills: ['React', 'Node.js', 'Python'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69e21b9?w=150'
    },
    {
      id: 2,
      name: 'Mike Chen',
      title: 'UI/UX Designer',
      rating: 4.8,
      reviews: 32,
      location: 'New York, NY',
      hourlyRate: 75,
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Digital Marketing Specialist',
      rating: 5.0,
      reviews: 28,
      location: 'Los Angeles, CA',
      hourlyRate: 65,
      skills: ['SEO', 'Content Marketing', 'Analytics'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Find Talented Freelancers</h1>
          <p className="text-white/70">Discover skilled professionals for your projects</p>
        </div>

        {/* Search and Filters */}
        <div className="glass-strong rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search freelancers by skills, title, or name..."
                className="input-glass pl-12 w-full"
              />
            </div>
            <button className="btn-glass flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFreelancers.map((freelancer) => (
            <div key={freelancer.id} className="card-glass group cursor-pointer">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {freelancer.name}
                  </h3>
                  <p className="text-white/70 text-sm">{freelancer.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white/70 text-sm">
                      {freelancer.rating} ({freelancer.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-white/60 text-sm mb-3">
                <MapPin className="w-4 h-4" />
                <span>{freelancer.location}</span>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">
                  ${freelancer.hourlyRate}/hr
                </span>
                <button className="btn-primary px-4 py-2 text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseFreelancers;
