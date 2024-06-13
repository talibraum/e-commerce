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
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import { mapGetters } from "vuex";
  import { ApiService } from "@/api";
import OrderCard from '../components/OrderCard.vue'
export default {
  data() {
      return {
        items: [],
      };
    },
  name: "CartView",
  components: {
    OrderCard
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
      }}
};

</script>


