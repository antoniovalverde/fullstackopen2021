/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
//Ejercicio 5.13

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
//Ejercicio 5.14
import { fireEvent } from '@testing-library/dom'
import Blog from './Blog'

const userTest = {
  username: 'Koky',
  name: 'Antonio Valverde'
}

const blogTest = {
  author: 'Periquito de los Palotes',
  title: 'All about testing',
  url: 'http://alltesting.es',
  likes: 3,
  user: userTest
}

const mockHandlerUpdateBlog = jest.fn()
const mockHandlerDeleteBlog = jest.fn()

const component = render(
  <Blog blog={blogTest} updateBlog={mockHandlerUpdateBlog} user={userTest} deleteBlog={mockHandlerDeleteBlog} />
)

test('render blog with title and author only', () => {
  const titleAndAuthorTest = component.container.querySelector('.title-author')

  expect(titleAndAuthorTest).toBeVisible()
  expect(component.container).toHaveTextContent(blogTest.author)
  expect(component.container).toHaveTextContent(blogTest.title)
  expect(component.container).not.toHaveTextContent(blogTest.url)
  expect(component.container).not.toHaveTextContent(blogTest.likes)

})

//Ejercicio 5.14
test('click button render url and likes', () => {
  const button = component.container.querySelector('.btn-ver')

  fireEvent.click(button)

  const urlTest = component.container.querySelector('.url')
  const likesTest = component.container.querySelector('.likes')

  expect(urlTest).toBeVisible()
  expect(likesTest).toBeVisible()
  expect(urlTest).toHaveTextContent(blogTest.url)
  expect(likesTest).toHaveTextContent(blogTest.likes)
})

//Ejercicio 5.15
test('clicking like button 2 times', () => {

  /*const button = component.container.querySelector('.btn-ver')
  fireEvent.click(button)  */

  const button2 = component.container.querySelector('.btn-addlike')

  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandlerUpdateBlog.mock.calls).toHaveLength(2)
})