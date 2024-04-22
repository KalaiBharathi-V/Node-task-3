const express = require('express');
const mongoose = require('mongoose');
const Mentor = require('./models/mentor');
const Student = require('./models/student');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mentor_student_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/mentors', async (req, res) => {
    try {
      const mentor = await Mentor.create(req.body);
      res.status(201).json(mentor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.post('/students', async (req, res) => {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.put('/assign/:mentorId/:studentId', async (req, res) => {
    try {
      const { mentorId, studentId } = req.params;
      res.status(200).json({ message: 'Student assigned to mentor successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.put('/assign-mentor/:studentId/:newMentorId', async (req, res) => {
    try {
      const { studentId, newMentorId } = req.params;
      res.status(200).json({ message: 'Mentor assigned to student successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.get('/mentor-students/:mentorId', async (req, res) => {
    try {
      const { mentorId } = req.params;
      res.status(200).json({ students: [] });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.get('/student-mentor/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
      res.status(200).json({ mentor: {} });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });