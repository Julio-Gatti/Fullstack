const Filter = ({ text, event }) => {
  return (
    <div>
      Filter by name: <input value={text} onChange={event} />
    </div>
  )
}

export default Filter
