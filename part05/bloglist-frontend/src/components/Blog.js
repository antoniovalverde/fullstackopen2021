/* eslint-disable linebreak-style */
import React, { useState } from 'react'
//import blogs from '../services/blogs'
const Blog = ({ blog, updateBlog, user, deleteBlog }) => {

  //Ejercicio 5.7
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border:'solid',
    borderWidth: 1,
    marginBottom:5
  }

  //Ejercicio 5.10
  let userCorrecto = null

  if ( user.username === blog.user.username ) {
    userCorrecto = true
  }else{
    userCorrecto = false
  }

  const [ver, setVer] = useState(false)
  const [botonVer, setBotonVer] = useState(true)

  const toggleVer = () => {
    setVer(!ver)
    setBotonVer(!botonVer)
  }

  //Ejercicio 5.8
  const addLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`DELETE BLOG ${blog.title} BY ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div className="title-author">
        {blog.title} {blog.author}
        <button className="btn-ver" onClick={toggleVer}>{botonVer ? 'VIEW' : 'HIDE'}</button>
      </div>
      {!botonVer &&
      <div>
        <p className="url">{blog.url}</p>
        <p className="likes">Likes: {blog.likes}<button className="btn-addlike" onClick={addLikes}>ADD LIKE</button></p>
        <p>Autor: {blog.user.name}</p>
        {userCorrecto && <p><button onClick={handleDeleteBlog}>REMOVE</button></p>}
      </div>
      }
    </div>
  )}

export default Blog
