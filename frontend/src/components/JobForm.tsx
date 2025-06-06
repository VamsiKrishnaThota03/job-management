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
import { Job, JobFormData, JobType, WorkMode } from '@/types/job';

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
    defaultValues: {
      title: initialData?.title || '',
      companyName: initialData?.companyName || '',
      companyLogo: initialData?.companyLogo,
      experience: initialData?.experience,
      workMode: initialData?.workMode,
      salary: initialData?.salary,
      salaryRange: initialData?.salaryRange || '',
      description: initialData?.description || '',
      location: initialData?.location || '',
      jobType: initialData?.jobType || 'Full-time',
      applicationDeadline: initialData?.applicationDeadline || new Date(),
    },
  });

  const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const workModes: WorkMode[] = ['Onsite', 'Remote', 'Hybrid'];

  return (
    <Paper shadow="xs" p="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
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

          <Select
            label="Work Mode"
            placeholder="Select work mode"
            data={workModes.map((mode) => ({ value: mode, label: mode }))}
            value={watch('workMode')}
            onChange={(value) => setValue('workMode', value as WorkMode)}
            error={errors.workMode?.message}
          />

          <TextInput
            label="Experience"
            placeholder="e.g., 2-3 years"
            {...register('experience')}
            error={errors.experience?.message}
          />

          <TextInput
            label="Salary"
            placeholder="e.g., 12 LPA"
            {...register('salary')}
            error={errors.salary?.message}
          />

          <TextInput
            label="Salary Range"
            placeholder="e.g., ₹50,000 - ₹70,000"
            required
            {...register('salaryRange', { required: 'Salary range is required' })}
            error={errors.salaryRange?.message}
          />

          <Textarea
            label="Job Description"
            placeholder="Enter detailed job description"
            required
            minRows={8}
            {...register('description', { required: 'Job description is required' })}
            error={errors.description?.message}
          />

          <DateInput
            label="Application Deadline"
            placeholder="Select deadline"
            required
            value={watch('applicationDeadline')}
            onChange={(date) => setValue('applicationDeadline', date ? new Date(date) : new Date())}
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