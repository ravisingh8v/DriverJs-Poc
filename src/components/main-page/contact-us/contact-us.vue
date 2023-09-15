<template>
  <div class="container text-dark pt-4" id="contact-us">
    <div class="header">
      <h2 class="section-headings" id="contact">CONTACT</h2>
    </div>
    <form class="stepper-form border mt-4 card bg-light">
      <div class="mb-4 row gx-0">
        <div class="p-1 col-6 primary-bg rounded-start"></div>
        <div
          class="p-1 col-6 rounded-end"
          :class="stepCount == 2 && 'primary-bg'"
        ></div>
      </div>
      <!-- Active Title  -->
      <div class="p-4">
        <div class="col-12">
          <h4 class="text-center text-uppercase">
            {{ stepCount > 1 ? "Query Details" : "Personal Details" }}
          </h4>
        </div>
        <!-- active step form  -->
        <Transition name="stepper" mode="out-in">
          <KeepAlive>
            <component :is="activeComponent"></component>
          </KeepAlive>
        </Transition>

        <!-- actions  -->
        <div class="row mt-4" id="form-action">
          <div class="col-6 d-flex justify-content-end">
            <button
              type="button"
              id="form-prev"
              class="btn-gradient bg-secondary"
              :class="stepCount == 1 && 'opacity-50'"
              @click="onPrevStep"
            >
              Previous
            </button>
          </div>
          <div class="col-6 d-flex">
            <button
              type="button"
              id="form-next"
              class="btn-gradient"
              @click="onNextStep"
            >
              {{ stepCount == 2 ? "Submit" : "Next" }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef, ref } from "vue";
import personalDetails from "./component/personal-details.vue";
import queryDetails from "./component/query-details.vue";
import { useQueryDetailsFormTour } from "@/hooks/driver";

const activeComponent = shallowRef(personalDetails);
const stepCount = ref(1);
function onNextStep() {
  if (stepCount.value < 2) {
    stepCount.value++;
  }
  if (stepCount.value == 2) {
    activeComponent.value = queryDetails;
    setTimeout(() => {
      useQueryDetailsFormTour();
    }, 400);
  }
}

function onPrevStep() {
  stepCount.value > 1 && stepCount.value--;
  if (stepCount.value == 1) {
    activeComponent.value = personalDetails;
  }
}
</script>
<style lang="scss">
.stepper-enter-from,
.stepper-leave-to {
  opacity: 0;
}
.stepper-enter-to,
.stepper-leave-from {
  opacity: 1;
}
.stepper-enter-active,
.stepper-leave-active {
  transition: all 0.25s ease-in-out;
}
</style>
