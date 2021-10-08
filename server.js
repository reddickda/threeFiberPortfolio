const express = require("express");
const cors = require('cors');

const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const { Client } = require('pg');
app.use(cors({
    // origin: ['https://simmer.io', 'https://david-portfolio-site.herokuapp.com/', 'https://www.davidthehobbyist.com/', 'http://www.davidthehobbyist.com/', 'https://david-portfolio-site.herokuapp.com/scores']
    origin: '*'
  }));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// });

const insertText = 'INSERT INTO Leaderboard(Name, Score) VALUES($1,$2)';
const updateText = 'UPDATE Leaderboard SET Score = $2 WHERE Name = $1';

// This route serves the React app
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

app.get("/scores", (req, response) => {

  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://lqxgwvjxwjtwqh:4a0f9daf896f0f5aeb49e711183c96e50dabb063aa653afe4611885788beeb08@ec2-52-7-228-45.compute-1.amazonaws.com:5432/daj2sfubcko33d",
    ssl: {
      rejectUnauthorized: false
    }});
  client.connect();
  client.query('SELECT * FROM Leaderboard ORDER BY Score DESC', (err, results) => {
    //if (err) throw err;
  let rows = [];
    
    if(err){
      return "Error Retrieving rows";
    }
    if(results !== undefined){
      for (let row of results.rows) {
        rows.push(row);
      }
      response.json({ message: rows });
    }
    console.log(rows);
    client.end();
  });
});

app.post("/submitScore", (req, response) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://lqxgwvjxwjtwqh:4a0f9daf896f0f5aeb49e711183c96e50dabb063aa653afe4611885788beeb08@ec2-52-7-228-45.compute-1.amazonaws.com:5432/daj2sfubcko33d",
    ssl: {
      rejectUnauthorized: false
    }});
    const values = [req.body.name,req.body.score];
  client.connect();
  client.query(insertText, values, (err, results) => {
    console.log(results);
    client.end();
  });

  response.end();
});

app.put("/updateScore", (req, response) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://lqxgwvjxwjtwqh:4a0f9daf896f0f5aeb49e711183c96e50dabb063aa653afe4611885788beeb08@ec2-52-7-228-45.compute-1.amazonaws.com:5432/daj2sfubcko33d",
    ssl: {
      rejectUnauthorized: false
    }});
    const values = [req.body.name,req.body.score];

  client.connect();
  client.query(updateText, values, (err, results) => {
    console.log(results);
    client.end();
  });
  response.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});