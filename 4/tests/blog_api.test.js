const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Getting blogs', () => {
  test('Blogs are returned as JSON', async () => {
    const response = await api.get('/api/blogs')
    
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
      .send({ ...Blog, likes: 0 })
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
      .send({ ...Blog, likes: toUpdate.likes + 1 })
      .expect(200)

    const newBlogs = await helper.blogsInDb()
    const updated = newBlogs.find(b => b.id === toUpdate.id)
    expect(updated.likes).toEqual(toUpdate.likes + 1)
  })
})

describe('When there is initially one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'juuso', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kalle',
      name: 'Kalle K',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'juuso',
      name: 'Juuso J',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails if username is less than three characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ju',
      name: 'Juuso J',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must be at least three characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails if password is less than three characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'juuso',
      name: 'Juuso J',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least three characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
