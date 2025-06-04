'use client';

import { useState } from 'react';
import {
  TextInput,
  Select,
  RangeSlider,
  Paper,
  Table,
  Button,
  Group,
  Text,
  Badge,
} from '@mantine/core';
import { Job, JobType } from '@/types/job';

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

export function JobList({ jobs, onEdit, onDelete }: JobListProps) {
  const [titleFilter, setTitleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<JobType | ''>('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000]);

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.jobType === typeFilter;
    const [min, max] = job.salaryRange.split('-').map(s => parseInt(s.replace(/\D/g, '')));
    const matchesSalary = min >= salaryRange[0] && max <= salaryRange[1];

    return matchesTitle && matchesLocation && matchesType && matchesSalary;
  });

  return (
    <div>
      <Paper shadow="xs" p="md" mb="md">
        <Group>
          <TextInput
            label="Job Title"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <TextInput
            label="Location"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <Select
            label="Job Type"
            placeholder="Filter by type"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value as JobType)}
            data={[
              { value: '', label: 'All' },
              { value: 'Full-time', label: 'Full-time' },
              { value: 'Part-time', label: 'Part-time' },
              { value: 'Contract', label: 'Contract' },
              { value: 'Internship', label: 'Internship' },
            ]}
          />
        </Group>
        <Text size="sm" mt="md" mb="xs">Salary Range</Text>
        <RangeSlider
          min={0}
          max={200000}
          step={10000}
          value={salaryRange}
          onChange={setSalaryRange}
          marks={[
            { value: 0, label: '$0' },
            { value: 100000, label: '$100k' },
            { value: 200000, label: '$200k' },
          ]}
        />
      </Paper>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Company</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Salary Range</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredJobs.map((job) => (
            <Table.Tr key={job.id}>
              <Table.Td>{job.title}</Table.Td>
              <Table.Td>{job.companyName}</Table.Td>
              <Table.Td>{job.location}</Table.Td>
              <Table.Td>
                <Badge>{job.jobType}</Badge>
              </Table.Td>
              <Table.Td>{job.salaryRange}</Table.Td>
              <Table.Td>
                <Group>
                  <Button size="xs" onClick={() => onEdit(job)}>
                    Edit
                  </Button>
                  <Button size="xs" color="red" onClick={() => onDelete(job.id)}>
                    Delete
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
} 