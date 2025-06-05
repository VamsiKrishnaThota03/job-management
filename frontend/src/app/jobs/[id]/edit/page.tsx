'use client';

import { Container, Title, LoadingOverlay } from '@mantine/core';
import { JobForm } from '@/components/JobForm';
import { Job, JobFormData } from '@/types/job';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useEffect, useState, use } from 'react';

export default function EditJob({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // TODO: Implement API call to fetch job
        // Mock data for now
        setJob({
          id: parseInt(resolvedParams.id),
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
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch job details',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [resolvedParams.id]);

  const handleSubmit = async (data: JobFormData) => {
    try {
      // TODO: Implement API call to update job
      console.log('Updating job:', data);
      
      notifications.show({
        title: 'Success',
        message: 'Job posting updated successfully',
        color: 'green',
      });
      
      router.push('/');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update job posting',
        color: 'red',
      });
    }
  };

  if (loading) {
    return (
      <Container size="md" py="xl" style={{ position: 'relative', minHeight: '400px' }}>
        <LoadingOverlay visible={true} />
      </Container>
    );
  }

  if (!job) {
    return (
      <Container size="md" py="xl">
        <Title>Job not found</Title>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Title mb="xl">Edit Job Posting</Title>
      <JobForm initialData={job} onSubmit={handleSubmit} />
    </Container>
  );
} 