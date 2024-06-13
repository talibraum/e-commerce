<template>
    <div class="table-container">
      <table v-if="items.length > 0" class="table larger-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>
              <img
                :src="item.product.image"
                class="card-img-top product-image"
                alt="Product Image"
              />
            </td>
            <td>{{ item.product.name }}</td>
            <td>{{ item.product.price }}$</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.product.price * item.quantity }}$</td>
            <td @click="removeFromCart(item.product.id)"><font-awesome-icon icon="trash-can"
                /></td>
          </tr>
        </tbody>
      </table>
      <button v-if="items.length > 0" type="button" class="btn btn-danger" @click="createOrder">order now</button>
      <div v-else class="empty-cart-message">
        <h1>Your cart is empty</h1>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import { mapGetters } from "vuex";
  import { ApiService } from "@/api";
  
  export default {
    name: "CartTable",
    data() {
      return {
        items: [],
        selectedProduct: null,
        isModalVisible: false,
      };
    },
    computed: {
      ...mapGetters(["userId", "username"]),
    },
    created() {
      this.getCart();
    },
    methods: {
      async getCart() {
        try {
          const products = await ApiService.Cart.getCartOfUser(this.userId);
          this.items = products.data;
        } catch {
          Swal.fire({
            icon: "error",
            text: "Failed to load cart",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      async createOrder() {
        try {
           await ApiService.Order.createOrder(this.userId);
           Swal.fire({
            icon: "success",
            text: "Order created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getCart()
        } catch {
          Swal.fire({
            icon: "error",
            text: "Failed to create order",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      async removeFromCart(productId) {
        try {
           await ApiService.Cart.deleteProductFromCart(this.userId,productId);
          await this.getCart()
        } catch {
          Swal.fire({
            icon: "error",
            text: "Failed to remove product",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
    },
  };
  </script>
  
  <style>
  /* CSS styles for the table container */
  .table-container {
    display: flex;
    flex-direction: column; /* Ensure items are stacked vertically */
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center content vertically */
    height: 100vh; /* Adjust as needed */
    padding-top: 50px; /* Example padding to move the table up */
  }
  
  /* CSS styles for the table */
  .table {
    width: 80%; /* Adjust the width of the table */
    max-width: 1000px; /* Adjust the maximum width of the table */
    border-collapse: collapse;
    margin-bottom: 20px; /* Example margin */
    border-radius: 10px; /* Rounder border radius */
    overflow: hidden; /* Ensure rounded corners are visible */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional shadow effect */
  }
  
  .larger-table {
    width: 100%; /* Ensure the table fills its container */
  }
  
  /* Optional: Styling for table headers, rows, cells */
  .table th,
  .table td {
    padding: 12px; /* Example padding */
    text-align: left; /* Example alignment */
    border: 1px solid #ddd; /* Example border */
  }
  
  .table th {
    background-color: #f2f2f2; /* Example header background color */
  }
  
  /* CSS styles for the product image */
  .product-image {
    max-width: 150px; /* Increase maximum width of the image */
    height: auto; /* Maintain aspect ratio */
    display: block; /* Ensure inline-block spacing does not affect image */
    margin: auto; /* Center the image horizontally */
    border-radius: 8px; /* Rounder border radius */
    overflow: hidden; /* Ensure rounded corners are visible */
  }
  
  /* Styling for the empty cart message */
  .empty-cart-message {
    text-align: center; /* Center text horizontally */
    margin-top: 50px; /* Example margin top */
  }
  
  .empty-cart-message h1 {
    font-size: 5rem;
    font-weight: bold; /* Larger font size for message */
    margin-bottom: 20px; /* Example margin */
  }
  
 
  </style>
  