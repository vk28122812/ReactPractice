import React, { useContext } from 'react'
import { CartContext } from '../store/cart-context'


function Meal({meal}) {
  
  const {addItemToCart} = useContext(CartContext)
  return (
    <article className="meal-item">
    <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
    <h3>{meal.name}</h3>
    <p className="meal-item-description">{meal.description}</p>
    <p className="meal-item-price">{meal.price}</p>
    <p className="meal-item-actions">
      <button className="button" onClick={() => addItemToCart(meal.id)}>
        Add to Cart
      </button>
    </p>
  </article>
  )
}

export default Meal