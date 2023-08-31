<template>
  <nav
    class="px-1 d-flex justify-content-between order_breadcrumb border-bottom text-secondary position-relative"
  >
    <div class="d-flex">
      <div class="text-nowrap me-0 me-md-3" id="breadcrumb-tab">
        <a
          to="/"
          class="pe-2 ps-1 d-inline-block h-100"
          :class="
            isBakery ? 'text-primary border-bottom border-3 border-primary' : ''
          "
          @click="$emit('activeComponent', 'bakery')"
          >Bakery</a
        >
        <a
          to="/"
          class="ps-2 d-inline-block h-100"
          @click="$emit('activeComponent', 'breakfast')"
          :class="
            !isBakery
              ? 'text-primary border-bottom border-3  border-primary'
              : ''
          "
          >Breakfast</a
        >
      </div>
      <!-- search  -->
      <div class="search_wrapper ms-0 ms-md-3 d-md-block d-none" ref="search">
        <BaseSearch
          id="small-screen-search"
          :clearSearchValue="clearSearchValue"
          @searchedTerm="$emit('searchedTerm', $event)"
        ></BaseSearch>
      </div>
    </div>
    <div class="card_btn">
      <button
        class="py-1 px-sm-4 px-2 btn btn-secondary d-flex align-items-center"
        @click="$emit('viewCart')"
      >
        <span class="p-2 material-symbols-outlined me-2 position-relative">
          shopping_cart
          <div
            class="position-absolute top-0 end-0 cart_item_count rounded-circle bg-danger"
          >
            {{ cartItems || 0 }}
          </div> </span
        ><span class="me-2 d-none d-sm-block">View Cart</span>
      </button>
    </div>
  </nav>
</template>
<script lang="ts">
import BaseSearch from "@/ui/BaseSearch.vue";
import { ref, watch, computed, onMounted } from "vue";
import { useOrderPageFeatureTour } from "../../hooks/useDriver";
export default {
  props: ["cartItems", "isBakery", "clearSearchValue"],
  components: { BaseSearch },
  setup() {
    // const search = ref();
    onMounted(() => {
      // setTimeout(() => {
      // if (search.value === true) {
      // const media = window.matchMedia("(min-width: 768px)");
      // media.onchange = () => {
      //   if (media.matches || window.innerWidth >= 768) {
      //     desktopMode = true;
      //   }
      //   {
      //     console.log("f");
      //   }
      // };
      // const windowWidth = ref();
      // const desktopMode = ref();
      // windowWidth.value = window.innerWidth;
      // console.log("initial", windowWidth.value);
      // window.addEventListener("resize", () => {
      //   windowWidth.value = window.innerWidth;
      // });
      // watch(
      //   windowWidth,
      //   () => {
      //     if (windowWidth.value < 768) {
      //       desktopMode.value = false;
      //     } else {
      //       desktopMode.value = true;
      //     }
      //   },
      //   { immediate: true }
      // );
      // watch(
      //   desktopMode,
      //   () => {
      //     const driveObj = useDriver(
      //       "#breadcrumb-tab",
      //       "Search Feature",
      //       "We Introduce a New search feature now you can search for your favorite product",
      //       windowWidth
      //     );
      //   },
      //   { immediate: true }
      // );
      const driveObj = useOrderPageFeatureTour();
    });
    return {
      // search,
    };
  },
};
</script>
