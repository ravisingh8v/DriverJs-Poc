<template>
  <div class="text-dark p-2">
    <div>
      <RouterLink to="../" class="btn btn-secondary">Back</RouterLink>
    </div>
    <!-- this id for highlight whole section  -->

    <div class="mt-5" id="dragItem">
      <div class="d-flex justify-content-between mx-3">
        <h2>TODO</h2>
        <h2>DONE</h2>
      </div>
      <div class="row gx-0">
        <div class="col-6">
          <div
            class="h-100 border rounded p-3 list-container mx-3 overflow-visible"
          >
            <draggable
              v-model="myArray"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="1"
              animation="200"
              class="h-100"
            >
              <template #item="{ element, index }">
                <div
                  class="border m-2 p-2 bg-light rounded"
                  :class="'animateTheDnd' + index"
                  :id="'dragItem' + index"
                >
                  {{ index + 1 }} : {{ element }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
        <div class="col-6">
          <div class="h-100 border rounded p-3 list-container mx-3">
            <draggable
              v-model="yourArray"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="2"
              animation="200"
              class="h-100"
            >
              <template #item="{ element, index }">
                <div
                  class="border m-2 p-2 bg-success rounded bg-opacity-75 text-white"
                >
                  {{ index + 1 }} : {{ element }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import draggable from "vuedraggable";
import { useDndTour } from "./../../hooks/driver";
const myArray = ref(["hello", "how", "are", "you"]);
const yourArray = ref(["I", "am", "fine", "thank you"]);
const drag: Boolean = false;

onMounted(() => {
  setTimeout(() => {
    useDndTour();
  }, 1000);
});

// onUnmounted(() => {
//   console.log("hello");
//   useDndTour(true);
// });
</script>
<style lang="scss">
// .dashed {
//   border: 2px dashed $secondary;
// }
#dragItem0 {
  transition: all 1.5s linear;
  // transform: translateZ(40px);
}
.list-container {
  user-select: none;
}
// ==============this css if we want to highlight whole section================
.driver-active-element.dndTourActive .animateTheDnd0 {
  animation: drag 2s linear;
  animation-delay: 0.5s;
}
@keyframes drag {
  0% {
    transform: translate(0%, 0%);
    // transform: scale(2);
    // transform: translateZ(-0[px]);
  }
  50% {
    transform: translate(20%, 25%);
  }
  100% {
    transform: translateX(0%, 0%);
    // transform: scale(1);
    // transform: translateZ(-100px);
  }
}

// :not(body):has(> .driver-active-element) {
//   overflow: visible !important;
// }
// // ================this css if we want to highlight only drag element================
// .driver-active-element.animateTheDnd0 {
//   animation: drag 2s linear;
// }
// @keyframes drag {
//   0% {
//     transform: translate(0%, 0%);
//     // transform: scale(2);
//     // transform: translateZ(-0[px]);
//   }
//   50% {
//     transform: translate(15%, 0%);
//   }
//   100% {
//     transform: translateX(0%, 0%);
//     // transform: scale(1);
//     // transform: translateZ(-100px);
//   }
// }
</style>
