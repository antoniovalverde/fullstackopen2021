/* eslint-disable linebreak-style */
//Ejercicio 5.5 && Ejercicio 5.6

import React, { useState } from 'react'

const BlogForm = ({
  handleAddBlog
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandleAddBlog = (event) => {
    event.preventDefault()
    handleAddBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>CREATE NEW</h3>
      <form onSubmit={onSubmitHandleAddBlog}>
            TITLE:<input type="text" value={title} id="title" name="Title" onChange={({ target }) => setTitle(target.value)} />
        <br/>
            AUTHOR:<input type="text" value={author} id="author" name="Author" onChange={({ target }) => setAuthor(target.value)} />
        <br/>
            URL:<input type="text" value={url}  id="url" name="Url" onChange={({ target }) => setUrl(target.value)} />
        <br/>
        <button id="btn-addingBlog" type="submit">ADD</button>
      </form>
    </div>
  )
}

export default BlogForm