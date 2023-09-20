<template>
  <li
    :class="
      isSidebar
        ? 'p-3 border-bottom text-dark justify-content-between'
        : 'text-white justify-content-center'
    "
    :id="isSidebar ? 'sidebar-dropdown' : 'dropdown-toggle'"
    class="px-3 link position-relative d-flex align-items-center"
    @click.stop="toggleDropdown()"
  >
    <!-- id="dropdown-toggle" -->
    <a>Configuration</a>
    <span
      class="ps-2 fa-solid"
      :class="arrowIcon ? 'fa-caret-up' : 'fa-caret-down'"
    ></span>
    <!-- menu wrapper  -->
    <Transition name="dropdown">
      <div
        v-if="arrowIcon"
        @click.stop=""
        class="position-absolute mt-2 top-100 bg-light rounded overflow-hidden dropdown-menu shadow"
        :class="isSidebar ? 'start-30 end-0' : 'w-150'"
      >
        <!-- dropdown menu  -->
        <ul class="text-dark fw-semibold w-100 d-block user-select-none">
          <li
            id="background-config"
            class="d-flex m-0 px-2 justify-content-between border-bottom border-2 border-white"
          >
            <label for="color" class="flex-grow-1 cursor-pointer"
              >Overlay Color</label
            >
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
            class="d-flex m-0 px-2 justify-content-between border-bottom border-2 border-white"
          >
            <label class="flex-grow-1 cursor-pointer" for="exittour"
              >Allow Exit</label
            >
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
            class="d-flex m-0 px-2 justify-content-between border-bottom border-2 border-white"
          >
            <label class="flex-grow-1 cursor-pointer" for="confirmation"
              >Interaction</label
            >
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
            class="d-flex m-0 px-2 justify-content-between border-bottom border-2 border-white"
          >
            <label class="flex-grow-1 cursor-pointer" for="confirmation"
              >Animation</label
            >
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
            class="d-flex m-0 px-2 justify-content-between border-bottom border-white"
          >
            <label class="flex-grow-1 cursor-pointer" for="steps"
              >Show Progress</label
            >
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
    </Transition>
  </li>
</template>
<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";
import {
  useChangeConfiguration,
  useConfigurationTour,
} from "../../hooks/driver";
import ConfigurationService from "../../service/http.service";

const props = defineProps(["isSidebar"]);

// Drop Down Arrow icon
const arrowIcon = ref(false);

function toggleDropdown() {
  arrowIcon.value = !arrowIcon.value;
  if (arrowIcon.value) {
    useConfigurationTour(true);
  } else {
    useConfigurationTour(false);
  }
}
onMounted(() => {
  const elemRef = document.getElementById("main-container");
  if (elemRef)
    elemRef.addEventListener("click", () => {
      arrowIcon.value = false;
    });
});

// Handling Input Events

async function handleColorChange(event: any) {
  const color = event.target.value;
  ConfigurationService.setConfig({
    ...tourConfig.value,
    overlayColor: color,
  }).then((res) => {
    console.log('work')
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
<style lang="scss">
.dropdown-enter-from,
.dropdown-leave-to {
  // transform: scaleY(0.5);
  // z-index: 1;
  // height: 0%;
  opacity: 0.2;
}
.dropdown-enter-to,
.dropdown-leave-from {
  // height: unset;
  opacity: 1;
}
.dropdown-enter-active {
  transition: all 0.15s linear;
}
.dropdown-leave-active {
  transition: all 0.15s linear;
}
</style>
