import FormInput from "./FormInput"
import { Link } from "react-router-dom"
const Form = (props) => {

    return (<section>
        <div className="title_form">  <h1 className="header__title"> HR MANAGEMENT SYSTEM</h1>
            <Link to="/">
                <button className="btn">Go to homepage </button>
            </Link></div>
        <form className="form">
            <h2>Employee Information</h2>

            <div>  <FormInput
                label=' Full Name '
                type='text'
                name='name'
                id='name'
                // placeholder='Full name'
                handleValueInput={props.handleValueInput} />

                <FormInput
                    label=' Age '
                    type='number'
                    name='age'
                    id='age'
                    //   placeholder='Age'
                    handleValueInput={props.handleValueInput} />
                <FormInput
                    label=' Country '
                    type='text'
                    name='country'
                    id='country'
                    //  placeholder="Country"
                    handleValueInput={props.handleValueInput} /></div>
            <div>     <FormInput
                label="Position"
                type='text'
                name='position '
                id='position'
                //  placeholder='Job position'

                handleValueInput={props.handleValueInput} />
                <FormInput
                    label="Wage (EUR/year)"
                    type='number'
                    name='wage '
                    id='wage'
                    //   placeholder=" Wage (EUR/year) "
                    handleValueInput={props.handleValueInput} /></div>

            <button className='form__addBtn btn' onClick={props.addEmployee}>Add new employee</button>
        </form>
    </section>)
}

export default Form