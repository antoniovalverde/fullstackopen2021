/* eslint-disable linebreak-style */
import React from 'react'

const Notificacion = ({ message }) => {
  if (message === null) {
    return null
  }

  if(message === 'Wrong username or password'){
    return (
      <div className="error" id="error">
        {message}
      </div>
    )
  }

  return (
    <div className="ok">
            A new blog {message} added
    </div>
  )


}

export default Notificacion