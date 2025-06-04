'use client';

import { useState } from 'react';
import { Container, Title, Button, Group } from '@mantine/core';
import { JobList } from '@/components/JobList';
import { Job } from '@/types/job';
import { useRouter } from 'next/navigation';

// Temporary mock data - replace with API calls
const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    companyName: 'Tech Corp',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    salaryRange: '$120,000 - $180,000',
    description: 'We are looking for a senior software engineer...',
    requirements: '5+ years of experience...',
    responsibilities: 'Lead development of core features...',
    applicationDeadline: new Date('2024-05-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock jobs as needed
];

export default function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const handleEdit = (job: Job) => {
    router.push(`/jobs/${job.id}/edit`);
  };

  const handleDelete = async (id: number) => {
    // TODO: Implement API call to delete job
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title>Job Listings</Title>
        <Button onClick={() => router.push('/jobs/create')}>
          Create New Job
        </Button>
      </Group>

      <JobList
        jobs={jobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}
