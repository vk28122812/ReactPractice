import { createSlice } from "@reduxjs/toolkit"

const cartInitialState = {
    hidden : false,
    items: [],
    totalQuantity: 0,
    changed: false
}

const cartSlice = createSlice({
    name:'cart',
    initialState: cartInitialState,
    reducers: {
        toggle(state){
            state.hidden = !state.hidden           
        },
        addItem(state,action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(!existingItem){
                state.items.push({id:newItem.id,price:newItem.price,quantity:1,totalPrice:newItem.price,name:newItem.title})
            }else{
                existingItem.quantity += 1;
                existingItem.totalPrice += newItem.price;
            }
            state.totalQuantity += 1;
            state.changed = true;
        },

        removeItem(state,action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem.quantity === 1){
                state.items = state.items.filter( item => item.id !== id);
            }else{
                existingItem.quantity -= 1;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalQuantity -= 1;
            state.changed = true;
        },
        replaceCart(state,action ){     
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    }
})

export const cartActions =  cartSlice.actions;
export default cartSlice.reducer;
