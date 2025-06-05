'use client';

import { Paper, Text, Button, Badge, Group, Stack, Image } from '@mantine/core';
import { IconBriefcase, IconMapPin, IconCurrencyRupee } from '@tabler/icons-react';
import { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
  onApply: (jobId: number) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  return (
    <Paper 
      shadow="sm" 
      radius={12} 
      p="md" 
      withBorder
      style={{
        width: '298px',
        height: '320px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Stack gap="xs" style={{ flex: 1 }}>
        {/* Top Row with Logo and Time Badge */}
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          {/* Company Logo */}
          <div style={{ 
            width: '83.46px', 
            height: '82px',
            borderRadius: '13.18px',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}>
            <Image
              src={job.companyLogo}
              alt={job.companyName}
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              fallbackSrc={`https://ui-avatars.com/api/?name=${job.companyName}&background=random&size=82`}
            />
          </div>

          {/* Posted Time Badge */}
          <Badge style={{ backgroundColor: '#B0D9FF' }} variant="light" size="sm">
            {job.postedTime}
          </Badge>
        </Group>

        {/* Job Title */}
        <Text size="sm" fw={600} c="#111827">
          {job.title}
        </Text>

        {/* Job Details */}
        <Group gap="sm">
          <Group gap="xs">
            <IconBriefcase size={14} color="#4B5563" />
            <Text size="xs" c="#4B5563">{job.experience}</Text>
          </Group>
          <Group gap="xs">
            <IconMapPin size={14} color="#4B5563" />
            <Text size="xs" c="#4B5563">{job.workMode}</Text>
          </Group>
          <Group gap="xs">
            <IconCurrencyRupee size={14} color="#4B5563" />
            <Text size="xs" c="#4B5563">{job.salary}</Text>
          </Group>
        </Group>

        {/* Description Points */}
        <Stack gap={8} style={{ flex: 1 }}>
          <Group gap="xs" align="flex-start">
            <Text size="xs" c="#4B5563">•</Text>
            <Text size="xs" c="#4B5563" style={{ flex: 1 }}>
              A user-friendly interface lets you browse stunning photos and videos.
            </Text>
          </Group>
          <Group gap="xs" align="flex-start">
            <Text size="xs" c="#4B5563">•</Text>
            <Text size="xs" c="#4B5563" style={{ flex: 1 }}>
              Filter destinations based on interests and travel style, and create personalized.
            </Text>
          </Group>
        </Stack>

        {/* Apply Button */}
        <Button
          fullWidth
          color="blue"
          onClick={() => onApply(job.id)}
          radius="md"
          size="xs"
        >
          Apply Now
        </Button>
      </Stack>
    </Paper>
  );
} 