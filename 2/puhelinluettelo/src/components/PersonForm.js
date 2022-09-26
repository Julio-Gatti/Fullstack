const PersonForm = ({ addName, newName, nameChanged, newNumber, numberChanged }) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={nameChanged} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={numberChanged} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
