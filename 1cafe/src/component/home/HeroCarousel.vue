<template>
  <div
    class="cp hero_carousel bg-secondary position-relative d-flex justify-content-center text-white"
    :class="navigateTo"
  >
    <!-- transition the items  -->
    <Transition mode="out-in" name="carousel">
      <!-- Static carousel Data -->
      <div
        class="p-sm-3 p-2 item_1 w-100 d-flex justify-content-center"
        v-if="firstSlide"
      >
        <div class="">
          Daily Deal <span class="mx-sm-3 mx-1">|</span> Coffee & Pastry $3.99
        </div>
      </div>
      <div
        class="p-sm-3 p-2 item_2 w-100 d-flex justify-content-center"
        v-else-if="secondSlide"
      >
        Weekend Brunch <span class="mx-3">|</span> Saturday 9am - 2pm
      </div>
    </Transition>
    <!-- action buttons  -->
    <a class="prev" @click="prev(count)">&lt;</a>
    <a class="next" @click="next(count)">&gt;</a>
  </div>
</template>
<script lang="ts">
import { ref, watch } from "vue";
export default {
  setup() {
    // data
    const count = ref(1);
    const firstSlide = ref();
    const secondSlide = ref();
    const thirdSlide = ref();

    watch(
      count,
      () => {
        if (count.value === 1) {
          firstSlide.value = true;
          secondSlide.value = false;
        } else if (count.value === 2) {
          secondSlide.value = true;
          firstSlide.value = false;
        }
      },
      { immediate: true }
    );
    // auto movement
    // eslint-disable-next-line
    const setInt = setInterval(() => {
      if (count.value == 2) {
        count.value = 1;
      } else {
        count.value = 2;
      }
    }, 5000);

    // function
    // previous slide
    const navigateTo = ref();
    function prev(value: number) {
      navigateTo.value = "prev";
      if (count.value > 1) {
        count.value = value - 1;
      } else {
        count.value = 2;
      }
      setTimeout(() => {
        navigateTo.value = "";
      }, 1000);
    }
    // next slide
    function next(value: number) {
      navigateTo.value = "next";
      if (count.value < 2) {
        count.value = value + 1;
      } else {
        count.value = 1;
      }
    }

    return {
      count,
      prev,
      next,
      firstSlide,
      secondSlide,
      thirdSlide,
      navigateTo,
    };
  },
};
</script>
<style lang="scss">
// normal when setTimeout call
.carousel-enter-from {
  opacity: 0;
  transform: translateX(480px);
}

// when click to prev button
.prev .carousel-enter-from {
  opacity: 0;
  transform: translateX(-480px);
}
// when click to next button
.next .carousel-enter-from {
  opacity: 0;
  transform: translateX(480px);
}

// active transition
.carousel-enter-active {
  transition: all 0.5s ease-out;
}
.carousel-leave-active {
  transition: all 0.5s ease-in;
}
// enter to and leave from
.carousel-enter-to,
.carousel-leave-from {
  opacity: 1;
  background-color: unset;
  transform: translateX(0px);
}

// when setTImeout call
.carousel-leave-to {
  opacity: 0;
  transform: translateX(-480px);
}

// when next button clicked
.next .carousel-leave-to {
  opacity: 0;
  transform: translateX(-480px);
}

// when prev button clicked
.prev .carousel-leave-to {
  opacity: 0;
  transform: translateX(480px);
  // background-color: rgba(255, 255, 255, 0.863);
}
</style>
