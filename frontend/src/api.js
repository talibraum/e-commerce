import axiosInstance from "./axiosInstance";

const ApiService = {
    Products: {
        getProducts() {
        return axiosInstance.get('/products',);
      },
    }
}
export {ApiService}
