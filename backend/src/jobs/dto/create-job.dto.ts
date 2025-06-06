import { IsString, IsEnum, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { JobType, WorkMode } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType: JobType;

  @IsEnum(['Onsite', 'Remote', 'Hybrid'])
  workMode: WorkMode;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsString()
  @IsNotEmpty()
  salaryRange: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  applicationDeadline: Date;
} 