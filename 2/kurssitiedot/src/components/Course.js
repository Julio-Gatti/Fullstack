const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <div>
        {props.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((prev, cur) =>
    prev + cur.exercises, 0)

  return (
    <div>
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course
