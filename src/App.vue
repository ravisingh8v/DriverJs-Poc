<template>
  <section class="d-flex flex-column" id="app-wrapper">
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
  </section>
</template>

<script lang="ts" setup>
import { inject, onMounted, watch, ref, computed } from "vue";
import HeaderComponent from "./components/layout/header-component.vue";
import MainContainer from "./components/main-page/main-container.vue";
import router from "./router";
import "driver.js/dist/driver.css";
import SidebarComponent from "./components/layout/sidebar-component.vue";
import { useStore } from "vuex";

const store = useStore();
const isSidebarOpen = ref(false);

// to open sidebar
function handleSidebar() {
  isSidebarOpen.value = true;
}
// to close sidebar
function closeSidebar() {
  isSidebarOpen.value = false;
  console.log("called");
  store.dispatch("setIsSidebarOpen", false);
}

// to get the tour toggle sidebar value
const getIsSidebarOpen = computed(() => {
  return store.getters["isSidebarOpen"];
});

// setting that store(vuex) value to the variable
watch(getIsSidebarOpen, () => {
  isSidebarOpen.value = getIsSidebarOpen.value;
});

// // backdrop click of sidebar
// const overlay = ref();
// watch(
//   overlay,
//   () => {
//     overlay.value?.addEventListener("click", () => {
//       isSidebarOpen.value = false;
//       store.dispatch("setIsSidebarOpen", false);
//     });
//   },
//   { immediate: true }
// );

// const props = defineEmits({ isSidebarOpen });
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Element is considered in view when 50% visible
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      // this.$router.push({ path: "/" + sectionId });
      router.push({ path: "/" + sectionId });
    }
  });
}, options);

onMounted(() => {
  const homeRef = document.getElementById("hero");
  const toursRef = document.getElementById("tours");
  // watch(toursRef, () => {
  if (toursRef && homeRef) {
    sectionObserver.observe(homeRef);
    sectionObserver.observe(toursRef);
  }
  // });
});
</script>

<style lang="scss">
// App
</style>
