/* eslint-disable linebreak-style */
//Ejercicio 5.16
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const mockHandlerSubmitBlogForm = jest.fn()

const component = render(
  <BlogForm handleAddBlog={mockHandlerSubmitBlogForm} />
)

test('Blog Form Submit', () => {
  const form = component.container.querySelector('form')
  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')

  fireEvent.change(inputTitle, {
    target: { value: 'Full Stack Developer PRO' },
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Antonio Valverde' },
  })
  fireEvent.change(inputUrl, {
    target: { value: 'https://antoniovalverde.es' },
  })
  fireEvent.submit(form)

  expect(mockHandlerSubmitBlogForm.mock.calls).toHaveLength(1)
  expect(mockHandlerSubmitBlogForm.mock.calls[0][0]).toBe('Full Stack Developer PRO')
  expect(mockHandlerSubmitBlogForm.mock.calls[0][1]).toBe('Antonio Valverde')
  expect(mockHandlerSubmitBlogForm.mock.calls[0][2]).toBe('https://antoniovalverde.es')
})