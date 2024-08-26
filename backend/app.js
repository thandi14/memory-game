const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Built-in middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Built-in middleware to parse URL-encoded bodies

// Optional: CORS handling if needed
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
  }));

// Import and use routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
