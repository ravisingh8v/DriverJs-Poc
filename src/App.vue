<template>
  <section class="d-flex flex-column">
    <div class="d-flex justify-content-center">
      <header-component></header-component>
    </div>
    <main id="main-container">
      <main-container></main-container>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import HeaderComponent from "./components/layout/header-component.vue";
import MainContainer from "./components/main-page/main-container.vue";
import router from "./router";
import "driver.js/dist/driver.css";
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
    console.log(toursRef);
    console.log(homeRef);
  }
  // });
});
</script>

<style lang="scss">
// App
</style>
