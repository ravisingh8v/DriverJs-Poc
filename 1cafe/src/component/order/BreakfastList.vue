<template>
  <section class="">
    <h3 class="fs-3">Breakfast</h3>
    <div class="row mt-3 gx-5 gy-5">
      <BaseProductItem
        v-for="(breakfast, index) in allBreakfastProduct"
        :key="index"
        :product="breakfast"
        @getDetails="$emit('getDetails', $event)"
      ></BaseProductItem>
      <BaseItemNotFound
        :product="allBreakfastProduct"
        @clearSearch="$emit('clearSearch')"
      ></BaseItemNotFound>
    </div>
  </section>
</template>
<script lang="ts">
import { inject, defineComponent } from "vue";
import BaseProductItem from "@/ui/BaseProductItem.vue";
import BaseItemNotFound from "@/ui/BaseItemNotFound.vue";
export default defineComponent({
  components: { BaseProductItem, BaseItemNotFound },
  //   props: ["allBreakfastProduct"],
  setup() {
    const allBreakfastProduct: any = inject("allBreakfastProduct");
    return { allBreakfastProduct: allBreakfastProduct };
  },
});
</script>
