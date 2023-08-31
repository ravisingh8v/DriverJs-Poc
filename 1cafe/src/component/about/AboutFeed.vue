<template>
  <div class="about_feed_wrapper">
    <base-feed-item
      v-for="feed in feedData"
      :key="feed.Title"
      :feed="feed"
    ></base-feed-item>
  </div>
</template>
<script lang="ts">
import BaseFeedItem from "./../../ui/BaseFeedItem.vue";

export default {
  data() {
    return {
      feedData: [
        {
          Title: "The Best Bite in the Neighborhood",
          description:
            "I'm an extra long title. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.",
          imageTitle: "about-image",
          // imgOrder: "",
          dataOrder: "0",
        },
      ],
    };
  },
  components: { BaseFeedItem },
};
</script>
