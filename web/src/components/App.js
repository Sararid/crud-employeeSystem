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


  const bodyParams = {
    'name': name,
    'age': age,
    'country': country,
    'position': position,
    'wage': wage
  }

  const addEmployee = (ev) => {
    ev.preventDefault();


    console.log('Se están pidiendo las películas de la app');
    // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
    return fetch('http://localhost:3001/create', {
      method: 'POST',
      body: JSON.stringify(bodyParams),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => console.log('success'))

  };

  const handleValueInput = (ev) => {
    const value = ev.currentTarget.value;
    console.log(value)
    setName(value)
    setAge(value)
    setCountry(value)
    setPosition(value)
    setWage(value)
  }


  // const handleValueInputName = (ev) => {
  //   const value = ev.currentTarget.value;
  //   setName(value)

  // }
  // const handleValueInputAge = (ev) => {
  //   const value = ev.currentTarget.value;
  //   setAge(value)

  // }

  // const handleValueInputCountry = (ev) => {
  //   const value = ev.currentTarget.value;
  //   setCountry(value)

  // }

  // const handleValueInputPosition = (ev) => {
  //   const value = ev.currentTarget.value;
  //   setPosition(value)

  // }

  // const handleValueInputWage = (ev) => {
  //   const value = ev.currentTarget.value
  //   setWage(value)

  // }


  return (
    <>

      <header> HR MANAGEMENT SYSTEM</header>

      <main>
        <form action="" className='form'>

          <label htmlFor="name" className="form__label">Name</label> <input className="form__input" type="text" name="name" id="name" onChange={handleValueInput} />

          <label htmlFor="age" className="form__label">Age</label><input className="form__input" type="number" name="age" id="age" onChange={handleValueInput} />

          <label htmlFor="country" className="form__label">Country</label><input className="form__input" type="text" name="country" id="country" onChange={handleValueInput} />


          <label htmlFor="position" className="form__label"></label>Position<input className="form__input" type="text" name="position" id="position" onChange={handleValueInput} />


          <label htmlFor="wage" className="form__label">Wage (year)</label><input className="form__input" type="number" name="wage" id="wage" onChange={handleValueInput} />

          <button onClick={addEmployee}>ADD EMPLOYEE</button>
        </form>
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