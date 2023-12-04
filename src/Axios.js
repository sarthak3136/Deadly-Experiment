import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8000/"
    //baseURL: "https://amazon-be-7evd.onrender.com"
})

export default instance
