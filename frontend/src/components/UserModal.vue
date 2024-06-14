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
              <h5 class="card-title">{{ username }}</h5>

              <button class="btn btn-primary" @click="logoutUser">
                Logout
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["userId", "username"]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async logoutUser() {
      this.closeModal();

      await this.logout();
    },
    ...mapActions(["logout"]),
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
.dont-have-account:hover {
  text-decoration: underline;
}
</style>
