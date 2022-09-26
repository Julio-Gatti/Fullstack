import Person from "./Person"

const Persons = ({ persons, filter, deletePerson }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      {filteredPersons.map(person =>
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      )}
    </div>
  )
}

export default Persons
