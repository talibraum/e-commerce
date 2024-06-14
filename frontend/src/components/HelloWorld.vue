<template>
  <div class="hello">
    <a
      v-if="selectedColor || selectedType"
      class="navbar-brand"
      @click="clearFilter"
    >
      <font-awesome-icon :icon="['fas', 'undo']" />
    </a>
    <div class="d-flex justify-content-center">
      <ColorList @selectColor="selectColor" class="mr-3" />
      <TypesList @selectType="selectType" class="ml-3" />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <ProductCard
          v-for="item in filteredItems"
          :key="item.name"
          :name="item.name"
          :image="item.image"
          :price="item.price"
          @open="openModal(item)"
          class="col-md-4"
        />
      </div>
    </div>
    <ProductModal
      :product="selectedProduct"
      :isVisible="isModalVisible"
      @close="closeModal"
    />
    <div v-if="items.length > 0 && filteredItems.length === 0" class="empty-cart-message">
      <h1>Product not found</h1>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import TypesList from "./TypesList.vue";
import ColorList from "./ColorsList.vue";
import ProductModal from "./ProductModal.vue";
import ProductCard from "./ProductCard.vue";
import { ApiService } from "@/data/api";

export default {
  name: "HelloWorld",
  data() {
    return {
      items: [],
      selectedProduct: null,
      isModalVisible: false,
      selectedType: null,
      selectedColor: null,
    };
  },
  components: {
    ProductCard,
    ProductModal,
    TypesList,
    ColorList,
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const products = await ApiService.Products.getProducts();
        this.items = products.data;
      } catch {
        Swal.fire({
          icon: "error",
          text: "Failed to load products",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    openModal(product) {
      this.selectedProduct = product;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    selectType(typeId) {
      this.selectedType = typeId;
    },
    selectColor(colorId) {
      this.selectedColor = colorId;
    },
    clearFilter() {
      this.selectedType = null;
      this.selectedColor = null;
    },
  },
  computed: {
    filteredItems() {
      if (!this.selectedType && !this.selectedColor) {
        return this.items;
      }
      if (this.selectedType && !this.selectedColor) {
        return this.items.filter((item) => item.type.id === this.selectedType);
      }
      if (!this.selectedType && this.selectedColor) {
        return this.items.filter((item) => item.color.id === this.selectedColor);
      }
      return this.items.filter((item) => {
        return (
          item.color.id === this.selectedColor &&
          item.type.id === this.selectedType
        );
      });
    },
  },
};
</script>

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
  justify-content: center;
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
