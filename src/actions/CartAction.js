import axios from "../Axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/CartConstant";

export const addToCart = (productID,qty) => async(dispatch, getState) =>{
    //const {data} = await axios.get(`/api/products/${productID}`);
    const data = await axios.post("https://p0eeuk4p2a.execute-api.us-east-1.amazonaws.com/Dev", {productID: productID})

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.data.body.brand,
            image: data.data.body.image,
            price: data.data.body.price,
            stock: data.data.body.stock,
            product: data.data.body.product_id,
            qty,
        }
    })

    console.log("This is cart action addToCart");
    console.log(getState().cart.cartItems)
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};


export const removeFromCart = (productID) => (dispatch,getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productID
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));

}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    });
}
