import CartContextProvider from "./store/cart-context";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
function App() {

  return (
    <CartContextProvider>
      <Header />
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
