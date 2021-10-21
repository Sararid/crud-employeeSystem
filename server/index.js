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


// // first endpoint to create , add possibility to enter unique data  
// app.post('/create', (req, res) => {
//   //this how we get info from the frontend, with body 
//   console.log(req.body)
//   const name = req.body.name
//   const age = req.body.age
//   const country = req.body.country
//   const position = req.body.position
//   const wage = req.body.wage
//   const query = db.prepare('INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)')
//   const result = query.run(name, age, country, position, wage);

//   if (!result) {
//     console.log('not found')
//     res.sendStatus(404)
//   } else {
//     res.json('user created')
//   }


// });

//INSERT EMPLOYEE IN DATABASE 

//   const query = db.prepare('INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)')
//   const result = query.run(name, age, country, position, wage);

//   if (!result) {
//     console.log('not found')
//     res.sendStatus(404)
//   } else {
//     res.json('user created')
//   }


// });


//Api endpoint register EMPLOYEE  
app.post('/create', (req, res) => {
  //this how we get info from the frontend, with body
  console.log(req.body)
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const wage = req.body.wage

  if (name === undefined || age === undefined || country === undefined || position == undefined || wage === undefined) {
    res.json({
      error: true,
      message: "debe enviar todos los datos"
    });
  } else {

    //EMPLEADO existe 
    const querySelectEmployee = db.prepare("SELECT * FROM employeeSystem  WHERE name = ?");
    const employeeFound = querySelectEmployee.get(name);

    //condicional 
    if (employeeFound === undefined) {
      const query = db.prepare("INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)");
      const employeeInsert = query.run(name, age, country, position, wage);
      res.json({
        error: false,
        userId: employeeInsert.lastInsertRowid
      });
    } else {
      res.json({
        error: true,
        message: "usuario ya existe"
      });
    }
  }
});


//get all employees from database FUNCIONA

app.get('/employees', (req, res) => {
  const query = db.prepare('SELECT * FROM employeeSystem order by name asc')
  const employees = query.all();
  console.log(employees)
  // 2 - ejecutar la query(all - get)
  if (!employees) {
    console.log('not found')
    res.sendStatus(404)
  } else {
    res.json(employees)
  }

});

///cuando hage un input para buscar por nombre o filtrar mirar leccion select
//--Seleccionar todas las columnas de la usuaria cuyo id sea igual a 2; esto nos devolverá solo un registro
//-- Esto nos devolverá 0 o 1 registros en función de si en la tabla existe el id