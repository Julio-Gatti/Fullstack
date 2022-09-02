import { useState } from 'react'

const Header = ({name}) => {
  return (
    <div>
      <h1>
        {name}
      </h1>
    </div>
  )
}

const Button = ({handleClick, name}) => {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const Anecdote = ({text, votes}) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)

  const most = Math.max(...votes)
  const iMost = votes.indexOf(most)

  return (
    <div>
      <Header name={'Anecdote of the day'}/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <div>
        <Button handleClick={() => {
          const tVotes = [...votes]
          tVotes[selected]++
          setVotes(tVotes)
        }} name={'vote'}/>
        <Button handleClick={() => {
          let random = selected
          while (random === selected) {
            random = getRandomInt(0, anecdotes.length)
          }
          setSelected(random)
        }} name={'next anecdote'}/>
      </div>
      <Header name={'Anecdote with most votes'}/>
      <Anecdote text={anecdotes[iMost]} votes={votes[iMost]}/>
    </div>
  )
}

export default App
