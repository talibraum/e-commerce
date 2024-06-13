import axiosInstance from "./axiosInstance";

const ApiService = {
    Products: {
        getProducts() {
        return axiosInstance.get('/products');
      },
    },
    Users:{
        loginUser(username,password){
            return axiosInstance.get(`/users/login/${username}/password/${password}`);
        },
        Register(user){
            return axiosInstance.post(`/users`,user);
        }
    }
}
export {ApiService}
