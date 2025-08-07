import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Bookmark, BookmarkCheck } from 'lucide-react';

const JobListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const jobListings = [
    {
      id: 1,
      company: 'TCS',
      role: 'Digital Marketing Intern',
      type: 'Internship',
      description: 'need Digital Marketing Intern',
      visitDate: '7/18/2025',
      location: 'All Branches',
      cgpa: 'Not specified',
      tags: ['Internship', 'Technology'],
      logo: 'TCS'
    },
    {
      id: 2,
      company: 'Wipro',
      role: 'Project Engineer',
      type: 'Full-time',
      description: 'Develop and support software solutions for clients across various domains.',
      visitDate: '7/23/2025',
      location: 'All Branches',
      cgpa: 'Not specified',
      tags: ['Internship', 'Technology'],
      logo: 'W'
    },
    {
      id: 3,
      company: 'Microsoft',
      role: 'Junior Software Developer',
      type: 'Full-time',
      description: 'need a junior software developer',
      visitDate: '7/26/2025',
      location: 'All Branches',
      cgpa: 'Not specified',
      tags: ['Internship', 'Technology'],
      logo: 'MS'
    },
    {
      id: 4,
      company: 'Microsoft',
      role: 'Jr Software Developer',
      type: 'Full-time',
      description: 'need jr software developer',
      visitDate: '7/26/2025',
      location: 'All Branches',
      cgpa: 'Not specified',
      tags: ['Internship', 'Technology'],
      logo: 'MS'
    },
    {
      id: 5,
      company: 'Infosys',
      role: 'Data Scientist',
      type: 'Full-time',
      description: 'need Data Scientist. Training will be provided',
      visitDate: '7/31/2025',
      location: 'All Branches',
      cgpa: 'Not specified',
      tags: ['Internship', 'Technology'],
      logo: 'MS'
    },
    {
      id: 6,
      company: 'Reliance',
      role: 'aksjdjshdj',
      type: 'Full-time',
      description: 'lalajlaj',
      visitDate: '7/31/2025',
      location: 'All Branches',
      cgpa: 'Not specified',
      tags: ['Internship', 'Technology'],
      logo: 'MS'
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'bookmarked') return matchesSearch && bookmarkedJobs.has(job.id);
    if (activeFilter === 'applied') return matchesSearch; // Placeholder for applied logic
    
    return matchesSearch;
  });

  const CompanyLogo = ({ company, logo }) => (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
      {logo}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Career Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your next career move with top companies. Find internships and full-time positions that match your skills.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search companies, roles, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Companies
              </button>
              <button
                onClick={() => setActiveFilter('bookmarked')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeFilter === 'bookmarked'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Bookmark className="h-4 w-4" />
                Bookmarked
              </button>
              <button
                onClick={() => setActiveFilter('applied')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === 'applied'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Applied
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CompanyLogo company={job.company} logo={job.logo} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                        {job.company}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md mt-1">
                        TECHNOLOGY
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(job.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {bookmarkedJobs.has(job.id) ? (
                      <BookmarkCheck className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Bookmark className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {job.role}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Visit: {job.visitDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>CGPA: {job.cgpa}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                    Apply Now
                  </button>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filters to find more opportunities that match your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;