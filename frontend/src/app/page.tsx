'use client';

import { useState } from 'react';
import { Container } from '@mantine/core';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { JobCard } from '@/components/JobCard';
import CreateJobModal from './jobs/create/page';
import { useSearchParams } from 'next/navigation';
import { Job } from '@/types/job';

// Mock data matching the new design
const mockJobs: Job[] = Array(8).fill(null).map((_, index) => ({
  id: index + 1,
  companyName: ['Amazon', 'Tesla', 'Swiggy'][index % 3],
  companyLogo: ['/images/amazon.png', '/images/img2.png', '/images/swiggy.png'][index % 3],
  title: ['Full Stack Developer', 'Node Js Developer', 'UX/UI Designer'][index % 3],
  experience: '1-3 yr Exp',
  workMode: 'Onsite',
  salary: '12 LPA',
  salaryRange: '₹50,000 - ₹70,000',
  description: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized',
  requirements: "Bachelor's degree in Computer Science or related field, 3+ years of experience in web development",
  responsibilities: "Develop and maintain web applications, collaborate with cross-functional teams",
  applicationDeadline: new Date('2024-05-01'),
  postedTime: '24h Ago',
  location: ['Bangalore', 'Mumbai', 'Delhi'][index % 3],
  jobType: 'Full-time',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function Home() {
  const searchParams = useSearchParams();
  const showCreateModal = searchParams.get('create') === 'true';
  const [jobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: ''
  });

  const filteredJobs = jobs.filter(job => {
    // Apply search filter
    if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.companyName.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Apply location filter
    if (filters.location && job.location !== filters.location) {
      return false;
    }

    // Apply job type filter
    if (filters.jobType && job.jobType !== filters.jobType) {
      return false;
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({ ...prev, location }));
  };

  const handleJobTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, jobType: type }));
  };

  // Empty function for salary change - no filtering needed
  const handleSalaryChange = (range: [number, number]) => {
    // Slider UI only, no filtering
  };

  const handleApply = (jobId: number) => {
    console.log('Applying for job:', jobId);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SearchFilters
        onSearch={handleSearch}
        onLocationChange={handleLocationChange}
        onJobTypeChange={handleJobTypeChange}
        onSalaryChange={handleSalaryChange}
      />
      
      <div className="w-full flex justify-center mt-8">
        <div style={{
          width: '1264px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 298px)',
          gap: '24px',
          justifyContent: 'space-between'
        }}>
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
            />
          ))}
        </div>
      </div>
      {showCreateModal && <CreateJobModal />}
    </main>
  );
}
