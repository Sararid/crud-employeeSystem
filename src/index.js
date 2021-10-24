const express = require("express");
const cors = require("cors");
//const path = require('path');
const Database = require("better-sqlite3");
const { query } = require("express");

// create and config server
const app = express();
app.use(cors());
app.use(express.json());

// init express aplication
const serverPort = process.env.PORT || 3001;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const staticServerPathWeb = "./web";
app.use(express.static(staticServerPathWeb));

// database
const db = new Database("./src/db/database.db", { verbose: console.log });

//get all employees from database FUNCIONA

app.get("/employees", (req, res) => {
  const query = db.prepare("SELECT * FROM employeeSystem order by name asc");
  const employees = query.all();
  console.log(employees);
  // 2 - ejecutar la query(all - get)
  if (!employees) {
    console.log("not found");
    res.sendStatus(404);
  } else {
    res.json(employees);
  }
});

//Api endpoint register EMPLOYEE
app.post("/create", (req, res) => {
  //this how we get info from the frontend, with body
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  if (
    name === "" ||
    age === "" ||
    country === "" ||
    position == "" ||
    wage === ""
  ) {
    res.json({
      error: true,
      message: "debe enviar todos los datos",
    });
  } else {
    //EMPLEADO existe
    const querySelectEmployee = db.prepare(
      "SELECT * FROM employeeSystem  WHERE name = ?"
    );
    const employeeFound = querySelectEmployee.get(name);

    //condicional
    if (employeeFound === undefined) {
      const query = db.prepare(
        "INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)"
      );
      const employeeInsert = query.run(name, age, country, position, wage);
      res.json({
        error: false,
        employeeId: employeeInsert.lastInsertRowid,
      });
    } else {
      res.json({
        error: true,
        message: "empleado ya existe",
      });
    }
  }
});

//update info of employees
app.patch("/update", (req, res) => {
  const id = req.body.id;
  console.log(id);
  const wage = req.body.wage;
  const query = db.prepare("UPDATE employeeSystem SET wage = ? WHERE id=?");
  const updateEmployee = query.run(wage, id);
  if (updateEmployee.changes !== 0) {
    res.json({
      error: false,
      updateEmployee,
    });
  } else {
    res.json({ error: true, msj: "Ha ocurrido un error" });
  }
});

//delete employee

app.delete("/employee/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  //verificar que el empleado existe
  const queryEmployeeExist = db.prepare(
    "SELECT * FROM employeeSystem where id=?"
  );
  const employeeFound = queryEmployeeExist.get(id);

  if (employeeFound === undefined) {
    res.json({
      error: true,
      message: "empleado no existe",
    });
  } else {
    const queryDeleteEmployee = db.prepare(
      "DELETE from employeeSystem where id = ?"
    );
    const resultDelete = queryDeleteEmployee.run(id);
    if (resultDelete.changes !== 0) {
      res.json({
        error: false,
        message: "eliminado",
      });
    } else {
      res.json({ error: true, message: "no fue posible eliminar el usuario " });
    }
  }
});

///cuando hage un input para buscar por nombre o filtrar mirar leccion select
//--Seleccionar todas las columnas de la usuaria cuyo id sea igual a 2; esto nos devolverá solo un registro
//-- Esto nos devolverá 0 o 1 registros en función de si en la tabla existe el id


// not found error 
// app.get('*', (req, res) => {
//   //relative to this directory
//   const notFoundFileRelativePath = "../web/4040-not-found.html"
//   const notFoundFileAbsolutePath = path.join(__dirname, notFoundFileRelativePath)
//   res.status(404).sendFile(notFoundFileAbsolutePath)
// })