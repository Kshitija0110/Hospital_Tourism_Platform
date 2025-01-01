const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// AWS RDS MySQL connection
const pool = mysql.createPool({
  host:'hospitaldb.clu22e6ewt5r.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Kshitu123',
  database: 'HOSPITAL',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }
    console.log('Connected to database successfully');
    connection.release();
  });
  
  app.use(cors({
    origin: 'http://localhost:3002', // Your React app port
    credentials: true
  }));
// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM doctors');
    res.json(rows);
    //console.log(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching doctors' });
  }
});

// Book appointment
app.post('/api/appointments', async (req, res) => {
  const { doctor_id, patient_name, appointment_date, appointment_time, status } = req.body;
  
  try {
    const [result] = await pool.promise().query(
      `INSERT INTO appointments (doctor_id, patient_name, patient_email,appointment_date, appointment_time, status,created_at) VALUES ( ?, ?, ?, ?,?,'scheduled', 'pending')`,
      [doctor_id, 'abc','kshitu', appointment_date, appointment_time]
    );
    res.json({ id: result.insertId, message: 'Appointment booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error booking appointment' });
  }
});

// Add this new endpoint to handle appointment cancellation
app.delete('/api/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;
  
  try {
    const [result] = await pool.promise().query(
      'DELETE FROM appointments WHERE appointment_id = ?',
      [appointmentId]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Appointment cancelled successfully' });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Error cancelling appointment' });
  }
});

// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const [rows] = await pool.promise().query(`
      SELECT 
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.payment_status,
        a.patient_name,
        d.Name1 as doctor_name,
        d.speciality
      FROM appointments a 
      JOIN doctors d ON a.doctor_id = d.id 
      ORDER BY a.appointment_date DESC, a.appointment_time DESC 

    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Get doctor by ID
app.get('/api/doctors/:id', async (req, res) => {
  try {
    const [rows] = await pool.promise().query(
      'SELECT * FROM doctors WHERE id = ?',
      [req.params.id]
    );
    console.log('Fetched doctor:', rows[0]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching doctor details' });
  }
});

// const fetchHospitals = async () => {
  // try {
    // const response = await axios.get('http://www.communitybenefitinsight.org/api/get_hospitals.php?state=AL', { // Replace with the actual API endpoint
      // method : 'POST',
      // 
      // headers: {
        // 'Content-Type': 'application/json',
      // },
    // });
     //console.log('Hospital Details:', response.data); // Print the response data to the console
  // } catch (error) {
    // console.error('Error fetching hospital details:', error.message);
  // }
// };
// 
// fetchHospitals();

// Remove the standalone fetchHospitals function and add this endpoint
app.get('/api/hospitals/:state', async (req, res) => {
  try {
    const stateCode = req.params.state;
    const response = await axios.get(
      `http://www.communitybenefitinsight.org/api/get_hospitals.php?state=${stateCode}`
    );
    res.json(response.data.slice(0, 9)); // Send only first 3 hospitals
  } catch (error) {
    console.error('Error fetching hospital details:', error);
    res.status(500).json({ error: 'Error fetching hospital details' });
  }
});


// Sign Up Route
app.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await pool.promise().query(
      'SELECT * FROM login WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Insert new user
    const [result] = await pool.promise().query(
      'INSERT INTO login (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Database error during signup' });
  }
});

// Login Route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [users] = await pool.promise().query(
      'SELECT * FROM login WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length > 0) {
      
      res.json({ 
        message: 'Login successful',
       
        user: {
          id: users[0].id,
          name: users[0].name,
          email: users[0].email
        }
      });
      
    } else {
      res.status(401).json({ message: 'Invalid credentials. Please sign up first' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Database error during login' });
  }
});

// Google Sign In Route
// app.post('/auth/google', async (req, res) => {
  // const { name, email } = req.body;
// 
  // if (!name || !email) {
    // return res.status(400).json({ message: 'Name and email are required' });
  // }
// 
  // try {
    //Check if user exists
    // const [existingUsers] = await pool.promise().query(
      // 'SELECT * FROM login WHERE email = ?',
      // [email]
    // );
// 
    // if (existingUsers.length === 0) {
     // Create new user for Google sign in
      // await pool.promise().query(
        // 'INSERT INTO login (name, email) VALUES (?, ?)',
        // [name, email]
      // );
    // }
// 
    // res.json({ 
      // message: 'Google sign in successful',
      // user: {
        // name,
        // email
      // }
    // });
  // } catch (error) {
    // console.error('Error during Google sign in:', error);
    // res.status(500).json({ message: 'Database error during Google sign in' });
  // }
// });
// 


app.post('/auth/google', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Check if user exists
    const [existingUsers] = await pool.promise().query(
      'SELECT * FROM login WHERE email = ?',
      [email]
    );

    if (existingUsers.length === 0) {
      // Create new user for Google sign in
      await pool.promise().query(
        'INSERT INTO login (name, email, auth_provider) VALUES (?, ?, "google")',
        [name, email]
      );
    }

    // Return user data
    res.json({ 
      message: 'Google sign in successful',
      user: {
        name,
        email
      }
    });
  } catch (error) {
    console.error('Error during Google sign in:', error);
    res.status(500).json({ message: 'Database error during Google sign in' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});