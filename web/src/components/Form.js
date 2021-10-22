const Form = (props) => {

    return (<section>

        <form className="form">
            <h2>Employee Information</h2>
            <label htmlFor="name" className="form__label">
                Name and Last Name{" "}
            </label>{" "}
            <input
                className="form__input"
                type="text"
                name="name"
                id="name"
                onChange={props.handleValueInput}
            />
            <label htmlFor="age" className="form__label">
                Age
            </label>
            <input
                className="form__input"
                type="number"
                name="age"
                id="age"
                onChange={props.handleValueInputAge}
            />
            <label htmlFor="country" className="form__label">
                Country
            </label>
            <input
                className="form__input"
                type="text"
                name="country"
                id="country"
                onChange={props.handleValueInputCountry}
            />
            <label htmlFor="position" className="form__label"></label>Position
            <input
                className="form__input"
                type="text"
                name="position"
                id="position"
                onChange={props.handleValueInputPosition}
            />
            <label htmlFor="wage" className="form__label">
                Wage (EUR/year)
            </label>
            <input
                className="form__input"
                type="number"
                name="wage"
                id="wage"
                onChange={props.handleValueInputWage}
            />
            <button className='form__addBtn' onClick={props.addEmployee}>Add new employee</button>
        </form>
    </section>)
}

export default Form