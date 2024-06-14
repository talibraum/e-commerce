<template>
    <div class="list-container">
      <ul class="list-group list-group-horizontal-md">
        <li class="list-group-item" v-for="item in items" :key="item.id"
        @click="selectType(item.id)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import { ApiService } from "@/data/api";
  
  export default {
    name: "TypesList",
    data() {
      return {
        items: [],
      };
    },
    created() {
      this.getTypes();
    },
    methods: {
      async getTypes() {
        try {
          const types = await ApiService.Products.getProductsTypes();
          this.items = types.data;
        } catch {
          Swal.fire({
            icon: "error",
            text: "failed to load product types",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      selectType(typeId) {
      this.$emit('selectType', typeId);
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
  </style>
  