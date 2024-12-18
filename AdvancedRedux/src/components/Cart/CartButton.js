import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui';
import { useDispatch, useSelector } from 'react-redux';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  function handleClick(){
    dispatch(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={handleClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
