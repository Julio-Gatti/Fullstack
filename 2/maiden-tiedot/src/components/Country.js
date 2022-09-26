const Country = ({ country, onClick }) => {
  return (
    <p>
      {country.name.common} {country.number}
      <button onClick={onClick}>Show</button>
    </p>
  )
}

export default Country
