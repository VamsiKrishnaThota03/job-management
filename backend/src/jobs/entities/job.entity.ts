import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type WorkMode = 'Onsite' | 'Remote' | 'Hybrid';

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

  @Column({
    type: 'enum',
    enum: ['Onsite', 'Remote', 'Hybrid'],
    default: 'Onsite',
  })
  workMode: WorkMode;

  @Column({ nullable: true })
  experience: string;

  @Column({ nullable: true })
  salary: string;

  @Column()
  salaryRange: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  applicationDeadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 