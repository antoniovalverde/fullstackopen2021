/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
//Ejercicio 5.4
import Notificacion from './components/Notificacion'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //Ejercicio 5.1
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //Ejercicio 5.4
  const [errorMessage, setErrorMessage] = useState(null)

  //Ejercicio 5.3
  const [newBlog, setNewBlog] = useState('')

  //Ejercicio 5.5
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //Ejercicio 5.2
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  //Ejercicio 5.1
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      //Ejercicio 5.2
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //Ejercicio 5.3 && Ejercicio 5.5
  const handleAddBlog = async (title, author, url) => {
    const blog = await blogService.create({
      title, author, url
    })
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(blog))
    setNewBlog('')
    //Ejercicio 5.4
    setErrorMessage(title + ' by ' + author)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  //Ejercicio 5.8
  const addLike = async (blog) => {
    await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    })
    const newBlogs = blogs.map((elBlog) =>
      elBlog.id === blog.id ? { ...elBlog, likes: elBlog.likes + 1 } : elBlog
    )
    setBlogs(newBlogs)
  }

  //Ejercicio 5.10
  const deleteBlog = async (blogId) => {
    await blogService.deleteBlog(blogId)
  }

  const handleLogout = () => {
    //Ejercicio 5.2
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="btn-login" type="submit">login</button>
    </form>
  )

  const messageLoginOk = () => (
    <div>
      <p id="msg-hello">{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <hr/>
      <Togglable buttonLabel="ADD BLOG" ref={blogFormRef}>
        <BlogForm handleAddBlog={handleAddBlog} value={newBlog} />
      </Togglable>
      <hr/>
      <h4>Blog´s List</h4>
      {/* Ejercicio 5.9 */}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={addLike} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notificacion message={errorMessage} />

      {user === null ? loginForm() : messageLoginOk()}

    </div>
  )

}

export default App