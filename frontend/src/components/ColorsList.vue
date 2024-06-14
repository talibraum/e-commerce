<template>
    <div class="list-container">
      <ul class="list-group list-group-horizontal-md">
        <li class="list-group-item" v-for="item in items" :key="item.id"
        @click="selectColor(item.id)"
        :class="{ 'selectedColor': item.id===selectedColor }">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import { ApiService } from "@/data/api";
  
  export default {
    name: "ColorList",
    data() {
      return {
        items: [],
      };
    },
    props:['selectedColor'],
    created() {
      this.getColors();
    },
    methods: {
      async getColors() {
        try {
          const colors = await ApiService.Products.getProductsColors();
          this.items = colors.data;
        } catch {
          Swal.fire({
            icon: "error",
            text: "failed to load product colors",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      selectColor(colorId) {
      this.$emit('selectColor', colorId);
    },
    },
  };
  </script>
  
  <style scoped>
  .list-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .list-group-horizontal-md {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
  }
  
  .list-group-item {
    margin: 0 10px;
    transition: transform 0.2s;
  }
  
  .list-group-item:hover {
    transform: scale(1.1);
  }
  .selectedColor{
    background-color: #5f0c39 !important;
    color: #ffffff;
  font-size: 17px !important;
  }
  </style>
  