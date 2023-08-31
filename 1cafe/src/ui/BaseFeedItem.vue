<template>
  <div class="row gx-0">
    <div
      class="col-sm-6 col-12 items d-flex align-items-center order-0 justify-content-center"
      :class="'order-sm-' + feed.dataOrder"
    >
      <div class="feed_data d-flex flex-column">
        <h2 class="mb-3" v-if="feed.head">{{ feed.Head }}</h2>
        <span class="mb-3 fs-5" v-if="feed.head">{{ feed.Title }}</span>
        <h2 class="mb-3 fs-1" v-else>{{ feed.Title }}</h2>
        <p class="mb-3 fw-light">
          {{ feed.description }}
        </p>
        <div id="view-button">
          <router-link to="/order" class="btn btn-outline-secondary">{{
            feed.head ? "See More" : "View Menu"
          }}</router-link>
        </div>
      </div>
    </div>
    <div
      class="col-sm-6 col-12 items order-sm-0 order-1"
      :class="[feed.imageTitle]"
    ></div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["feed"],
};
</script>
