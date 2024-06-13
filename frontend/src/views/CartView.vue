<template>
  <div class="cart">
    <CartTable/>
  </div>
</template>

<script>
import CartTable from '../components/CartTable.vue'
export default {
  name: "CartView",
  components: {
    CartTable,
  },
};
</script>
