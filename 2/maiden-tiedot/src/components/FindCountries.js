const FindCountries = ({ text, event }) => {
  return (
    <div>
      Find countries: <input value={text} onChange={event} />
    </div>
  )
}

export default FindCountries
