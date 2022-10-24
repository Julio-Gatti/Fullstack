const blogsRouter = require('express').Router()
const { replaceOne } = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title && !body.url) {
    response.status(400).json('Title and URL missing')
  }

  const blog = new Blog(body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(expection) {
    next(expection)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  try {
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog)
  } catch(expection) {
    next(expection)
  }
})

module.exports = blogsRouter
