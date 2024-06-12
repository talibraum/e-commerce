<template>
  <div class="hello">
    <div class="container">
      <div class="row justify-content-center">
          <ProductCard v-for="item in items" :key="item.name"  :name="item.name" :image="item.image" class="col-md-4" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import { ApiService } from "@/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      items: [],
    };
  },
  components: {
    ProductCard,
  },
  created() {
     this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const tagsResponse = await ApiService.Products.getProducts();
        this.items = tagsResponse.data;
      } catch {
        alert("לא עבד");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ProductCard {
  display: inline-block;
  /* margin: 40px 0 0;  */
  justify-content: center;
}
</style>
