import { useState } from 'react'

const Blog = ({ blog }) => {
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
            {blog.author}
          </p>
          <p>
            {blog.url}
          </p>
        </div>
      }
    </div>
  )
}

export default Blog
