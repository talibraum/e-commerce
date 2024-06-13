<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <img
        class="logo-pic"
        src="https://icons.veryicon.com/png/o/miscellaneous/ios-icon-library/diamond-diamond.png"
      />
      <a class="navbar-brand" href="#">EXPENSIVE JEWELRY</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="links navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="link in links" :key="link.name" class="nav-item">
            <router-link
              class="nav-link"
              :to="link.path"
              active-class="active-link"
              exact-active-class="exact-active-link"
            >
              {{ link.name }}</router-link
            >
          </li>
        </ul>

        <form class="d-flex">
          
          <a   class="navbar-brand icon">
            <font-awesome-icon icon="shopping-cart"
          /></a>
          <a
            v-if="userId === null"
            @click="openModal()"
            class="navbar-brand icon"
            >התחבר <font-awesome-icon icon="circle-user"
          /></a>
          <a v-else class="navbar-brand icon"
            >{{ username }} <font-awesome-icon icon="circle-user"
          /></a>
        </form>
      </div>
      <LoginModal :isVisible="isModalVisible" @close="closeModal"/>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import LoginModal from "./LoginModal.vue"
import { routes } from "../router/router";
export default {
  name: "NavBar",
  data() {
    return {
      links: routes.filter((route) => route.name),
      isModalVisible: false,
    };
  },
  components: {
   LoginModal
  },
  computed: {
    ...mapGetters(["userId", "username"]),
  },
  methods: {
   
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style>
.navbar-nav .nav-link {
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.links {
  justify-content: center;
  width: 100%;
}
.icon {
  font-size: 16px;
}
.logo-pic {
  width: 2.5em;
  height: 2.5em;
}
.exact-active-link {
  color: #5f0c39 !important;
  font-size: 17px !important;
  font-weight: bold !important;
}
</style>
