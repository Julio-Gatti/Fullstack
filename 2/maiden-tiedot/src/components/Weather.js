import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ cityName }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        //console.log(response.data)
        setWeather(response.data)
      })
  }, [])

  if (!weather) {
    return
  }

  //console.log(weather)

  return (

    <div>
      <h2>Weather in {cityName}</h2>
      <p>Temperature: {weather.main.temp} C</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} height={120} alt={'Weather'}/>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
