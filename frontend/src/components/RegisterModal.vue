<template>
  <div>
    <transition name="fade">
      <div v-if="isVisible" class="modal-overlay">
        <transition name="popup">
          <div v-if="isVisible" class="card modal-content">
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
              <h5 class="card-title">Register</h5>
              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="InputUsername">Username</label>
                  <input
                    type="text"
                    v-model="username"
                    class="form-control"
                    placeholder="Enter username"
                  />
                </div>
                <div class="form-group">
                  <label for="InputAddress">Address</label>
                  <input
                    type="text"
                    v-model="address"
                    class="form-control"
                    placeholder="Enter address"
                  />
                </div>
                <div class="form-group">
                  <label for="InputPassword">Password</label>
                  <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions } from "vuex";
import { ApiService } from "@/data/api";

export default {
  name: "RegisterModal",
  data() {
    return {
      username: "",
      password: "",
      address: "",
      user: null,
    };
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    creatUser() {
      return {
        username: this.username,
        password: this.password,
        address: this.address,
      };
    },
    closeModal() {
      this.$emit("close");
    },

    async handleSubmit() {
      await this.userRegister(this.creatUser());

      this.closeModal();
    },
    async userRegister(user) {
      try {
        const userToLog = await ApiService.Users.Register(user);
        this.user = userToLog.data;
        await this.login(this.user);
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    ...mapActions(["login"]),
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
  justify-content: space-around;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.popup-enter,
.popup-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
