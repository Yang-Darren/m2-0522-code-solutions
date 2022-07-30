const pg = require('pg');
const express = require('express');
const app = express();
app.use(express.json());

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/grades', (req, res, next) => {
  const sql = `select *
              from "grades"`;
  db.query(sql).then(result => {
    const grades = result.rows;
    res.status(200).json(grades);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ Error: 'An unexpected error occurred' });
  });
});

app.post('/api/grades', (req, res, next) => {
  const body = req.body;
  const sql = `insert into "grades" ("name", "course", "score")
               values ($1, $2, $3)
               returning *`;
  const score = Number(body.score);
  const values = [body.name, body.course, body.score];
  if (!body.name || !body.course || !body.score) {
    return res.status(400).json({ Error: 'Missing name, course, or score' });
  } else if (!Number.isInteger(score) || score > 100 || score < 0) {
    return res.status(400).json({ Error: 'Score must be a positive integer from 0-100' });
  }
  db.query(sql, values).then(result => {
    const newRow = result.rows;
    res.status(201).json(newRow);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ Error: 'An unexpected error occurred' });
  });
});

app.listen(3000, () => {
});
