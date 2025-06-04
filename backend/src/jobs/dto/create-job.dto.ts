import { IsString, IsEnum, IsNotEmpty, IsDateString } from 'class-validator';
import { JobType } from '../entities/job.entity';

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

  @IsString()
  @IsNotEmpty()
  salaryRange: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsDateString()
  applicationDeadline: Date;
} 