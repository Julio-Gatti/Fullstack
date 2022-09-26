const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletePerson(person)} >Delete</button>
    </div>
  )
}

export default Person
