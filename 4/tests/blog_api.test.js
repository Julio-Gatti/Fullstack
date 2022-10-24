const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('Getting blogs', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('A specific blog is returned', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
  })

  test('The identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Adding blogs', () => {
  test('A valid blog can be added', async () => {
    const newBlog = {
      title: 'Testi',
      author: 'Kalle',
      url: 'Google.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogs.map(r => r.title)
    expect(titles).toContain(
      'Testi'
    )
  })

  test('A blog without specified likes gets it set to zero', async () => {
    const newBlog = {
      title: 'Testi2',
      author: 'Kalle2',
      url: 'Google.com2'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const added = blogs.find(b => b.title === 'Testi2')
    expect(added.likes).toEqual(0)
  })

  test('A blog without specified title and URL get responded with 400 - bad request', async () => {
    const newBlog = {
      author: 'Kalle4',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Deleting blogs', () => {
  test('Deletion succeeds with status code 204', async () => {
    const blogs = await helper.blogsInDb()
    const toDelete = blogs[0]

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(204)

    const newBlogs = await helper.blogsInDb()
    expect(newBlogs).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = newBlogs.map(r => r.title)
    expect(titles).not.toContain(toDelete.title)
  })
})

describe('Updating blogs', () => {
  test('Setting likes to zero succeeds with status code 200', async () => {
    const blogs = await helper.blogsInDb()
    const toUpdate = blogs[0]

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send({ ...blog, likes: 0 })
      .expect(200)

    const newBlogs = await helper.blogsInDb()
    const updated = newBlogs.find(b => b.id === toUpdate.id)
    expect(updated.likes).toEqual(0)
  })

  test('Adding a like succeeds with status code 200', async () => {
    const blogs = await helper.blogsInDb()
    const toUpdate = blogs[0]

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send({ ...blog, likes: toUpdate.likes + 1 })
      .expect(200)

    const newBlogs = await helper.blogsInDb()
    const updated = newBlogs.find(b => b.id === toUpdate.id)
    expect(updated.likes).toEqual(toUpdate.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
