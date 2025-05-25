import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, DollarSign, User, Mail, Briefcase } from 'lucide-react';

const FreelancerDetail = () => {
  const { id } = useParams();

  // Mock freelancer data
  const freelancer = {
    id: id,
    name: 'Sarah Johnson',
    title: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69e21b9?w=300',
    rating: 4.9,
    reviews: 47,
    location: 'San Francisco, CA',
    hourlyRate: 85,
    totalEarned: '$125,000+',
    jobsCompleted: 89,
    responseTime: '2 hours',
    availability: 'Available',
    about: `I'm a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in React, Node.js, and cloud technologies. I love working with startups and established companies to bring their ideas to life.

My approach is collaborative and client-focused. I believe in clear communication, regular updates, and delivering high-quality code that is maintainable and scalable.

When I'm not coding, you can find me contributing to open source projects, mentoring junior developers, or exploring new technologies.`,
    skills: [
      'React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL',
      'AWS', 'Docker', 'GraphQL', 'Next.js', 'Express.js', 'REST APIs'
    ],
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300',
        tech: ['React', 'Node.js', 'Stripe', 'MongoDB']
      },
      {
        title: 'Task Management App',
        description: 'Collaborative project management tool',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300',
        tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS']
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time data visualization dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
        tech: ['React', 'D3.js', 'Python', 'FastAPI']
      }
    ],
    testimonials: [
      {
        client: 'Mike Chen',
        company: 'TechStart Inc.',
        rating: 5,
        comment: 'Sarah delivered exceptional work on our e-commerce platform. Her code quality is outstanding and she communicated clearly throughout the project.'
      },
      {
        client: 'Emily Rodriguez',
        company: 'GrowthCorp',
        rating: 5,
        comment: 'Working with Sarah was a pleasure. She understood our requirements perfectly and delivered ahead of schedule.'
      }
    ]
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{freelancer.name}</h1>
                  <p className="text-xl text-purple-300 mb-4">{freelancer.title}</p>

                  <div className="flex flex-wrap items-center gap-4 text-white/70">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{freelancer.rating}</span>
                      <span>({freelancer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{freelancer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${freelancer.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="card-glass">
              <h2 className="text-xl font-semibold text-white mb-4">About</h2>
              <div className="text-white/80 whitespace-pre-line leading-relaxed">
                {freelancer.about}
              </div>
            </div>

            {/* Skills */}
            <div className="card-glass">
              <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="card-glass">
              <h2 className="text-xl font-semibold text-white mb-6">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {freelancer.portfolio.map((project, index) => (
                  <div key={index} className="glass rounded-xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2">{project.title}</h3>
                      <p className="text-white/70 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="card-glass">
              <h2 className="text-xl font-semibold text-white mb-6">Client Testimonials</h2>
              <div className="space-y-4">
                {freelancer.testimonials.map((testimonial, index) => (
                  <div key={index} className="glass rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{testimonial.client}</p>
                        <p className="text-white/60 text-sm">{testimonial.company}</p>
                      </div>
                      <div className="flex ml-auto">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/80 italic">"{testimonial.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="card-glass">
              <button className="btn-primary w-full text-lg py-4 mb-4">
                Contact Sarah
              </button>
              <button className="btn-glass w-full py-3">
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>

            {/* Stats */}
            <div className="card-glass">
              <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Total Earned:</span>
                  <span className="text-white font-medium">{freelancer.totalEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Jobs Completed:</span>
                  <span className="text-white font-medium">{freelancer.jobsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Response Time:</span>
                  <span className="text-white font-medium">{freelancer.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Availability:</span>
                  <span className="text-green-400 font-medium">{freelancer.availability}</span>
                </div>
              </div>
            </div>

            {/* Similar Freelancers */}
            <div className="card-glass">
              <h3 className="text-lg font-semibold text-white mb-4">Similar Freelancers</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Mike Chen</p>
                    <p className="text-white/60 text-xs">UI/UX Designer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Alex Smith</p>
                    <p className="text-white/60 text-xs">Backend Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetail;
