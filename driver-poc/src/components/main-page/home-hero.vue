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
      class="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center p-5 rounded"
    >
      <figure class="hero-brand">
        <img src="../../assets/images/logo/white.png" alt="" />
      </figure>
      <div class="my-3">
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
import { useHighlightElement, useTour } from "@/hooks/driver";
function startTour() {
  useTour();
}
</script>
<style lang="scss">
.hero-section {
  height: inherit;
  width: 100%;
  background: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);
  background-attachment: fixed;
}

.shapes {
  position: absolute;
  height: 100%;
  width: 100%;
}
.duration-7 {
  animation-duration: 7s;
}
.duration-8 {
  animation-duration: 8s;
}
.duration-9 {
  animation-duration: 9s;
}
.duration-6 {
  animation-duration: 6s;
}
// common
%shape {
  border-radius: 50%;
  background: linear-gradient(
    150deg,
    #28148346 15%,
    #8f6ed541 70%,
    #d882d938 94%
  );
  position: absolute;
}
.shape-30 {
  width: 30px;
  height: 30px;
  //   top: 60%;
  left: 15%;
  @extend %shape;
  animation-name: waterEffect;
  animation-duration: 8s;
  animation-iteration-count: infinite;
}
.shape-40 {
  width: 40px;
  height: 40px;
  //   top: 15%;
  left: 10%;
  @extend %shape;
  animation-name: waterEffect;
  animation-duration: 4.5s;
  animation-iteration-count: infinite;
}
.shape-45 {
  width: 45px;
  height: 45px;
  //   top: 0%;
  right: 0%;
  @extend %shape;
  animation-name: waterEffect;
  animation-duration: 9.5s;
  animation-iteration-count: infinite;
}
.shape-50 {
  width: 50px;
  height: 50px;
  @extend %shape;
  left: 1%;
  //   top: 3%;
  animation-name: waterEffect;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}
.shape-60 {
  width: 60px;
  height: 60px;
  @extend %shape;
  right: 20%;
  animation-name: waterEffect;
  animation-duration: 8s;
  animation-iteration-count: infinite;
}
.shape-70 {
  width: 70px;
  height: 70px;
  @extend %shape;
  right: 15%;
  animation-name: waterEffect;
  animation-duration: 9s;
  animation-iteration-count: infinite;
}
.shape-150 {
  width: 150px;
  height: 150px;
  @extend %shape;
  right: 1%;
  animation-name: waterEffect;
  // animation-duration: 6s;
  animation-iteration-count: infinite;
}

@keyframes waterEffect {
  0% {
    bottom: 0;
    opacity: 0;
  }
  //   25% {
  //     bottom: 25%;
  //   }
  //   50% {
  //     bottom: 50%;
  //   }
  //   75% {
  //     bottom: 75%;
  //   }
  100% {
    bottom: 100%;
    opacity: 1;
  }
}

.hero-brand {
  height: auto;
  width: 220px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
