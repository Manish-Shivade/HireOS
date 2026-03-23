# HireOS

**HireOS** - AI-powered hiring operating system

An intelligent platform designed to streamline and optimize the hiring process with AI capabilities.

## Features

- Health check endpoint for monitoring
- Job management API
- Candidate management
- Application tracking
- Docker support for containerized deployment

## Prerequisites

- Node.js 14+ 
- Docker & Docker Compose (for containerized deployment)
- npm

## Installation

### Local Setup

1. Clone the repository:
```bash
git clone git@github.com:Manish-Shivade/HireOS.git
cd HireOS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev    # with auto-reload
# or
npm start      # standard start
```

The server will be available at `http://localhost:3000`

### Docker Setup

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

2. The application will be available through Nginx on the configured port

## Configuration

- **Port**: Configured via `PORT` environment variable (default: 3000)
- **Nginx**: See `nginx/nginx.conf` for reverse proxy configuration

## API Endpoints

- `GET /` - Welcome message and API information
- `GET /health` - Health check (used by Docker and load balancers)
- `GET /api/jobs` - Get all jobs
- `GET /api/candidates` - Get all candidates
- `GET /api/applications` - Get all applications

## Project Structure

```
├── server.js              # Main Express server
├── package.json           # Node.js dependencies
├── Dockerfile             # Docker image configuration
├── docker-compose.yml     # Docker Compose setup
├── nginx/
│   └── nginx.conf        # Nginx reverse proxy configuration
├── setup.sh              # Setup script
├── deploy.sh             # Deployment script
└── README.md             # This file
```

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload

## Deployment

Use the provided deployment scripts:

```bash
./setup.sh    # Initial setup
./deploy.sh   # Deploy application
```

Or deploy using Docker Compose:

```bash
docker-compose up -d
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Containerization**: Docker
- **Reverse Proxy**: Nginx

## License

All rights reserved

## Contact

Repository: [HireOS on GitHub](https://github.com/Manish-Shivade/HireOS)
