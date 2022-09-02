import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad

  if (all <= 0) return <p>No information given</p>

  const avg = ((props.good - props.bad) / all).toFixed(3)
  const posPercent = (props.good / all).toFixed(3)

  return (
  <table>
    <tbody>
      <StatisticLine name={'Good'} value={props.good}/>
      <StatisticLine name={'Neutral'} value={props.neutral}/>
      <StatisticLine name={'Bad'} value={props.bad}/>
      <StatisticLine name={'All'} value={all}/>
      <StatisticLine name={'Average'} value={avg}/>
      <StatisticLine name={'Positive'} value={posPercent + ' %'}/>
    </tbody>
  </table>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name={'give feedback'}/>
      <Button handleClick={() => setGood(good + 1)} name={'Good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} name={'Neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} name={'Bad'}/>
      <Header name={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
