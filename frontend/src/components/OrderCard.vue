<template>
  <div class="card">
    <div class="card-block">
      <h4 class="card-title">Order {{ order.id }}#</h4>
      <h6 class="card-subtitle text-muted">{{ order.orderDate }}</h6>
      <table  class="table larger-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.name">
            <td>{{ item.product.name }}</td>
            <td>{{ item.product.price }}$</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.product.price * item.quantity }}$</td>
          </tr>
        </tbody>
      </table>
      <p class="card-text p-y-1">total :{{order.total}}$</p>
      <p class="card-text p-y-1">status:{{order.status.status}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 300px;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  padding: 20px;
}

.card-block {
  padding: 15px;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.card-subtitle {
  font-size: 1em;
  margin-bottom: 1em;
}

.card-text {
  font-size: 0.9em;
  margin-bottom: 1em;
}

.card-link {
  color: #007bff;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}
</style>
