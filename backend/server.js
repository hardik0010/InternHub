// Basic Express server with MongoDB Atlas connection
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/User');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI ? '***CONFIGURED***' : '***NOT CONFIGURED***');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join student room for notifications
  socket.on('join-student', (studentId) => {
    socket.join(`student-${studentId}`);
    console.log(`Student ${studentId} joined their room`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

app.get('/', (req, res) => {
  res.send('InternHub backend is running!');
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    // Generate JWT
    const token = jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/student', studentRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 