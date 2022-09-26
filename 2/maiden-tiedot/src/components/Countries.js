import { useState } from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countries, filter, setFindCountries }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))
  const [selectedCountry, setSelectedCountry] = useState(filteredCountries[0])

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filteredCountries.length == 1) {
    return <CountryDetails country={filteredCountries[0]} />
  }

  return (
    <div>
      {filteredCountries.map(country =>
        <Country key={country.name.common} country={country} onClick={() => setFindCountries(country.name.common.toLowerCase())} />
      )}
    </div>
  )
}

export default Countries
