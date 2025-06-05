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

export default function CreateJobModal() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    applicationDeadline: null as Date | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call
      console.log('Form data:', formData);
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
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
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