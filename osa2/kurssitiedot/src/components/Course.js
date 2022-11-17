// Course komponentti, minkä tehtävä on renderöidä kurssin nimi, osat ja tehtävien yhteismäärä
const Course = (props) => {

    //propsin sisältö, courses lista, mikä sisältää objekteja
    const courses = props.courses //propsien sisältö tallennetaan course muuttujaan, ettei propsia tarvitse jatkossa kirjoittaa joka kerta

    //renderöidään kurssin nimi, contentti ja tehtävien yhteismäärä, tulevat propsina kurssin objektista mikä on listan sisällä
    //iteroidaan lista mikä sisältää objekteja, jotta saadaan kaikki kurssit näkyviin, luodaan uniikki indeksinro jokaiselle kurssille
    return (
        <div>
            {courses.map((kurssi, i) =>
                <div key={i}>
                    <Header name={kurssi.name} />
                    <Content parts={kurssi.parts} />
                    <Total parts={kurssi.parts} />
                </div>)
            }
        </div>
    )
}



// Header komponentti, minkä tehtävä on renderöidä kurssin nimi
const Header = (props) => {
    return <h1>{props.name}</h1>
}



// Content komponentti, minkä tehtävä on renderöidä osat
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



// Part komponentti, minkä tehtävä on renderöidä yhden osan nimi ja osan tehtävien määrä
const Part = (props) => {
    //renderöidään osan nimi ja tehtävien määrä
    return (
        <div>
            <p>{props.name} {props.exercises}</p>
        </div>
    )
}


// Total komponentti, minkä tehtävä on renderöidä tehtävien yhteismäärä
const Total = (props) => {

    const content = props.parts //propsien sisältö, parts lista luodaan content muuttujaan nimeltä content

    //tehtävien yhteismäärä lasketaan reduce metodilla, joka ottaa parametreina summan arvon ja nykyisen arvon, mikä lisätään summaan
    const total = content.reduce((sum, osa) => { //lasketaan reduce funktiolla tehtävien yhteismäärä
        return sum + osa.exercises
    }, 0)

    //renderöidään yhteismäärä
    return (
        <div>
            <h2>total of {total} exercises</h2>
        </div>
    )
}


// Exportataan Course komponentti App.js tiedostoon
export default Course