import "../styles/App.scss";
import { useState } from "react";
import Form from "./Form";
import Header from "./Header";
import RenderListEmployee from "./RenderListEmployee";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
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
    return fetch("/create", {
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

  //get all employees in database 
  const getEmployees = (ev) => {
    ev.preventDefault();
    return (
      fetch("/employees")
        .then((response) => response.json())
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
      fetch("/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyParams),
      })
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

  //delete employee from database
  const deleteEmployee = (id) => {
    return fetch(`/employee/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  //handle Input of form
  const handleValueInput = (value, id) => {
    if (id === "name") {
      setName(value);
    } else if (id === "age") {
      setAge(value);
    } else if (id === "country") {
      setCountry(value);
    } else if (id === "position") {
      setPosition(value);
    } else if (id === "wage") {
      setWage(value);
    }
  };

  const handleValueUpdate = (ev) => {
    const value = ev.currentTarget.value;
    setNewWage(value);
  };

  return (
    <>
      <Header />
      <main>
        <Form handleValueInput={handleValueInput} addEmployee={addEmployee} />
        <RenderListEmployee
          employeeList={employeeList}
          getEmployees={getEmployees}
          handleValueUpdate={handleValueUpdate}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
        />
      </main>
    </>
  );
}

export default App;
