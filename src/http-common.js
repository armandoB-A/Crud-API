import axios from "axios";

export default axios.create({
    baseURL: "https://gorest.co.in/public/v2",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer e64e9e4b83a36f7724e00dd0e7f8088122b326406b8ae4b92dcb541b98e87605"
    }
});