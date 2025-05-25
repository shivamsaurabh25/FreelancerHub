import React, { useState, useEffect } from 'react';
import { Search, Clock, DollarSign, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToJobs, applyToJob, bookmarkJob, removeBookmark } from '../services/firebase';

const JOBS_PER_PAGE = 5;

const BrowseJobs = () => {
  const { user, userData } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [applyingToJob, setApplyingToJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = subscribeToJobs((jobsList) => {
      setJobs(jobsList);
      setLoading(false);
    }, { status: 'open' });

    return () => unsubscribe && unsubscribe();
  }, []);

  const handleApplyToJob = async (job) => {
    if (!user || !userData) {
      alert('Please log in to apply for jobs.');
      return;
    }

    if (userData.userType !== 'freelancer') {
      alert('Only freelancers can apply to jobs.');
      return;
    }

    if (userData.appliedJobs?.includes(job.id)) {
      alert('You have already applied to this job.');
      return;
    }

    setApplyingToJob(job.id);
    try {
      await applyToJob(job.id, user.uid, {
        freelancerName: userData.name,
        message: `Hi, I'm interested in your ${job.title} project. I have experience with ${job.skills?.slice(0, 3).join(', ')} and would love to discuss how I can help bring your project to life.`,
      });
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setApplyingToJob(null);
    }
  };

  const handleBookmarkToggle = async (jobId) => {
    if (!user || !userData) {
      alert('Please log in to bookmark jobs.');
      return;
    }

    const isBookmarked = userData.bookmarkedJobs?.includes(jobId);
    try {
      if (isBookmarked) {
        await removeBookmark(jobId, user.uid);
      } else {
        await bookmarkJob(jobId, user.uid);
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diff = now - jobDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return jobDate.toLocaleDateString();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  if (loading) {
    return (
      <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="glass-strong rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'writing', label: 'Writing & Content' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'data-science', label: 'Data Science & Analytics' },
    { value: 'consulting', label: 'Business Consulting' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Find Your Next Project</h1>
          <p className="text-white/70">Discover exciting opportunities that match your skills</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search jobs by title, skills, or company..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input-glass pl-12 w-full"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="input-glass min-w-[200px]"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex items-center justify-between text-white/70">
            <span>{filteredJobs.length} jobs found</span>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setCurrentPage(1);
                }}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {paginatedJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-strong rounded-2xl p-8">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-white/60">
                  {searchTerm || selectedCategory
                    ? 'Try adjusting your search criteria or filters'
                    : 'Be the first to post a job and find amazing talent!'}
                </p>
              </div>
            </div>
          ) : (
            paginatedJobs.map((job) => {
              const isBookmarked = userData?.bookmarkedJobs?.includes(job.id);
              const isApplied = userData?.appliedJobs?.includes(job.id);

              return (
                <div key={job.id} className="card-glass group relative">
                  {/* Bookmark */}
                  <button
                    onClick={() => handleBookmarkToggle(job.id)}
                    className="absolute top-4 right-4 text-white/70 hover:text-purple-400"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
                  </button>

                  <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                        {job.title}
                      </h3>
                      <p className="text-purple-300 font-medium mb-2">{job.company}</p>
                      <p className="text-white/70 mb-4 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Posted {formatDate(job.posted)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-white/70">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Apply before deadline</span>
                    {isApplied ? (
                      <span className="text-green-400 font-semibold">Already Applied</span>
                    ) : (
                      <button
                        className="btn-primary px-6 py-2"
                        onClick={() => handleApplyToJob(job)}
                        disabled={applyingToJob === job.id}
                      >
                        {applyingToJob === job.id ? 'Applying...' : 'Apply Now'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-4 text-white">
            <button
              className="btn-secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 pt-2">Page {currentPage} of {totalPages}</span>
            <button
              className="btn-secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;