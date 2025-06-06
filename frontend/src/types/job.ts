export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type WorkMode = 'Onsite' | 'Remote' | 'Hybrid';

export interface Job {
  id: number;
  companyName: string;
  companyLogo: string;
  title: string;
  experience: string;
  workMode: WorkMode;
  salary: string;
  salaryRange: string;
  description: string;
  postedTime: string;
  location: string;
  jobType: JobType;
  applicationDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobFormData {
  title: string;
  companyName: string;
  companyLogo?: string;
  experience?: string;
  workMode?: WorkMode;
  salary?: string;
  salaryRange: string;
  description: string;
  location: string;
  jobType: JobType;
  applicationDeadline: Date;
} 