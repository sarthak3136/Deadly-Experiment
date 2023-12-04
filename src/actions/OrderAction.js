import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_FAIL, ORDER_MINE_REQUEST, ORDER_MINE_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/OrderConstant"
import axios from "../Axios"
import { CART_EMPTY } from "../constants/CartConstant";

export const createdOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    })

    try{
        const {userSignin: {userInfo}} = getState();
        console.log("This is the user info from OrderAction")
        console.log(userInfo)
        console.log(order)
        order.email = userInfo.email;
        // const {data} = await axios.post('/api/orders', order, {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // });

        //const {data} = await axios.post('https://6gth4gspl6bwi65h36hb77h5tm0fmfyf.lambda-url.us-east-1.on.aws/', order);
        const {data} = await axios.post('https://6wrub2gqvf.execute-api.us-east-1.amazonaws.com/Dev', order)
        console.log(data)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        });
        dispatch({
            type: CART_EMPTY
        });

        localStorage.removeItem("cartItems");
    }
    catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
             ? error.response.data.message
             : error.message,
        });
    }
}


export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // const { data } = await axios.get(`/api/orders/${orderId}`, {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // });
    console.log(orderId)
    const { data } = await axios.post('https://844t6ab0vi.execute-api.us-east-1.amazonaws.com/Dev', {orderId});
    console.log(data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};



export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_PAY_REQUEST,
    payload: {order, paymentResult}
  });

  const {
    userSignin: {userInfo}
  } = getState();

  try{
    const {data} = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

  }
  catch(error){
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};


export const listOrderMine = () => async(dispatch, getState) => {
  dispatch({
    type: ORDER_MINE_REQUEST,
  });
  const {
    userSignin: {userInfo}
  } = getState();

  try{
    const {data} = await axios.get('/api/orders/mine', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({type: ORDER_MINE_SUCCESS, payload: data});
  }
  catch(error){
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_FAIL, payload: message });
  }

}