const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  // Rest of the style comes from the .css
  const style = {
    color: color
  }

  return (
    <div className={"error"} style={style}>
      {message}
    </div>
  )
}

export default Notification
