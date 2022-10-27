import { useState, useEffect } from 'react'

import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [notificationText, setNotificationText] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')

      setNotificationText('Wrong credentials')
      setNotificationColor('red')
      setTimeout(() => {
        setNotificationText(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    //event.preventDefault()

    console.log('Logging out')

    setUser(null)
    window.localStorage.clear()
  }

  const handleNew = (event) => {
    event.preventDefault()

    console.log('Creating a blog')

    const blog = {
      title: title,
      author: author,
      url: url
    }

    try {
      blogService
        .create(blog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setURL('')
        })

        setNotificationText(`Created blog ${blog.title}`)
        setNotificationColor('green')
        setTimeout(() => {
          setNotificationText(null)
        }, 5000)
    } catch (exception) {
      console.log('Failed to create blog')

      setNotificationText('Failed to create blog')
      setNotificationColor('red')
      setTimeout(() => {
        setNotificationText(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Login</h2>

        <Notification message={notificationText} color={notificationColor} />

        <form onSubmit={handleLogin}>
          <div>
            Username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notificationText} color={notificationColor} />

      <p>{user.name} logged in</p>
      <button onClick={() => handleLogOut()}>
        Log out
      </button>

      <h2>Create new</h2>

      <form onSubmit={handleNew}>
          <div>
            Title
              <input
              type="text"
              value={title}
              name="Username"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
              <input
              type="text"
              value={author}
              name="Password"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL
              <input
              type="text"
              value={url}
              name="Password"
              onChange={({ target }) => setURL(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
