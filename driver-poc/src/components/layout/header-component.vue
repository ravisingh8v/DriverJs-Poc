<template>
  <header class="container d-flex justify-content-between p-0 py-4">
    <div class="d-flex">
      <figure class="d-inline">
        <div
          class="navbar-brand d-flex justify-content-center align-items-center"
        >
          <img src="../../assets/images/logo/white.png" alt="" />
        </div>
      </figure>
      <nav class="d-flex align-items-center">
        <ul class="d-flex ms-5">
          <li class="px-3 link" id="home-link">
            <a href="#" class="active">Home</a>
          </li>
          <li class="px-3 link" id="tour-link"><a href="#tours">Tours</a></li>

          <!-- dropdown link -->
          <li
            :class="arrowIcon ? '' : 'text-white'"
            id="dropdown-toggle"
            class="px-3 link position-relative d-flex align-items-center justify-content-center"
            @click.stop="toggleDropdown()"
          >
            <a href="#">Configuration</a>
            <span
              class="ps-2 fa-solid"
              :class="arrowIcon ? 'fa-caret-up' : 'fa-caret-down'"
            ></span>
            <!-- menu wrapper  -->
            <div
              v-if="arrowIcon"
              @click.stop=""
              class="position-absolute dropdown-menu mt-2 top-100 bg-light rounded overflow-hidden"
            >
              <!-- dropdown menu  -->
              <ul class="text-dark fw-semibold w-100 d-block">
                <li
                  id="background-config"
                  class="d-flex w-100 m-0 px-2 justify-content-between border-bottom border-2 border-white"
                >
                  <label for="color">Overlay Color</label>
                  <span
                    ><input
                      class="form-control form-control-color"
                      id="color"
                      type="color"
                      v-model="tourConfig.overlayColor"
                      @change="handleColorChange($event)"
                  /></span>
                </li>
                <li
                  id="exit-config"
                  class="d-flex w-100 m-0 px-2 justify-content-between border-bottom border-2 border-white"
                >
                  <label for="exittour">Allow Exit</label>
                  <span
                    ><input
                      class="form-check-input"
                      id="exittour"
                      type="checkbox"
                      name="exittour"
                      v-model="tourConfig.allowClose"
                      @click="handleAllowExitTour($event)"
                  /></span>
                </li>
                <li
                  id="interaction-config"
                  class="d-flex w-100 m-0 px-2 justify-content-between border-bottom border-2 border-white"
                >
                  <label for="confirmation">Interaction</label>
                  <span
                    ><input
                      class="form-check-input"
                      id="confirmation"
                      type="checkbox"
                      name="confirmation"
                      v-model="tourConfig.interaction"
                      @click="handleInteraction($event)"
                  /></span>
                </li>
                <li
                  id="animation-config"
                  class="d-flex w-100 m-0 px-2 justify-content-between border-bottom border-2 border-white"
                >
                  <label for="confirmation">Animation</label>
                  <span
                    ><input
                      class="form-check-input"
                      id="confirmation"
                      type="checkbox"
                      name="confirmation"
                      v-model="tourConfig.animate"
                      @click="handleAnimate($event)"
                  /></span>
                </li>
                <li
                  id="progress-config"
                  class="d-flex w-100 m-0 px-2 justify-content-between border-bottom border-white"
                >
                  <label for="steps">Show Progress</label>
                  <span
                    ><input
                      class="form-check-input"
                      id="steps"
                      type="checkbox"
                      name="steps"
                      v-model="tourConfig.showProgress"
                      @click="handleSteps($event)"
                  /></span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <div class="d-flex align-items-center">
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
  </header>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useChangeConfiguration, useConfigurationTour } from "@/hooks/driver";
import ConfigurationService from "@/service/http.service";
// Drop Down Arrow icon
const arrowIcon = ref(false);
console.log("instance");
function toggleDropdown() {
  const elemRef = document.getElementById("dropdown-toggle");
  arrowIcon.value = !arrowIcon.value;
  if (arrowIcon.value) {
    // setTimeout(() => {
    useConfigurationTour();
    // }, 500);
  }
}
// close  dropdown on documents click
// const popoverRef = ref();
document.addEventListener("click", () => {
  // popoverRef.value = document.getElementById("driver-popover-content");
  // popoverRef.value?.addEventListener("click", (event: any) => {
  //   event?.stopPropagation();
  //   console.log("popover");
  // });
  arrowIcon.value = false;
});

// onMounted(() => {
// });

// Handling Input Events

async function handleColorChange(event: any) {
  const color = event.target.value;
  ConfigurationService.setConfig({
    ...tourConfig.value,
    overlayColor: color,
  }).then(() => {
    getConfig();
  });
}

function handleAllowExitTour(event: any) {
  const allowClose = event.target.checked;
  ConfigurationService.setConfig({
    ...tourConfig.value,
    allowClose: allowClose,
  }).then(() => {
    getConfig();
  });
  // write code here
}
function handleAnimate(event: any) {
  const animate = event.target.checked;
  ConfigurationService.setConfig({
    ...tourConfig.value,
    animate: animate,
  }).then(() => {
    getConfig();
  });
  // write code here
}
function handleInteraction(event: any) {
  const interaction = event.target.checked;
  ConfigurationService.setConfig({
    ...tourConfig.value,
    interaction: interaction,
  }).then(() => {
    getConfig();
  });
  // write code here
}
function handleSteps(event: any) {
  const showProgress = event.target.checked;
  ConfigurationService.setConfig({
    ...tourConfig.value,
    showProgress: showProgress,
  }).then(() => {
    getConfig();
  });
  // write code here
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
<style lang="scss">
header {
  z-index: 100;
  position: absolute;
  width: 100%;
  top: 0;
}
figure {
  margin: unset !important;
  .navbar-brand {
    height: 35px;
    width: 110px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}
nav li {
  margin-inline: 10px;
}
.active {
  color: rgba(175, 173, 173, 0.918);
}
.dropdown-menu {
  width: 150%;
  #color {
    width: 20px;
    height: 20px;
    padding: 2px;
  }
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
  li {
    padding-block: 10px;
  }
}
</style>
