// Fichero src/components/App.js

import '../styles/App.scss';
import { useEffect, useState } from 'react';
//import ls from '../services/localStorage';
import { Link, NavLink, Switch, useRouteMatch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function App() {



  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);


  const addEmployee = (ev) => {
    ev.preventDefault();


    const bodyParams = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }
    console.log(bodyParams)

    // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
    return fetch('http://localhost:3001/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParams)
    })
      .then(() => console.log('response success'))

  };

  const getEmployees = (ev) => {
    ev.preventDefault()
    return fetch('http://localhost:3001/employees')
      //the response is whatever we have in the backend we send it to the frontend
      .then((response) => console.log(response))

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


  return (
    <>

      <header> HR MANAGEMENT SYSTEM</header>

      <main>

        <section>
          <form action="" className='form'>

            <label htmlFor="name" className="form__label">Name</label> <input className="form__input" type="text" name="name" id="name" onChange={handleValueInput} />

            <label htmlFor="age" className="form__label">Age</label><input className="form__input" type="number" name="age" id="age" onChange={handleValueInputAge} />

            <label htmlFor="country" className="form__label">Country</label><input className="form__input" type="text" name="country" id="country" onChange={handleValueInputCountry} />


            <label htmlFor="position" className="form__label"></label>Position<input className="form__input" type="text" name="position" id="position" onChange={handleValueInputPosition} />


            <label htmlFor="wage" className="form__label">Wage (year)</label><input className="form__input" type="number" name="wage" id="wage" onChange={handleValueInputWage} />

            <button onClick={addEmployee}>ADD EMPLOYEE</button>
          </form>
        </section>
        <section>

          <button onClick={getEmployees}>Show employees</button>
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