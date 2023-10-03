<template>
  <RouterView></RouterView>
  <!-- <master></master> -->
  <!-- <section class="d-flex flex-column" id="app-wrapper">
    <div class="d-flex justify-content-center">
      <header-component @handleSidebar="handleSidebar"></header-component>
    </div>
    <teleport to="body">
      <Transition name="sidebar" mode="default">
        <div
          v-if="isSidebarOpen"
          class="position-fixed sidebar-wrapper top-0 bottom-0 start-0 end-0 h-100 bg-transparent"
        >
          <div
            class="overlay h-100 w-100 position-absolute bg-dark opacity-50"
            ref="overlay"
            @click="closeSidebar"
          ></div>
          <sidebar-component @closeSidebar="closeSidebar"></sidebar-component>
        </div>
      </Transition>
    </teleport>
    <main id="main-container">
      <main-container></main-container>
    </main>
  </section> -->
</template>

<script lang="ts" setup>
import "driver.js/dist/driver.css";
import master from "./components/master/master-component.vue";
// import { onMounted, watch, ref, computed } from "vue";
// import HeaderComponent from "./components/layout/header-component.vue";
// import MainContainer from "./components/main-page/main-container.vue";
// import router from "./router";
// import SidebarComponent from "./components/layout/sidebar-component.vue";
// import { useStore } from "vuex";
// import { usePersonalDetailsFormTour } from "./hooks/driver";
// import ConfigurationService from "./service/http.service";

// const store = useStore();
// const isSidebarOpen = ref(false);

// // to open sidebar
// function handleSidebar() {
//   isSidebarOpen.value = true;
// }
// // to close sidebar
// function closeSidebar() {
//   isSidebarOpen.value = false;
//   store.dispatch("setIsSidebarOpen", false);
// }

// // to get the tour toggle sidebar value
// const getIsSidebarOpen = computed(() => {
//   return store.getters["isSidebarOpen"];
// });

// // setting that store(vuex) value to the variable
// watch(getIsSidebarOpen, () => {
//   isSidebarOpen.value = getIsSidebarOpen.value;
// });

// // Get and set the route when the element is visible
// const options = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.8,
// };

// const sectionObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       const sectionId = entry.target.id;
//       if (sectionId != "form-action") {
//         router.push({ path: "/" + sectionId });
//       }
//       if (sectionId == "form-action") {
//         const contactUsTour = usePersonalDetailsFormTour();
//       }
//     }
//   });
// }, options);

// onMounted(() => {
//   const homeRef = document.getElementById("hero");
//   const toursRef = document.getElementById("tours");
//   const contactRef = document.getElementById("contact");
//   const formActionRef = document.getElementById("form-action");

//   if (toursRef && homeRef && contactRef && formActionRef) {
//     sectionObserver.observe(homeRef);
//     sectionObserver.observe(toursRef);
//     sectionObserver.observe(contactRef);
//     sectionObserver.observe(formActionRef);
//   }
// });

// // ConfigurationService.getConfig();
//
</script>

//
<style lang="scss">
// // App
//
</style>
