const FormInput = (props) => {
    const handleOnchangeInput = (ev) => {

        props.handleValueInput(ev.target.value, ev.target.id);
    };
    return (
        <>
            {" "}
            <label htmlFor={props.label} className="form__label">
                {props.label}
            </label>{" "}
            <input
                className="form__input"
                type={props.type}
                name={props.name}
                id={props.id}
                onChange={handleOnchangeInput}
            />
        </>
    );
};

export default FormInput;
