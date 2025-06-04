import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time',
  })
  jobType: JobType;

  @Column()
  salaryRange: string;

  @Column('text')
  description: string;

  @Column('text')
  requirements: string;

  @Column('text')
  responsibilities: string;

  @Column({ type: 'timestamp' })
  applicationDeadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 