'use client';

import { useState } from 'react';
import {
  TextInput,
  Select,
  Textarea,
  Button,
  Paper,
  Group,
  Stack,
  Modal,
  Box,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { JobFormData } from '@/types/job';
import { jobsApi } from '@/services/api';

interface CreateJobModalProps {
  onSuccess?: () => void;
}

function CreateJobModal({ onSuccess }: CreateJobModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: '',
    workMode: '',
    experience: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    applicationDeadline: null as Date | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData: JobFormData = {
        title: formData.title,
        companyName: formData.companyName,
        location: formData.location,
        jobType: formData.jobType as any,
        workMode: formData.workMode as any,
        experience: formData.experience,
        salary: formData.salary,
        salaryRange: `₹${formData.salaryMin} - ₹${formData.salaryMax}`,
        description: formData.description,
        applicationDeadline: formData.applicationDeadline || new Date(),
      };

      console.log('Sending job data:', jobData);
      const response = await jobsApi.createJob(jobData);
      console.log('Response:', response);
      
      notifications.show({
        title: 'Success',
        message: 'Job posting created successfully',
        color: 'green',
      });
      
      onSuccess?.();
      router.push('/');
    } catch (error) {
      console.error('Error creating job:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create job posting',
        color: 'red',
      });
    }
  };

  return (
    <Modal
      opened={true}
      onClose={() => router.push('/')}
      size="xl"
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        body: {
          padding: 0,
        },
        content: {
          borderRadius: '16px',
        }
      }}
    >
      <Paper p={40}>
        <Box mb={48} style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 600,
            color: '#111827',
            margin: 0
          }}>
            Create Job Opening
          </h1>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack gap={24}>
            <Group grow>
              <TextInput
                label="Job Title"
                placeholder="Full Stack Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />

              <TextInput
                label="Company Name"
                placeholder="Amazon, Microsoft, Swiggy"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />
            </Group>

            <Group grow>
              <Select
                label="Location"
                placeholder="Choose Preferred Location"
                data={[
                  'Bangalore',
                  'Mumbai',
                  'Delhi',
                  'Hyderabad',
                  'Chennai'
                ]}
                value={formData.location}
                onChange={(value) => setFormData({ ...formData, location: value || '' })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />

              <Select
                label="Job Type"
                placeholder="FullTime"
                data={[
                  'Full-time',
                  'Part-time',
                  'Contract',
                  'Internship'
                ]}
                value={formData.jobType}
                onChange={(value) => setFormData({ ...formData, jobType: value || '' })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />
            </Group>

            <Group grow>
              <Select
                label="Work Mode"
                placeholder="Select Work Mode"
                data={[
                  'Onsite',
                  'Remote',
                  'Hybrid'
                ]}
                value={formData.workMode}
                onChange={(value) => setFormData({ ...formData, workMode: value || '' })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />

              <TextInput
                label="Experience Required"
                placeholder="e.g., 1-3 years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />
            </Group>

            <Group grow>
              <Stack gap={0}>
                <h6 style={{ 
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#4B5563',
                  marginTop: 0,
                  marginBottom: '8px'
                }}>
                  Salary Range
                </h6>
                <Group grow>
                  <TextInput
                    placeholder="₹0"
                    value={formData.salaryMin}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        salaryMin: e.target.value,
                        salary: `${e.target.value} LPA`
                      });
                    }}
                    required
                    styles={{
                      input: {
                        height: '44px',
                        '&::placeholder': {
                          color: '#9CA3AF'
                        }
                      }
                    }}
                  />
                  <TextInput
                    placeholder="₹12,00,000"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    required
                    styles={{
                      input: {
                        height: '44px',
                        '&::placeholder': {
                          color: '#9CA3AF'
                        }
                      }
                    }}
                  />
                </Group>
              </Stack>

              <DateInput
                label="Application Deadline"
                placeholder="Select date"
                value={formData.applicationDeadline}
                onChange={(date) => setFormData({ ...formData, applicationDeadline: date ? new Date(date) : null })}
                required
                styles={{
                  label: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#4B5563',
                    marginBottom: '8px'
                  },
                  input: {
                    height: '44px',
                    '&::placeholder': {
                      color: '#9CA3AF'
                    }
                  }
                }}
              />
            </Group>

            <Textarea
              label="Job Description"
              placeholder="Please share a description to let the candidate know more about the job role"
              minRows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              styles={{
                label: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#4B5563',
                  marginBottom: '8px'
                },
                input: {
                  '&::placeholder': {
                    color: '#9CA3AF'
                  }
                }
              }}
            />

            <Group justify="space-between" mt={16}>
              <Button
                variant="default"
                size="md"
                style={{
                  height: '44px',
                  borderColor: '#D1D5DB',
                  color: '#374151'
                }}
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                size="md"
                style={{
                  height: '44px',
                  backgroundColor: '#0EA5E9',
                  color: 'white'
                }}
              >
                Publish
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
}

export default CreateJobModal; 