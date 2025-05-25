import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, DollarSign, MapPin, Calendar, User, Briefcase } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();

  // Mock job data
  const job = {
    id: id,
    title: 'E-commerce Website Development',
    company: 'TechStart Inc.',
    budget: '$3,000 - $5,000',
    duration: '2-3 months',
    location: 'Remote',
    posted: '2 days ago',
    applications: 12,
    description: `We are looking for an experienced full-stack developer to build a modern, scalable e-commerce platform. The project involves creating a user-friendly frontend, robust backend API, payment integration, and admin dashboard.

Key Features Required:
• Product catalog with search and filtering
• Shopping cart and checkout process
• User registration and authentication
• Payment processing (Stripe integration)
• Order management system
• Admin dashboard for inventory management
• Responsive design for mobile and desktop

The ideal candidate should have experience with modern web technologies and e-commerce platforms. We value clean code, good communication, and attention to detail.`,
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express.js', 'JWT'],
    requirements: [
      '3+ years of full-stack development experience',
      'Experience with e-commerce platforms',
      'Strong knowledge of React and Node.js',
      'Experience with payment gateway integration',
      'Good communication skills',
      'Portfolio of similar projects'
    ],
    clientInfo: {
      name: 'Sarah Wilson',
      company: 'TechStart Inc.',
      rating: 4.8,
      jobsPosted: 15,
      totalSpent: '$45,000'
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="glass-strong rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-white mb-4">{job.title}</h1>
              <p className="text-purple-300 text-lg font-medium mb-6">{job.company}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-white/70">
                  <DollarSign className="w-5 h-5" />
                  <span>{job.budget}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Clock className="w-5 h-5" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {job.posted}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="card-glass">
              <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
              <div className="text-white/80 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="card-glass">
              <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2 text-white/80">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <div className="card-glass">
              <button className="btn-primary w-full text-lg py-4 mb-4">
                Apply for this Job
              </button>
              <p className="text-white/60 text-sm text-center">
                {job.applications} freelancers have applied
              </p>
            </div>

            {/* Client Info */}
            <div className="card-glass">
              <h3 className="text-lg font-semibold text-white mb-4">About the Client</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{job.clientInfo.name}</p>
                    <p className="text-white/70 text-sm">{job.clientInfo.company}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Rating:</span>
                    <span className="text-white">{job.clientInfo.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Jobs Posted:</span>
                    <span className="text-white">{job.clientInfo.jobsPosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Spent:</span>
                    <span className="text-white">{job.clientInfo.totalSpent}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="card-glass">
              <h3 className="text-lg font-semibold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                <div className="p-3 glass rounded-lg">
                  <p className="text-white text-sm font-medium">React Developer Needed</p>
                  <p className="text-white/60 text-xs">$2,000 - $3,000</p>
                </div>
                <div className="p-3 glass rounded-lg">
                  <p className="text-white text-sm font-medium">Full Stack Web App</p>
                  <p className="text-white/60 text-xs">$4,000 - $6,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
