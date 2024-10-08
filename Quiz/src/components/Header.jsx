import React from 'react'

import logo from "../assets/quiz-logo.png"
function Header() {
  return (
    <header>
        <img src={logo} alt="React Quiz" />
        <h1>REACT QUIZ</h1>
    </header>
  )
}

export default Header