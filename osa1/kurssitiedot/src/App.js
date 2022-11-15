//renderöi kurssin nimen
const Header = (props) => {

  return <h1>{props.name}</h1>
}


//renderöi osat contentin sisällä
const Content = (props) => {

  //propsien sisältö, parts lista
  const contents = props.parts
  
  //renderöidään osat
    return (
      <div>
        {contents.map((osa, i) => <Part key={i} name={osa.name} exercises={osa.exercises} />)}
      </div>
    )
}



//renderöi yhden osan tiedot
const Part = (props) => {
  
  //renderöidään osan nimi ja tehtävien määrä
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
  
}

//renderöi tehtävien yhteismäärän
const Total = (props) => {
  let total = 0 //tehtävien yhteismäärä alustetaan nollaksi

  const content = props.parts //propsien sisältö, parts lista

  //käydään parts lista läpi ja lisätään tehtävien määrät yhteen
  for (let i = 0; i < content.length; i++) {
    total += content[i].exercises
  }

  //renderöidään yhteismäärä
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {

  //propsien arvot course objectina, sisältää nimen ja parts listan
  const course = {
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


  //lähetetään propsit Headerille, Contentille ja Totalille ja renderöidään elementit
  return (
    <div>
      <Header name={course.name} />
      
      <Content parts={course.parts} />
      
      <Total parts={course.parts} />
    </div>
  )
}

export default App