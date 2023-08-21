const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user : "blpwbioq",
    password : "C_HN38OY4xFHR9gGv29ChX6j5ouySzsp",
    host : "trumpet.db.elephantsql.com",
    port : 5432 ,
    database : "blpwbioq"
});

function getRandomNumber(min, max) {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();
  
    // Calculate the scaled random number within the desired range
    const randomNumber = min + randomDecimal * (max - min);
  
    // Return the calculated random number
    return randomNumber;
  }

app.use(express.json());

// Function to generate a random string of given length
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Route to add random data to the database 100 times
app.get('/add-random-data/:course', async (req, res) => {
    const {course}= req.params;
  try {
    for (let i = 0; i < 10; i++) {
      const name = generateRandomString(8); // Generate random name
      const email = `${name}@example.com`; // Generate email based on name
      await pool.query(
        'INSERT INTO class_timetable (course, section, class_time, class_days) VALUES ($1, $2, $3, $4)',
        [course, i, parseInt(getRandomNumber(1, 6)), parseInt(getRandomNumber(1, 3))]
      );
    }
    res.status(201).json({ message: 'Random data added successfully' });
    console.log(course)
  } catch (error) {
    console.error('Error adding random data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
