const ErrorMessage = ({ message, errorhappened }) => {
    if (message === null) { // if message is null, return null
        return null
    }

    else if (errorhappened) { // if errorhappened is true, message is red
        return (
            <div className="error_red">
                {message}
            </div>
        )
    }


    else { // if errorhappened is false, message is green
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}


export default ErrorMessage