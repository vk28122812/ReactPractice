import React, { useContext, useReducer } from 'react'
import logoImg from "../assets/logo.jpg"
import { CartContext } from '../store/cart-context'
function Header() {    
  const {items} = useContext(CartContext);
  
  const cartLength = items.reduce( (total, item) => total + item.quantity, 0);

  return (
    <div id="main-header">
        <div id="title">
            <img src={logoImg} alt="logo"/>
            <h1>React Food Order</h1>
        </div>
        <button >Cart({cartLength})</button>
    </div>
  )
}

export default Header;