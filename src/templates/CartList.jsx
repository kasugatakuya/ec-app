import React, {useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from '@material-ui/core/List'
import { getProductsInCart } from "../reducks/users/selectors"
import { CartListItem } from "../components/puroducts"
import { GreyButton, PrimaryButton } from "../components/UIkit"
import {push} from "connected-react-router"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  },
}));

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, [])


  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        ショッピングカート
      </h2>
      <List className={classes.root}>
        {productsInCart.length > 0 && (
          productsInCart.map(product =><CartListItem key={product.cartId} product={product} />)
        )}
      </List>
      <div className="p-grid__column">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  )
}

export default CartList