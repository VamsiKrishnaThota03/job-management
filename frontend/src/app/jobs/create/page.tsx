'use client';

import { Container, Title } from '@mantine/core';
import { JobForm } from '@/components/JobForm';
import { JobFormData } from '@/types/job';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

export default function CreateJob() {
  const router = useRouter();

  const handleSubmit = async (data: JobFormData) => {
    try {
      // TODO: Implement API call to create job
      console.log('Creating job:', data);
      
      notifications.show({
        title: 'Success',
        message: 'Job posting created successfully',
        color: 'green',
      });
      
      router.push('/');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create job posting',
        color: 'red',
      });
    }
  };

  return (
    <Container size="md" py="xl">
      <Title mb="xl">Create New Job Posting</Title>
      <JobForm onSubmit={handleSubmit} />
    </Container>
  );
} 