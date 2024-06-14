<template>
  <div class="order">
    <div class="container">
      <div class="row justify-content-center">
        <OrderCard
          v-for="item in items"
          :key="item.name"
          :order="item"
          class="col-md-4 mt-3"
        />
      </div>
    </div>
    <div v-if="items.length===0" class="empty-cart-message">
      <h1>no orders yet</h1>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import { ApiService } from "@/data/api";
import OrderCard from "../components/OrderCard.vue";
export default {
  data() {
    return {
      items: [],
    };
  },
  name: "CartView",
  components: {
    OrderCard,
  },
  computed: {
    ...mapGetters(["userId", "username"]),
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        const orders = await ApiService.Order.getOrdersOfUser(this.userId);
        this.items = orders.data;
      } catch {
        Swal.fire({
          icon: "error",
          text: "Failed to load orders",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>

<style>
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

