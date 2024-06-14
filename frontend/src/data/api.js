import axiosInstance from "./axiosInstance";

const ApiService = {
  Products: {
    getProducts() {
      return axiosInstance.get("/products");
    },
    getProductsTypes() {
      return axiosInstance.get("/products/types");
    },
    getProductsColors() {
        return axiosInstance.get("/products/colors");
      },
  },
  Users: {
    loginUser(username, password) {
      return axiosInstance.get(`/users/login/${username}/password/${password}`);
    },
    Register(user) {
      return axiosInstance.post(`/users`, user);
    },
  },
  Cart: {
    getCartOfUser(userId) {
      return axiosInstance.get(`/cart/${userId}`);
    },
    addToCart(userId, productId, amount) {
      return axiosInstance.post(
        `/cart/user/${userId}/product/${productId}/${amount}`
      );
    },
    deleteProductFromCart(userId, productId) {
      return axiosInstance.delete(`/cart/user/${userId}/product/${productId}`);
    },
  },
  Order: {
    createOrder(userId) {
      return axiosInstance.post(`/order/${userId}`);
    },
    getOrdersOfUser(userId) {
      return axiosInstance.get(`/order/${userId}`);
    },
  },
};
export { ApiService };
