/* eslint-disable linebreak-style */
//Ejercicio 5.5

import React, { useState, useImperativeHandle } from 'react'

//Ejercicio 5.11
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  //Ejercicio 5.11
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="btn-addBlog" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>CANCEL</button>
      </div>
    </div>
  )
})

//Ejercicio 5.12
Togglable.displayName = 'Togglable'

export default Togglable