import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('The form calls the mock handler with the right information when a blog is created', async () => {
  const mockHandler = jest.fn()

  const user = userEvent.setup()

  render(<BlogForm createBlog={mockHandler} />)

  const title = screen.getByPlaceholderText('Title')
  await user.type(title, 'Test title')

  const author = screen.getByPlaceholderText('Author')
  await user.type(author, 'Test author')

  const url = screen.getByPlaceholderText('URL')
  await user.type(url, 'Test URL')

  const createButton = screen.getByText('Create')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Test title')
  expect(mockHandler.mock.calls[0][0].author).toBe('Test author')
  expect(mockHandler.mock.calls[0][0].url).toBe('Test URL')
})
