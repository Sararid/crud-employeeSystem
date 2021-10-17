const express = require("express");
const cors = require("cors");
const Database = require('better-sqlite3');
const { query } = require('express');
// create and config server
const app = express();
app.use(cors());
app.use(express.json());

// init express aplication
const serverPort = 3000;
app.listen(serverPort, () => { console.log(`Server listening at http://localhost:${serverPort}`); });

// database
const db = new Database('./db/databse.db', { verbose: console.log });

app.post('/create', (req, res) => {
  //this how we get info from the frontend, with body 
  const name = req.body.name
  const name = req.body.name


});