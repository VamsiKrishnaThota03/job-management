import { Job, JobFormData } from '@/types/job';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const jobsApi = {
  // Get all jobs
  getAllJobs: async (): Promise<Job[]> => {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch jobs: ${error}`);
    }
    return response.json();
  },

  // Create a new job
  createJob: async (jobData: JobFormData): Promise<Job> => {
    console.log('Creating job with data:', jobData);
    console.log('Using API URL:', API_URL);
    
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      const responseText = await response.text();
      console.log('Raw server response:', responseText);
      
      if (!response.ok) {
        console.error('Server error status:', response.status);
        console.error('Server error statusText:', response.statusText);
        throw new Error(`Failed to create job: ${responseText}`);
      }
      
      // Only try to parse as JSON if we have a response
      return responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      console.error('Network or parsing error:', error);
      throw error;
    }
  },

  // Update an existing job
  updateJob: async (id: number, jobData: JobFormData): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update job: ${error}`);
    }
    return response.json();
  },

  // Delete a job
  deleteJob: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete job: ${error}`);
    }
  },

  // Get a single job by ID
  getJobById: async (id: number): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch job: ${error}`);
    }
    return response.json();
  },
}; 