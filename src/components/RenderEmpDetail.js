const RenderEmpDetail = (props) => {
    return (
        <>
            <p>
                Name employee:
                <span className="allEmployee__details--value">{props.val.name}</span>
            </p>
            <p>
                Age:
                <span className="allEmployee__details--value">{props.val.age}</span>
            </p>
            <p>
                Country:
                <span className="allEmployee__details--value">{props.val.country}</span>
            </p>

            <p>
                Position:
                <span className="allEmployee__details--value">
                    {props.val.position}
                </span>
            </p>
            <p>
                Wage:
                <span className="allEmployee__details--value"> {props.val.wage} </span>
            </p>
        </>
    );
};

export default RenderEmpDetail;
