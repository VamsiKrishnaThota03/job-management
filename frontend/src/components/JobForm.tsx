'use client';

import { useForm } from 'react-hook-form';
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Paper,
  Stack,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Job, JobFormData, JobType } from '@/types/job';

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: JobFormData) => void;
}

export function JobForm({ initialData, onSubmit }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobFormData>({
    defaultValues: initialData || {
      title: '',
      companyName: '',
      location: '',
      jobType: 'Full-time',
      salaryRange: '',
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: new Date(),
    },
  });

  const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  return (
    <Paper shadow="xs" p="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="md">
          <TextInput
            label="Job Title"
            placeholder="Enter job title"
            required
            {...register('title', { required: 'Job title is required' })}
            error={errors.title?.message}
          />

          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            required
            {...register('companyName', { required: 'Company name is required' })}
            error={errors.companyName?.message}
          />

          <TextInput
            label="Location"
            placeholder="Enter job location"
            required
            {...register('location', { required: 'Location is required' })}
            error={errors.location?.message}
          />

          <Select
            label="Job Type"
            placeholder="Select job type"
            required
            data={jobTypes.map((type) => ({ value: type, label: type }))}
            value={watch('jobType')}
            onChange={(value) => setValue('jobType', value as JobType)}
            error={errors.jobType?.message}
          />

          <TextInput
            label="Salary Range"
            placeholder="e.g., $50,000 - $80,000"
            required
            {...register('salaryRange', { required: 'Salary range is required' })}
            error={errors.salaryRange?.message}
          />

          <Textarea
            label="Job Description"
            placeholder="Enter detailed job description"
            required
            minRows={4}
            {...register('description', { required: 'Job description is required' })}
            error={errors.description?.message}
          />

          <Textarea
            label="Requirements"
            placeholder="Enter job requirements"
            required
            minRows={4}
            {...register('requirements', { required: 'Requirements are required' })}
            error={errors.requirements?.message}
          />

          <Textarea
            label="Responsibilities"
            placeholder="Enter job responsibilities"
            required
            minRows={4}
            {...register('responsibilities', { required: 'Responsibilities are required' })}
            error={errors.responsibilities?.message}
          />

          <DateInput
            label="Application Deadline"
            placeholder="Select deadline"
            required
            value={watch('applicationDeadline')}
            onChange={(date) => setValue('applicationDeadline', date as Date)}
            error={errors.applicationDeadline?.message}
          />

          <Button type="submit" size="lg">
            {initialData ? 'Update Job' : 'Create Job'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
} 