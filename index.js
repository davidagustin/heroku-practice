const express = require('express');
const path = require('path');

const port = process.env.PORT || 5006;

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes can be added here
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sudoku API is running!' });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`Sudoku app listening on port ${port}`);
  console.log(`Visit http://localhost:${port} to play!`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: gracefully shutting down');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
    });
  }
});
