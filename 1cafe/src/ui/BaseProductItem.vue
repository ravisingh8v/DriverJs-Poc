<template>
  <div class="col-lg-4 col-sm-6 col-12">
    <div
      class="border product_card shadow card p-3 h-100"
      @click="$emit('getDetails', product)"
    >
      <div class="product_image_wrapper rounded">
        <img :src="product.imageUrl" alt="" />
      </div>
      <div class="mt-3">
        <h5 class="fs-5">{{ product.title }}</h5>
        <p class="">
          {{
            product.description.length > 50
              ? product.description.substring(0, 70 - 3) + "..."
              : product.description
          }}
        </p>
        <span class="fw-semibold">Price: ${{ product.price }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["product"],
};
</script>
