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
const db = new Database('db/database.db', { verbose: console.log });

app.post('/create', (req, res) => {
  //this how we get info from the frontend, with body 
  console.log(req.body)
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const wage = req.body.wage
  const query = db.prepare('INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)')
  const result = query.run(name, age, country, position, wage);

  if (!result) {
    console.log('not found')
    res.sendStatus(404)
  } else {
    res.json('user created')
  }

});


app.get('/employees', (req, res) => {
  const query = db.prepare('SELECT * FROM employeeSystem order by name asc')
  const employees = query.all();
  console.log(employees)
  //2-ejecutar la query  (all- get)
  if (!employees) {
    console.log('not found')
    res.sendStatus(404)
  } else {
    res.json(employees)
  }


});