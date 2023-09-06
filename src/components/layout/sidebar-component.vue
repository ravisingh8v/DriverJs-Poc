<template>
  <section
    class="sidebar position-absolute end-0 top-0 bg-light text-dark h-100"
  >
    <div class="d-flex flex-column justify-content-between h-100">
      <!-- navigation -->
      <div>
        <!-- back to page -->
        <div class="d-flex align-items-center p-2">
          <span
            class="fs-5 fa-solid fa-arrow-left link"
            @click="$emit('closeSidebar')"
          >
          </span>
        </div>
        <nav class="mt-3">
          <ul class="m-0 d-flex flex-column">
            <li class="p-3 border-bottom active" id="sidebar-home">Home</li>
            <li class="p-3 border-bottom" id="sidebar-tour">Tour</li>
            <ConfigurationDropdown :isSidebar="true"></ConfigurationDropdown>
          </ul>
        </nav>
      </div>

      <div class="sidebar-bottom p-2">
        <div class="authentication-wrapper p-3 border rounded">
          <div class="d-flex align-items-center">
            <!-- pic  -->
            <div class="profile-pic-wrapper">
              <span class="fa-solid fa-user text-white"> </span>
            </div>
            <div class="d-flex flex-column ms-2">
              <div>Guest</div>
            </div>
          </div>
        </div>
        <div class="mt-1 w-100">
          <button class="btn-gradient px-0 py-1 w-100 text-center rounded">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import ConfigurationDropdown from "../ui/configuration-dropdown.vue";
</script>
<style lang="scss">
.profile-pic-wrapper {
  height: 40px;
  width: 40px;
  overflow: hidden;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
