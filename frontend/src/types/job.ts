export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface Job {
  id: number;
  title: string;
  companyName: string;
  location: string;
  jobType: JobType;
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobFormData extends Omit<Job, 'id' | 'createdAt' | 'updatedAt'> {} 