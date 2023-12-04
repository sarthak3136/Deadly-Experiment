import axios from "../Axios";
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_SUCCESS 

} from "../constants/ProductConstants";

export const listProducts = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST 
    });

    try{
        //const {data} = await axios.get("/api/products");
        const products = await axios.get("https://od1s6mm4t4.execute-api.us-east-1.amazonaws.com/Dev")
        console.log(products)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: products.data.body
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}



export const detailsProduct = (productID) => async (dispatch) =>{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productID
    });

    try{
        //const {data} = await axios.get(`/api/products/${productID}`);
        const data = await axios.post("https://p0eeuk4p2a.execute-api.us-east-1.amazonaws.com/Dev", {productID: productID})
   
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data.body
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};