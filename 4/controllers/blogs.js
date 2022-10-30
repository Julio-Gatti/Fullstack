const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const body = request.body

  if (!body.title && !body.url) {
    response.status(400).json('Title and URL missing')
  }

  const user = request.user

  const blog = new Blog({ ...request.body, user: user.id })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (expection) {
    next(expection)
  }
})

router.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'User without right to remove' })
  }
})

router.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const newBlog = await Blog
      .findByIdAndUpdate(
        request.params.id,
        blog,
        { new: true, runValidators: false, context: 'query' }
      )

    response.status(200).json(newBlog)
  } catch (expection) {
    next(expection)
  }
})

module.exports = router
