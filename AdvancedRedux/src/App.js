import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendCartData, fetchCartData } from "./store/cartActions";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch();
    
  useEffect( ()=> {
      dispatch(fetchCartData())
  },[]);

  
  useEffect( () => {
    if(isInitial){
      isInitial = false;
      return;
    } 
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [dispatch,cart])
  // useEffect(() => {
  //   async function sendCartData() {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "sending",
  //         message: "sending cart data",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://advancedredux-dc3c7-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Sending Cart Data failed");
  //     }
  //     const responseData = await response.json();
  //     console.log(responseData);
      
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "sent cart data successfully",
  //       })
  //     );
  //     isInitial = false;
  //   }
  //   sendCartData().catch((error) => {
  //     if(isInitial)return;
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "sending cart data failed",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}
export default App;
