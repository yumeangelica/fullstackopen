const Header = ({name}) => { // render header
  return <h1>{name}</h1>
}

const Content = ({parts}) => { // component for rendering parts
    return (
      <>
        {parts.map((osa, i) => <Part key={i} name={osa.name} exercises={osa.exercises} />)}
      </>
    )
}


const Part = ({name, exercises}) => { // component for rendering part name and exercises
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

const Total = ({parts}) => { // component to render total number of exercises
  let total = 0 // total number of exercises

  parts.map((osa, i) => total += osa.exercises) // loop through parts and add exercises to total

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}


const App = () => {
  const course = { // course object
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App