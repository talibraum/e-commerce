<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <img
        class="logo-pic"
        src="https://icons.veryicon.com/png/o/miscellaneous/ios-icon-library/diamond-diamond.png"
        alt="Logo"
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
          <li v-for="link in filteredLinks" :key="link.name" class="nav-item">
            <router-link
              class="nav-link"
              :to="link.path"
              active-class="active-link"
              exact-active-class="exact-active-link"
            >
              <font-awesome-icon :icon="link.icon" class="navbar-icon icon" />
            </router-link>
          </li>
        </ul>

        <form class="d-flex">
          <a
            v-if="userId === null"
            @click.prevent="openLoginModal"
            class="navbar-brand icon"
          >
            התחבר <font-awesome-icon :icon="['fas', 'circle-user']" />
          </a>
          <a v-else class="navbar-brand icon" @click.prevent="openUserModal">
            {{ username }} <font-awesome-icon :icon="['fas', 'circle-user']" />
          </a>
        </form>
      </div>
      <LoginModal :isVisible="isLoginModalVisible" @close="closeLoginModal" />
      <UserModal :isVisible="isUserModalVisible" @close="closeUserModal" />

    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import LoginModal from "./LoginModal.vue";
import UserModal from "./UserModal.vue";
import { routes } from "../router/router";

export default {
  name: "NavBar",
  data() {
    return {
      links: routes,
      isLoginModalVisible: false,
      isUserModalVisible: false,

    };
  },
  components: {
    LoginModal,
    UserModal
  },
  computed: {
    ...mapGetters(["userId", "username"]),
    filteredLinks() {
      return this.links.filter(
        (link) => !link.RequiresUserLogin || this.userId !== null
      );
    },
  },
  methods: {
    openLoginModal() {
      this.isLoginModalVisible = true;
    },
    closeLoginModal() {
      this.isLoginModalVisible = false;
    },
    openUserModal() {
      this.isUserModalVisible = true;
    },
    closeUserModal() {
      this.isUserModalVisible = false;
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

.nav-item {
  margin-right: 15px; 
}

.icon {
  font-size: 16px;
}

.logo-pic {
  width: 2.5em;
  height: 2.5em;
}

.navbar-icon {
  font-size: 2em;
}

.exact-active-link {
  color: #5f0c39 !important;
  font-size: 17px !important;
  font-weight: bold !important;
}
</style>
