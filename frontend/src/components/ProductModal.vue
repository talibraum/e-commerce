<template>
  <div>
    <transition name="fade">
      <div v-if="isVisible" class="modal-overlay">
        <transition name="popup">
          <div v-if="isVisible" class="card modal-content">
            <img :src="product.image" class="card-img-top" alt="..." />

            <div class="card-body">
              <button
                @click="closeModal"
                type="button"
                class="close close-button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">price: {{ product.price }}$</p>
              <p class="card-text">stock: {{ product.stock }}</p>
              <div class="for-users" v-if="userId!==null">
                <div class="qty mb-5">
                <span class="minus bg-dark" @click="decrement">-</span>
                <input
                  type="number"
                  class="count"
                  name="qty"
                  v-model.number="amountToAdd"
                />
                <span class="plus bg-dark" @click="increment(product.stock)"
                  >+</span
                >
              </div>
              <button type="button" class="btn btn-danger" @click="addToCart(product.id)">add to cart</button>
            </div>
              </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import { mapGetters } from "vuex";
  import { ApiService } from "@/api";
export default {
  name: "ProductModal",
  data() {
    return {
      amountToAdd: 1,
    };
  },
  computed: { ...mapGetters(["userId", "username"]) },
  props: {
    product: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    increment(stock) {
      if (this.amountToAdd < stock) {
        this.amountToAdd++;
      }
    },

    decrement() {
      if (this.amountToAdd > 1) {
        this.amountToAdd--;
      }
    },
    async addToCart(productId){
      try {
           await ApiService.Cart.addToCart(this.userId,productId,this.amountToAdd);
           Swal.fire({
            icon: "success",
            text: "product was added to cart",
            showConfirmButton: false,
            timer: 1500,
          });
          
        } catch {
          Swal.fire({
            icon: "error",
            text: "Failed to add to cart",
            showConfirmButton: false,
            timer: 1500,
          });
        }

    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 778;
}

.modal-content {
  background: white;
  padding: 10px;
  border-radius: 8px;
  width: 50em;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
.card {
  flex-direction: row;
}
.card-title {
  font-size: 3em;
  font-weight: bold;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.card img {
  width: 50%;
}
.card-text {
  font-size: 2em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Popup transition styles for the modal content */
.popup-enter-active,
.popup-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.popup-enter, .popup-leave-to /* .popup-leave-active in <2.1.8 */ {
  transform: scale(0.9);
  opacity: 0;
}
.qty .count {
  color: #000;
  display: inline-block;
  vertical-align: top;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  padding: 0 2px;
  min-width: 35px;
  text-align: center;
}
.qty .plus {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  color: white;
  width: 30px;
  height: 30px;
  font: 30px/1 Arial, sans-serif;
  text-align: center;
  border-radius: 50%;
}
.qty .minus {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  color: white;
  width: 30px;
  height: 30px;
  font: 30px/1 Arial, sans-serif;
  text-align: center;
  border-radius: 50%;
  background-clip: padding-box;
}
div {
  text-align: center;
}
.minus:hover {
  background-color: #717fe0 !important;
}
.plus:hover {
  background-color: #717fe0 !important;
}
/*Prevent text selection*/
span {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
input {
  border: 0;
  width: 2%;
}
nput::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input:disabled {
  background-color: white;
}
</style>
