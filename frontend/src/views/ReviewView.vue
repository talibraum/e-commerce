<template>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="senderName">Sender Name</label>
          <input
            type="text"
            v-model="senderName"
            class="form-control form-control-lg"
            id="senderName"
            placeholder="Enter your name"
          />
        </div>
        <div class="form-group">
          <label for="reviewText">Review</label>
          <textarea
            v-model="description"
            class="form-control form-control-lg"
            id="reviewText"
            rows="5"
          ></textarea>
        </div>
        <div class="icon-container">
          <font-awesome-icon
            @click="handleSubmit"
            class="my-icon"
            :icon="['fas', 'paper-plane']"
          />
          <font-awesome-icon
            @click="clearDesc"
            class="my-icon"
            :icon="['fas', 'eraser']"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import { mapGetters } from "vuex";
  import { ApiService } from "@/data/api";
  export default {
    name: "ReviewView",
    computed: {
      ...mapGetters(["userId", "username"]),
    },
    data() {
      return {
        senderName: "",
        description: "",
      };
    },
    created() {
      if (this.username) {
        this.senderName = this.username;
      }
    },
    methods: {
      createReview() {
        if (this.senderName !== "" && this.description !== "") {
          return {
            sendername: this.senderName,
            description: this.description,
          };
        }
        return undefined;
      },
      async handleSubmit() {
        const review = this.createReview();
        if (review) {
          await this.sendReview(review);
        } else {
          Swal.fire({
            icon: "error",
            text: "Please fill in all fields",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      clearDesc() {
        this.description = "";
      },
      async sendReview(review) {
        try {
          await ApiService.Review.createReview(review);
          this.description = "";
          Swal.fire({
            icon: "success",
            text: "your review was sent",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch {
          Swal.fire({
            icon: "error",
            text: "Failed to send review",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  form {
    width: 80%;
    max-width: 600px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-control {
    width: 100%;
    box-sizing: border-box;
    font-size: 1.1rem;
    padding: 10px;
  }
  
  textarea {
    resize: vertical;
  }
  
  label {
    font-weight: bold;
  }
  
  .icon-container {
    display: flex;
    justify-content: center;
    gap: 20px; 
  }
  
  .my-icon {
    font-size: 2em;
    cursor: pointer;
  }
  
  .my-icon:hover {
    transform: scale(1.1);
    color: #5f0c39;
  }
  </style>
  