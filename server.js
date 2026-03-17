const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - parse incoming JSON bodies
app.use(express.json());

// ─── Routes ───────────────────────────────────────────

// Health check - used by Docker and load balancers
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    app: 'HireOS',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to HireOS',
    version: '1.0.0',
    description: 'AI-powered hiring operating system',
    endpoints: {
      health:       'GET  /health',
      jobs:         'GET  /api/jobs',
      candidates:   'GET  /api/candidates',
      applications: 'GET  /api/applications'
    }
  });
});

// Jobs endpoint
app.get('/api/jobs', (req, res) => {
  res.status(200).json({
    jobs: [
      { id: 1, title: 'Senior Engineer',   department: 'Engineering', status: 'open' },
      { id: 2, title: 'Product Manager',   department: 'Product',     status: 'open' },
      { id: 3, title: 'UX Designer',       department: 'Design',      status: 'closed' }
    ]
  });
});

// Candidates endpoint
app.get('/api/candidates', (req, res) => {
  res.status(200).json({
    candidates: [
      { id: 1, name: 'Alice Johnson', role: 'Senior Engineer', stage: 'Interview' },
      { id: 2, name: 'Bob Chen',      role: 'Product Manager', stage: 'Applied'   },
      { id: 3, name: 'Sara Patel',    role: 'UX Designer',     stage: 'Offer'     }
    ]
  });
});

// Applications endpoint
app.get('/api/applications', (req, res) => {
  res.status(200).json({
    applications: [
      { id: 1, candidate_id: 1, job_id: 1, status: 'in_review' },
      { id: 2, candidate_id: 2, job_id: 2, status: 'pending'   },
      { id: 3, candidate_id: 3, job_id: 3, status: 'accepted'  }
    ]
  });
});

// 404 handler - catches any undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// ─── Start Server ──────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HireOS running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
