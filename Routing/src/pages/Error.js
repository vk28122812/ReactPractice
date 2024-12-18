import React from 'react'
import MainNavigation from '../components/MainNavigation'
import { useNavigate } from 'react-router-dom'
function Error() {
    const navigate = useNavigate();
  return (
    <>
    <main>
        <h1>An error occurred.</h1>
        <p>could not find this page!</p>
        <button onClick={()=>navigate("/")}>Return home</button>
    </main>
    </>
  )
}

export default Error
