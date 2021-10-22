// Fichero src/components/App.js

import '../styles/App.scss';
import { useEffect, useState } from 'react';
//import ls from '../services/localStorage';
import { Link, NavLink, Switch, useRouteMatch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function App() {

  //constantes 
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
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
      wage: wage
    }
    //console.log(bodyParams);

    return fetch('http://localhost:3001/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParams)
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
            wage: wage
          },
        ]);
      })
  };

  //get all employees in database clicking button
  const getEmployees = (ev) => {
    ev.preventDefault()
    return fetch('http://localhost:3001/employees')
      //the response is whatever we have in the backend we send it to the frontend
      .then((response) => response.json())
      //el data es el array de objetos en la base datos 
      .then((data) => {
        console.log(data)
        setEmployeeList(data)

      })
  }

  //update employee Wage
  const updateEmployee = (id) => {

    const bodyParams = {
      wage: newWage,
      id: id
    }
    return fetch('http://localhost:3001/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParams)
    })

      //the response is whatever we have in the backend we send it to the frontend
      .then((response) => response.json())
      .then(() => {
        setEmployeeList(employeeList.map((val) => {
          return val.id === id ? {
            id: val.id, name: val.name, country: val.country, age: val.age, position: val.position, wage: newWage
          } : val
        }));

      });

  };
  // const printEmployee = () => {
  //   employeeList.map((val, key) => {
  //     return <div> <p>Id employee: {val.id}</p>
  //       <p>Name employee: {val.name} </p>
  //       <p>Age: {val.age}</p>
  //       <p> Country: {val.country}</p>
  //       <p> Position: {val.position}</p>
  //       <p> Wage: {val.wage}</p>
  //     </div>
  //   })
  // }

  const deleteEmployee = (id) => {
    return fetch(`http://localhost:3001/employee/delete/${id}`)

      .then((response) => {
        //to erase directly forn the front the employee info 
        setEmployeeList(employeeList.filter((val) => {
          return val.id !== id
        }))
      })
  }

  const handleValueInput = (ev) => {
    const value = ev.target.value;
    //console.log(value)
    setName(value)

  }

  const handleValueInputAge = (ev) => {
    const value = ev.currentTarget.value;
    setAge(value)

  }

  const handleValueInputCountry = (ev) => {
    const value = ev.currentTarget.value;
    setCountry(value)

  }

  const handleValueInputPosition = (ev) => {
    const value = ev.currentTarget.value;
    setPosition(value)

  }

  const handleValueInputWage = (ev) => {
    const value = ev.currentTarget.value
    setWage(value)

  }

  const handleValueUpdate = (ev) => {
    const value = ev.currentTarget.value
    setNewWage(value)

  }

  return (
    <>

      <header> HR MANAGEMENT SYSTEM</header>

      <main>

        <section>
          <form action="" className='form'>

            <label htmlFor="name" className="form__label">Name and Last Name </label> <input className="form__input" type="text" name="name" id="name" onChange={handleValueInput} />

            <label htmlFor="age" className="form__label">Age</label><input className="form__input" type="number" name="age" id="age" onChange={handleValueInputAge} />

            <label htmlFor="country" className="form__label">Country</label><input className="form__input" type="text" name="country" id="country" onChange={handleValueInputCountry} />


            <label htmlFor="position" className="form__label"></label>Position<input className="form__input" type="text" name="position" id="position" onChange={handleValueInputPosition} />


            <label htmlFor="wage" className="form__label">Wage (year)</label><input className="form__input" type="number" name="wage" id="wage" onChange={handleValueInputWage} />

            <button onClick={addEmployee}>ADD EMPLOYEE</button>
          </form>

        </section>
        <section>

          <button onClick={getEmployees}>Show employees</button>

          {
            employeeList.map((val, key) => {
              return <div className="allEmployee">
                <ul className="allEmployee__list">
                  <li key={val.id} className="allEmployee__title">
                    Id employee: {val.id}
                    Name employee: {val.name}
                    Age: {val.age}
                    Country: {val.country}
                    Position: {val.position}
                    Wage: {val.wage}</li>
                </ul>
                <label htmlFor="">
                  <input type="text" name="wageUpdate" id="wageUpdate" placeholder='update salary' onChange={handleValueUpdate} /> </label>
                <button onClick={() => updateEmployee(val.id)}>update</button>
                <button onClick={() => deleteEmployee(val.id)}>delete</button>
              </div>
            })
          }

        </section>

      </main>


      <Route path="/contacto">
        <h2>Este título solo aparece cuando la usuaria entra en la página de contacto</h2>
      </Route>
      <h1></h1>      <nav>
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