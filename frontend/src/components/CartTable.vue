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
          <td @click="removeFromCart(item.product.id)">
            <font-awesome-icon icon="trash-can" />
          </td>
        </tr>
      </tbody>
    </table>
    <button
      v-if="items.length > 0"
      type="button"
      class="btn btn-danger"
      @click="createOrder"
    >
      Order Now
    </button>
    <div v-else class="empty-cart-message">
      <h1>Your cart is empty</h1>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import { ApiService } from "@/data/api";

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
        await this.getCart();
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
        await ApiService.Cart.deleteProductFromCart(this.userId, productId);
        await this.getCart();
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

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 50px;
}

.table {
  width: 80%;
  max-width: 1000px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.larger-table {
  width: 100%;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

.product-image {
  max-width: 150px;
  height: auto;
  display: block;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
}

.empty-cart-message {
  text-align: center;
  margin-top: 50px;
}

.empty-cart-message h1 {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
