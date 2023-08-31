<template>
  <section>
    <h3 class="fs-3">Bakery</h3>
    <div class="row mt-3 gx-5 gy-5">
      <!-- Item  -->
      <BaseProductItem
        v-for="(bakery, index) in allBakeryProduct"
        :key="index"
        :product="bakery"
        @getDetails="$emit('getDetails', $event)"
      ></BaseProductItem>

      <!-- Item Not Found Component -->
      <BaseItemNotFound
        :product="allBakeryProduct"
        @clearSearch="$emit('clearSearch')"
      ></BaseItemNotFound>
    </div>
  </section>
</template>
<script lang="ts">
import BaseItemNotFound from "@/ui/BaseItemNotFound.vue";
import BaseProductItem from "@/ui/BaseProductItem.vue";
import { inject } from "vue";
import { Cart } from "../cart/model/CartModel";
export default {
  // props: ["allBakeryProduct"],
  components: { BaseProductItem, BaseItemNotFound },
  setup() {
    const allBakeryProduct: any = inject("allBakeryProduct");
    return { allBakeryProduct: allBakeryProduct };
  },
};
</script>
