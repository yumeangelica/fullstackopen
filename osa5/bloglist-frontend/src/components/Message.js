

const ValidMessage = ({ message, eventHappened }) => {

  if (eventHappened === false) {
    return null
  }

  if (message === null) {
    return null
  }

  return (

    <div className="greenmessage">
      {message}
    </div>

  )
}


const ErrorMessage = ({ message, eventHappened }) => {

  if (eventHappened === false) {
    return null
  }

  if (message === null) {
    return null
  }

  return (
    <div className="error_red">
      {message}
    </div>
  )
}

export { ValidMessage, ErrorMessage }