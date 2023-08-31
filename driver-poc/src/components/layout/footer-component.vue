<template>
  <Section class="bg-dark mt-5">
    <footer
      class="container py-5 border-bottom border-secondary border-opacity-25"
    >
      <div class="row">
        <div class="col-4 d-flex flex-column border-end border-secondary">
          <div>
            <h4>Contact</h4>
          </div>
          <div class="mt-5 row">
            <!-- row-1  -->
            <!-- <div class="d-flex"> -->
            <div class="col-xxl-6 col-12">
              <span class="fa-brands fa-square-facebook me-3"></span>
              <span>Ravisingh4v</span>
            </div>
            <div class="col-xxl-6 col-12">
              <span class="fa-brands fa-square-x-twitter me-3"></span>
              <span>Ravisingh4v</span>
            </div>
            <!-- </div> -->
            <!-- row 2  -->
            <!-- <div class="d-flex"> -->
            <div class="col-xxl-6 col-12">
              <span class="fa-solid fa-square-phone me-3"></span>
              <span>+917889898898</span>
            </div>
            <div class="col-xxl-6 col-12">
              <span class="fa-solid fa-square-envelope me-3"></span>
              <span>ravi.singh@gmail.com</span>
            </div>
            <!-- </div> -->
          </div>
        </div>
        <div
          class="col-4 border-end border-secondary d-flex flex-column align-items-center"
        >
          <h4>About</h4>
          <div class="mt-5 px-2 text-center">
            I am Ravi, I created this website to just perform driver.js tour
            setups and for practices.
          </div>
        </div>
        <div class="col-4 d-flex flex-column align-items-end">
          <h4>Have a Questions?</h4>
          <div class="mt-5 d-flex flex-column w-100">
            <span class=""
              >Please share your email so we can get in touch with you.</span
            >
            <div class="d-flex mt-2">
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                class="form-control"
                @focus="handleFocus"
              />
              <button class="btn-gradient ms-3 btn-active">Send</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="text-center mt-2">Created By Ravi👻</div>
  </Section>
</template>
<script setup lang="ts">
import { useFocusHighlight } from "@/hooks/driver";

function handleFocus() {
  const a = useFocusHighlight();
  console.log(a);
}
</script>
