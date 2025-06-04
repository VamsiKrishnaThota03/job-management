# Job Management Admin Interface

A full-stack application for managing job postings, built with Next.js, Mantine, and NestJS.

## Features

- Job listing with advanced filters
- Create, edit, and delete job postings
- Responsive design with Mantine UI components
- Form validation with React Hook Form
- PostgreSQL database with TypeORM

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Mantine UI
- React Hook Form

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Class Validator

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VamsiKrishnaThota03/job-management.git
cd job-management
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up the database:
- Create a PostgreSQL database named 'jobboard'
- Configure the `.env` file in the backend directory

5. Start the applications:

Backend:
```bash
cd backend
npm run start:dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
