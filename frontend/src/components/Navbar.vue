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
          <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button> -->
            <a class="navbar-brand icon" 
            > <font-awesome-icon icon="shopping-cart"
          /></a>
          <a class="navbar-brand icon" 
            >התחבר <font-awesome-icon icon="circle-user"
          /></a>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { routes } from "../router/index";
export default {
  name: "NavBar",
  data() {
    return {
      links: routes.filter((route) => route.name),
    };
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
