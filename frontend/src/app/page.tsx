'use client';

import { useState, useEffect, Suspense } from 'react';
import { Container } from '@mantine/core';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { JobCard } from '@/components/JobCard';
import CreateJobModal from './jobs/create/page';
import { useSearchParams } from 'next/navigation';
import { Job } from '@/types/job';
import { jobsApi } from '@/services/api';
import { notifications } from '@mantine/notifications';

// Helper function to convert salary to monthly value
const convertSalaryToMonthly = (salary: string | undefined): number => {
  if (!salary) return 0;
  
  // Handle LPA format (e.g., "8 LPA")
  if (salary.includes('LPA')) {
    const lpa = parseInt(salary.split(' ')[0] || '0');
    return (lpa * 100000) / 12; // Convert LPA to monthly
  }
  
  // Handle monthly salary range (e.g., "₹20,000 - ₹70,000")
  if (salary.includes('₹')) {
    const amounts = salary.match(/₹([\d,]+)/g);
    if (amounts && amounts.length > 0) {
      // Use the lower bound of the range
      const amount = amounts[0].replace(/[₹,]/g, '');
      return parseInt(amount || '0');
    }
  }
  
  return 0;
};

// Mock jobs data - will always be shown
const mockJobs: Job[] = Array(8).fill(null).map((_, index) => ({
  id: -index - 1, // Using negative IDs to avoid conflicts with real jobs
  companyName: ['Amazon', 'Tesla', 'Swiggy'][index % 3],
  companyLogo: ['/images/amazon.png', '/images/img2.png', '/images/swiggy.png'][index % 3],
  title: ['Full Stack Developer', 'Node Js Developer', 'UX/UI Designer'][index % 3],
  experience: '1-3 yr Exp',
  workMode: 'Onsite',
  salary: '8 LPA',
  salaryRange: '₹20,000 - ₹70,000',
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

function HomeContent() {
  const searchParams = useSearchParams();
  const showCreateModal = searchParams.get('create') === 'true';
  const [realJobs, setRealJobs] = useState<Job[]>([]); // State for real jobs from API
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    salaryRange: [0, 80] as [number, number] // Add salary range filter
  });

  // Combine mock jobs with real jobs
  const allJobs = [...mockJobs, ...realJobs];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const fetchedJobs = await jobsApi.getAllJobs();
      setRealJobs(fetchedJobs);
    } catch (error) {
      notifications.show({
        title: 'Notice',
        message: 'Could not fetch additional jobs',
        color: 'blue',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = allJobs.filter(job => {
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

    // Apply salary filter
    if (filters.salaryRange) {
      const monthlySalary = convertSalaryToMonthly(job.salary || job.salaryRange);
      const [minFilter, maxFilter] = filters.salaryRange;
      
      // Convert filter values from k to actual values
      const minSalary = minFilter * 1000;
      const maxSalary = maxFilter * 1000;

      // If minimum filter is 0, show all jobs with salary greater than 0
      if (minFilter === 0) {
        return monthlySalary >= 0;
      }

      // Otherwise, apply the range filter
      if (monthlySalary < minSalary || monthlySalary > maxSalary) {
        return false;
      }
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

  const handleSalaryChange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, salaryRange: range }));
  };

  const handleApply = async (jobId: number) => {
    try {
      // TODO: Implement apply functionality
      console.log('Applying for job:', jobId);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to apply for job',
        color: 'red',
      });
    }
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
      {showCreateModal && <CreateJobModal onSuccess={fetchJobs} />}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
