import Weather from "./Weather"

const CountryDetails = ({ country }) => {
  //console.log(country)

  const countryName = country.name.common
  const capitalName = country.capital[0]

  return (
    <div>
      <h2>{countryName}</h2>
      <p>Capital: {capitalName}</p>
      <p>Area: {country.area} km²</p>
      <p><b>Languages:</b></p>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}> {language}</li>
        )}
      </ul>
      <img src={country.flags.svg} height={160} alt={'Country'}/>

      <Weather cityName={capitalName} />
    </div>
  )
}

export default CountryDetails
