// import {createStore} from 'redux';
import {  configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer  from "./auth";




const store = configureStore({
    reducer : {counter : counterReducer, auth: authReducer}
})

// const counterReducer = (state = initialState, action) => {
//     if(action.type==='increment'){
//         return {
//             ...state,
//             counter: state.counter + 1
//         }
//     }
//     if(action.type ==='increase'){
//         return {
//             ...state,
//             counter: state.counter + action.amount
//         }
//     }
//     if(action.type==='decrement'){
//         return {
//             counter: state.counter - 1
//         }
//     }
//     if(action.type ==='toggle'){
//         return {
//             ...state,
//             showCounter: !state.showCounter
//         }
//     }
//     return state;
// }
// const store = createStore(counterReducer);


const counterSubscriber =  () => {
    let latestState  = store.getState();
    // console.log(latestState);
}
store.subscribe(counterSubscriber);


// store.dispatch({type:'increment'});
// store.dispatch({type:'decrement'});

export default store;
