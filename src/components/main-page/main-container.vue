<template>
  <section class="home-container">
    <div class="hero-wrapper" id="hero">
      <home-hero></home-hero>
    </div>
    <div id="tours">
      <tours-feed></tours-feed>
      <!-- <tours-page></tours-page> -->
    </div>
    <div class="contact">
      <contact-us></contact-us>
    </div>
    <div id="footer">
      <footer-component></footer-component>
    </div>
  </section>
</template>
<script lang="ts" setup>
import homeHero from "./home-hero.vue";
import ToursFeed from "./tours-feed.vue";
import contactUs from "./contact-us/contact-us.vue";
import FooterComponent from "../layout/footer-component.vue";
</script>
