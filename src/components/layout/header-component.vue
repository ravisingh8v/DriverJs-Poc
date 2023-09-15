<template>
  <header
    class="container d-flex justify-content-between py-4 align-items-center px-3 px-sm-0"
  >
    <div class="d-flex">
      <figure class="d-inline">
        <div
          class="navbar-brand d-flex justify-content-center align-items-center"
        >
          <img src="../../assets/images/logo/white.png" alt="" />
        </div>
      </figure>
      <nav class="d-lg-flex align-items-center d-none">
        <ul class="d-flex ms-5">
          <li class="px-3 link" id="home-link">
            <a href="#" class="active">Home</a>
          </li>
          <li class="px-3 link" id="tour-link"><a href="#tours">Tours</a></li>
          <ConfigurationDropdown :isSidebar="false"></ConfigurationDropdown>
          <li class="px-3 link" id="nav-contact">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="d-lg-flex d-none align-items-center">
      <div id="socials-wrapper" class="socials d-flex me-5">
        <div class="px-2">
          <i class="fs-5 link fa-brands fa-square-facebook"></i>
        </div>
        <div class="px-2">
          <i class="fs-5 link fa-brands fa-square-x-twitter"></i>
        </div>
        <div class="px-2">
          <i class="fs-5 link fa-brands fa-square-github"></i>
        </div>
      </div>
      <div>
        <button class="btn btn-light fw-semibold">Sign-In</button>
      </div>
    </div>
    <div class="hamburger link" id="sidebar-hamburger">
      <span class="fa-solid fa-bars fs-3" @click="openSidebar"></span>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useChangeConfiguration } from "@/hooks/driver";
import ConfigurationService from "@/service/http.service";
import ConfigurationDropdown from "../ui/configuration-dropdown.vue";
// Drop Down Arrow icon

const isSidebarOpen = ref(false);

const $emits = defineEmits();
function openSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  $emits("handleSidebar");
}

const tourConfig = ref();
function getConfig() {
  ConfigurationService.getConfig().then((res) => {
    tourConfig.value = { ...res };
    useChangeConfiguration({ ...res });
  });
}
getConfig();
</script>

<!-- style  -->
<style lang="scss"></style>
