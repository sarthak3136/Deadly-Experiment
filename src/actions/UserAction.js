import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/UserConstant"
import axios from "../Axios"



export const register = (name,email,password) => async(dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {email, password}
    });
    try{
        //const {data} = await axios.post('/api/users/register', {name,email, password});
        //const {data} = await axios.post("https://elwoywpvwjozlbfelbfbwmqbbm0vlliw.lambda-url.us-east-1.on.aws/", {name, email, password});
        const {data} = await axios.post("https://s50snmv0f7.execute-api.us-east-1.amazonaws.com/Dev/Signup", {name, email, password});
        console.log(data)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}






export const signin = (email,password) => async(dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {email, password}
    });
    try{
        //const {data} = await axios.post('/api/users/signin', {email, password});
        // const {data} = await axios.post("https://avsfly2lhbct3fxq4hs65xeeem0wveqh.lambda-url.us-east-1.on.aws/", {email, password})
        const {data} = await axios.post('https://s50snmv0f7.execute-api.us-east-1.amazonaws.com/Dev/Login', {email, password})
        console.log(data)
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data.body
        });
        localStorage.setItem('userInfo', JSON.stringify(data.body));
    }
    catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}




export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_SIGNOUT
    });
}


export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // const { data } = await axios.get(`/api/users/${userId}`, {
    //   headers: { Authorization: `Bearer ${userInfo?.token}` },
    // });

    const { data } = await axios.post('https://s50snmv0f7.execute-api.us-east-1.amazonaws.com/Dev/UserById', {userId})
    console.log(data)
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
