const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => {
    if (blog.likes > (max ? max.likes : 0)) {
      return blog
    }
    return max
  }, undefined)
}

const mostBlogs = (blogs) => {
  if (blogs.length == 0) {
    return undefined
  }

  const amounts = new Map()

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]

    if (amounts.has(blog.author)) {
      amounts.set(blog.author, amounts.get(blog.author) + 1)
    } else {
      amounts.set(blog.author, 1)
    }
  }
  //console.log(amounts)

  const keyAndValue = [...amounts.entries()].reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)
  //console.log(keyAndValue)

  const result = {
    author: keyAndValue[0],
    blogs: keyAndValue[1]
  }

  return result
}

const mostLikes = (blogs) => {
  if (blogs.length == 0) {
    return undefined
  }

  const amounts = new Map()

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]

    if (amounts.has(blog.author)) {
      amounts.set(blog.author, amounts.get(blog.author) + blog.likes)
    } else {
      amounts.set(blog.author, blog.likes)
    }
  }
  //console.log(amounts)

  const keyAndValue = [...amounts.entries()].reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)
  //console.log(keyAndValue)

  const result = {
    author: keyAndValue[0],
    likes: keyAndValue[1]
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
