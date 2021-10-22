import FormInput from "./FormInput"

const Form = (props) => {

    return (<section>

        <form className="form">
            <h2>Employee Information</h2>
            <FormInput
                label=' Name and Last Name '
                type='text'
                name='name'
                id='name'
                handleValueInput={props.handleValueInput} />

            <FormInput
                label=' Age '
                type='number'
                name='age'
                id='age'
                handleValueInput={props.handleValueInput} />
            <FormInput
                label=' Country '
                type='text'
                name='country'
                id='country'
                handleValueInput={props.handleValueInput} />
            <FormInput
                label=' Position '
                type='text'
                name='position '
                id='position'
                handleValueInput={props.handleValueInput} />
            <FormInput
                label=' Wage (EUR/year) '
                type='number'
                name='wage '
                id='wage'
                handleValueInput={props.handleValueInput} />

            <button className='form__addBtn' onClick={props.addEmployee}>Add new employee</button>
        </form>
    </section>)
}

export default Form