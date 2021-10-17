const express = require("express");
const cors = require("cors");
const Database = require('better-sqlite3');
const { query } = require('express');
// create and config server
const app = express();
app.use(cors());
app.use(express.json());

// init express aplication
const serverPort = 3001;
app.listen(serverPort, () => { console.log(`Server listening at http://localhost:${serverPort}`); });

// database
const db = new Database('./db/databse.db', { verbose: console.log });

app.post('/create', (req, res) => {
  //this how we get info from the frontend, with body 
  console.log(req)
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const wage = req.body.wage

  const query = db.prepare('INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)');
  const result = query.run(name, age, country, position, wage);
  console.log(result)
  res.json(result)

  // if (err) {
  //   console.log('not found')
  //   res.status(400).send('not found')
  // } else {
  //   res.json(result)
  // }

});
