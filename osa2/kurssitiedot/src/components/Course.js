const Course = ({ courses }) => { // component that renders a course from array of objects

  return (
    <>
      {courses.map((kurssi, i) =>
        <div key={i}>
          <Header name={kurssi.name} />
          <Content parts={kurssi.parts} />
          <Total parts={kurssi.parts} />
        </div>)
      }
    </>
  )
}


const Header = ({ name }) => { // component that renders a course name
  return <h1>{name}</h1>
}


const Content = ({ parts }) => { // component that renders course parts

  return (
    <>
      {parts.map((osa, i) => <Part key={i} name={osa.name} exercises={osa.exercises} />)}
    </>
  )
}


const Part = ({ name, exercises }) => { // renders a one part of a course
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}


const Total = ({ parts }) => { // component that renders total number of exercises

  const total = parts.reduce((sum, osa) => { // calculate total number of exercises with reduce method
    return sum + osa.exercises
  }, 0)

  return (
    <>
      <h2>total of {total} exercises</h2>
    </>
  )
}


export default Course