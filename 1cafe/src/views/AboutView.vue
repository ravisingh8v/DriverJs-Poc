<template>
  <section class="about_wrapper">
    <AboutHero></AboutHero>
    <AboutFeed></AboutFeed>
  </section>
</template>
<script lang="ts">
import AboutFeed from "@/component/about/AboutFeed.vue";
import AboutHero from "@/component/about/AboutHero.vue";
export default {
  components: { AboutHero, AboutFeed },
};
</script>
