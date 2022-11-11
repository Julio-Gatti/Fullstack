import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'Test URL',
  likes: 2
}

test('The title is displayed', () => {
  render(<Blog blog={blog} />)

  const title = screen.getByText(blog.title)
  expect(title).toBeDefined()
})

test('The author, URL and likes are displayed when the view button is pressed', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const author = screen.getByText(blog.author)
  expect(author).toBeDefined()

  const url = screen.getByText(blog.url)
  expect(url).toBeDefined()

  const likes = screen.getByText('likes', { exact: false })
  expect(likes).toBeDefined()
})

test('Pressing the like button twice causes the mock handler to be called the same number of times', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} like={mockHandler} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
