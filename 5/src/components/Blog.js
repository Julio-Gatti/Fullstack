import { useState } from 'react'

const Blog = ({blog}) => (
  //const [full, setFull] = useState(false)

  /*return (
    
  )*/

  <div>
      {blog.title} {blog.author}
  </div>
)

export default Blog
