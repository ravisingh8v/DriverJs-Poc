<template>
  <!-- hero wrapper  -->
  <section
    class="hero-section ps-5 d-flex align-items-center text-white flex-grow-1"
  >
    <div class="hero_overlay"></div>
    <!-- hero content  -->
    <div class="ps-4 hero_content">
      <span class="d-inline-block mb-2">Cafe & Restaurant Est.2035</span>
      <div class="my-2">
        <h2 class="d-flex flex-column">
          <span>Your Go-to Spot for</span>
          <span>Delicious Eats & Coffee</span>
        </h2>
      </div>
      <div class="my-4 d-flex justify-content-center justify-content-sm-start">
        <router-link
          class="btn btn-outline-secondary order-button"
          id="order-button"
          to="/order"
          >Order Now</router-link
        >
      </div>
    </div>
  </section>
</template>
