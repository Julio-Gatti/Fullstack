import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountries from './components/FindCountries'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [findCountries, setFindCountries] = useState('')

  const findCountriesChanged = (event) => {
    setFindCountries(event.target.value.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <FindCountries text={findCountries} event={findCountriesChanged} />

      <Countries countries={countries} filter={findCountries} setFindCountries={setFindCountries} />
    </div>
  )

}

export default App
