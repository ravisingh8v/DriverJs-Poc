<template>
  <section class="hero-section position-absolute top-0">
    <div class="shapes">
      <div class="shape-30"></div>
      <div class="shape-40"></div>
      <div class="shape-45"></div>
      <div class="shape-50"></div>
      <div class="shape-50"></div>
      <div class="shape-60"></div>
      <div class="shape-70"></div>
      <div class="shape-75"></div>
      <div class="shape-75"></div>
      <div class="shape-30 end-25"></div>
      <div class="shape-150 start-0 duration-8"></div>
      <div class="shape-150 duration-6"></div>
    </div>
    <div
      class="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center p-5 rounded w-100"
    >
      <figure class="hero-brand">
        <img src="../../assets/images/logo/white.png" alt="" />
      </figure>
      <div class="my-3 text-center">
        <span class="fs-4">A beautiful Configuration System for DriverJs.</span>
      </div>
      <div class="my-2">
        <button
          id="startTourBtn"
          type="button"
          class="btn btn-light fw-semibold fs-5 text-dark"
          @click="startTour()"
        >
          Start Tour ✈
        </button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useHighlightElement, useTour, useMobileTour } from "@/hooks/driver";
import service from "./../../service/http.service";
function startTour() {
  // service.getConfig();
  const width = document.documentElement.clientWidth;
  if (width >= 992) {
    useTour();
  } else {
    useMobileTour();
  }
}
</script>
<style lang="scss"></style>
