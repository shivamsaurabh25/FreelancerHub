import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Star, Shield, Zap, Globe } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Find Top Talent",
      description: "Connect with skilled freelancers from around the world"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Quality Projects",
      description: "Access high-quality projects that match your skills"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing for all transactions"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Matching",
      description: "Quick and efficient matching system for optimal results"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Freelancers" },
    { number: "5K+", label: "Completed Projects" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Countries" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 animate-float">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Connect, Create, </span>
              <br />
              <span className="text-white">Collaborate</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              The ultimate platform where talented freelancers meet visionary clients.
              Build amazing projects together with our cutting-edge matching system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 animate-pulse-glow"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/browse-freelancers"
                className="btn-glass text-lg px-8 py-4"
              >
                Explore Talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="card-glass text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">FreelanceHub</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the features that make our platform the perfect choice for freelancers and clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-glass text-center group">
                <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-8 sm:p-12">
            <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers and clients who are already building amazing projects together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Join as Freelancer</span>
              </Link>
              <Link
                to="/register"
                className="btn-glass text-lg px-8 py-4 flex items-center space-x-2"
              >
                <Briefcase className="w-5 h-5" />
                <span>Hire Freelancers</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FreelanceHub</span>
          </div>
          <p className="text-white/60">
            © 2024 FreelanceHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
