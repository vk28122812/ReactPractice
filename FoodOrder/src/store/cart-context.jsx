import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
});

function cartReducer(state, action) {
  const updatedItems = [...state.items];
  if (action.type === "ADD_ITEM") {
    const itemIdx = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    if (itemIdx == -1) {
      updatedItems.push({ id: action.payload.id, quantity: 1 });
    } else {
      const oldItemQuantity = updatedItems[itemIdx].quantity;
      updatedItems[itemIdx] = {
        ...updatedItems[itemIdx],
        quantity: oldItemQuantity + 1,
      };
    }
  } else {
    const filteredItems = state.items.map((item) =>
      item.id === action.payload.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0);
  }

  return {
    ...state,
    items: updatedItems,
  };
}

export default function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddItemToCart(id) {  
    dispatch({
      type: "ADD_ITEM",
      payload: {id},
    });
  }

  function handleRemoveItemFromCart(id) {
    dispatch({
      type: "DELETE_ITEM",
      payload: { id },
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    deleteItemFromCart: handleRemoveItemFromCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
