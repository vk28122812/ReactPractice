import { uiActions } from "./ui";
import { cartActions } from "./cart";
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://advancedredux-dc3c7-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart Data failed");
      }
      //   const responseData = await response.json();
      //   console.log(responseData);
    };

    try {
      sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://advancedredux-dc3c7-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
          throw new Error("couldn't fetch data");
        }
        const resData = await response.json();
        return resData;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0
        })
      );
    } catch (error) {
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Fetching cart data failed",
      });
    }
  };
};
