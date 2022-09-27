import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const addName = (event) => {
    event.preventDefault()

    if (!newName) return

    if (!newNumber) return

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find(p => p.name === newName)
    if (foundPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number?`)) {
        personService.update(foundPerson.id, newPerson)
          .then(returned => {
            setPersons(persons.map(p => p.id === returned.id ? returned : p))

            setNewName("")
            setNewNumber("")

            setMessage(`Updated ${foundPerson.name} number`)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })

          .catch(error => {
            setError(`Failed to update ${foundPerson.name} number, it may have been deleted already`)
            setTimeout(() => {
              setError(null)
            }, 4000)
          })
      }
      return
    }

    personService
      .create(newPerson)
      .then(returned => {
          setPersons(persons.concat(returned))

          setNewName("")
          setNewNumber("")

          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setError("Failed to add person")
        setTimeout(() => {
          setError(null)
        }, 4000)
      })
  }

  const deletePerson = (person) => {
    //console.log("deletePerson")
    if (window.confirm(`Really delete ${person.name}?`)) {
      personService
        .destroy(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))

          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(error => {
          console.log(error)

          setPersons(persons.filter(p => p.id !== person.id))

          setError("Failed to delete person, it may have been deleted already")
          setTimeout(() => {
            setError(null)
          }, 4000)
        })
    }
  }

  const filterChanged = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const nameChanged = (event) => {
    setNewName(event.target.value)
    //console.log("name changed")
  }

  const numberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        console.log(error)
        setError("Failed to load data")
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={"green"} />
      <Notification message={error} color={"red"} />

      <Filter text={filter} event={filterChanged} />

      <h3>Add a new</h3>
      <PersonForm addName={addName}
        newName={newName} nameChanged={nameChanged}
        newNumber={newNumber} numberChanged={numberChanged} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
