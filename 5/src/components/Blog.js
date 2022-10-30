import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, like }) => {
  const [full, setFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setFull(!full)}>
        {full ? 'Hide' : 'View'}
      </button>
      {full &&
        <div>
          <p>
            {blog.url}
          </p>
          Likes {blog.likes}
          <button onClick={() => like(blog)}>
            Like
          </button>
          <p>
            {blog.author}
          </p>
        </div>
      }
    </div>
  )
}

export default Blog
