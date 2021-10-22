// Fichero src/components/App.js

import "../styles/App.scss";
import { useEffect, useState } from "react";
//import ls from '../services/localStorage';
import { Link, NavLink, Switch, useRouteMatch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Form from "./Form";
function App() {
  //constantes
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);
  //array donde guardo los employee list
  const [employeeList, setEmployeeList] = useState([]);

  // create new employee en database with endpoint CREATE
  const addEmployee = (ev) => {
    ev.preventDefault();
    const bodyParams = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    };
    //console.log(bodyParams);

    return fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    })
      .then((response) => response.json())
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });
  };

  //get all employees in database clicking button
  const getEmployees = (ev) => {
    ev.preventDefault();
    return (
      fetch("http://localhost:3001/employees")
        //the response is whatever we have in the backend we send it to the frontend
        .then((response) => response.json())
        //el data es el array de objetos en la base datos
        .then((data) => {
          console.log(data);
          setEmployeeList(data);
        })
    );
  };

  //update employee Wage
  const updateEmployee = (id) => {
    const bodyParams = {
      wage: newWage,
      id: id,
    };
    return (
      fetch("http://localhost:3001/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyParams),
      })
        //the response is whatever we have in the backend we send it to the frontend
        .then((response) => response.json())
        .then(() => {
          setEmployeeList(
            employeeList.map((val) => {
              return val.id === id
                ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
                : val;
            })
          );
        })
    );
  };

  const deleteEmployee = (id) => {
    return fetch(`http://localhost:3001/employee/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      //to erase directly forn the front the employee info
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const handleValueInput = (value, id) => {
    if (id === 'name') {
      setName(value);
    } else if (id === 'age') {
      setAge(value);
    } else if (id === 'country') {
      setCountry(value);
    } else if (id === 'position') {
      setPosition(value);
    } else if (id === 'wage') {
      setWage(value);
    }
  };


  const handleValueUpdate = (ev) => {
    const value = ev.currentTarget.value;
    setNewWage(value);
  };

  return (
    <>
      <header className='header'> <h1 className='header__title'> HR MANAGEMENT SYSTEM</h1></header>
      <main>
        <Form handleValueInput={handleValueInput} addEmployee={addEmployee} />

        <section className='database'><h3>Employee database</h3>
          <div >
            <button className='form__showBtn' onClick={getEmployees}>Show employees list</button></div>
          {employeeList.map((val, key) => {
            return (
              <div className="allEmployee">
                <ul className="allEmployee__list">
                  <li key={key} className="allEmployee__details">
                    <p>Id employee: <span className="allEmployee__details--value"> {key + 1}</span> </p>
                    <p> Name employee: <span className="allEmployee__details--value"> {val.name} </span></p>
                    <p> Age: <span className="allEmployee__details--value"> {val.age}</span></p>
                    <p> Country: <span className="allEmployee__details--value"> {val.country}</span></p>
                    <p>Position: <span className="allEmployee__details--value"> {val.position}</span> </p>
                    <p>Wage: <span className="allEmployee__details--value"> {val.wage} </span></p>
                  </li>
                </ul>
                <div className='allEmployee__updatedList'>
                  <label htmlFor=""> Update Wage (EUR/year) </label>
                  <input
                    type="text"
                    name="wageUpdate"
                    id="wageUpdate"
                    placeholder="update salary"
                    onChange={handleValueUpdate}
                  />


                  <button className='allEmployee__updatedList--updateBtn' onClick={() => updateEmployee(val.id)}>Update</button>

                  <button className='allEmployee__updatedList--updateBtn' onClick={() => deleteEmployee(val.id)}>Delete employee</button></div>
              </div>

            );
          })}
        </section>
      </main>
      <Route path="/contacto">
        <h2>
          Este título solo aparece cuando la usuaria entra en la página de
          contacto
        </h2>
      </Route>
      <h1></h1>{" "}
      <nav>
        <ul>
          <li>
            <Link to="/">Ir al inicio</Link>
          </li>
          <li>
            <Link to="/contacto">Ir a contacto</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
