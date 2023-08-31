<template>
  <div
    class="d-flex align-items-center justify-content-between border mt-2 p-2 rounded"
  >
    <!-- left wrapper  -->
    <div class="d-flex align-items-center">
      <!-- image wrapper  -->
      <div class="cart_image_wrapper rounded">
        <img :src="cart.imageUrl" alt="" />
      </div>
      <!-- title and actions  -->
      <div class="ms-2">
        <p class="m-0">{{ cart.title }}</p>
        <div class="pt-2">
          <a
            class="text-primary p-0 ms-1 me-1"
            @click="$emit('editItem', cart)"
          >
            Edit
          </a>
          <a
            :id="`deleteCartItem` + cart.id"
            class="text-danger p-0 ms-1"
            @click="deleteItem(`deleteCartItem` + cart.id)"
          >
            Delete
          </a>
        </div>
      </div>
    </div>
    <!-- right wrapper  -->
    <div class="d-flex flex-column">
      <span class="text-end">Quantity: {{ cart.quantity }}</span>
      <span class="text-end">Total Price: ${{ cart.totalPrice }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { useContextualHighlight } from "../../hooks/useDriver";
export default {
  props: ["cart", "index"],
  setup(props: any, { emit }: any) {
    // const emit = defineEmits<{
    //   (event: string, values: string): void;
    // }>();
    function deleteItem(element: string) {
      const contextualHighlight = localStorage.getItem("contextualHighlight");
      if (!localStorage.getItem("contextualHighlight")) {
        useContextualHighlight(
          element,
          "Alert",
          "This action will remove the item you have selected from your cart."
        );
      }
      if (contextualHighlight == "true") {
        emit("deleteItem", props.cart.id);
      }
    }

    return { deleteItem };
  },
};
</script>
