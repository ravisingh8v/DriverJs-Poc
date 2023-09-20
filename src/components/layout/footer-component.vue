<template>
  <div class="bg-dark mt-5">
    <footer
      class="container px-3 px-sm-0 py-5 border-bottom border-secondary border-opacity-25"
    >
      <div class="row">
        <div
          class="col-12 col-sm-6 footer-items mb-3 mb-lg-0 col-lg-4 d-flex flex-column"
        >
          <div>
            <h4>Contact</h4>
          </div>
          <div class="mt-2 mt-lg-5 row">
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
          class="col-12 col-sm-6 footer-items mt-5 mt-sm-0 mt-lg-0 mb-3 mb-lg-0 col-lg-4 d-flex flex-column align-items-start align-items-lg-center"
        >
          <h4>About</h4>
          <div class="mt-lg-5 mt-2 px-sm-2 px-0 text-lg-center">
            I am Ravi, I created this website to just perform driver.js tour
            setups and for practices.
          </div>
        </div>
        <div
          class="col-12 mt-5 mt-lg-0 mb-3 mb-lg-0 col-lg-4 d-flex flex-column align-items-lg-end"
        >
          <h4>Have a Questions?</h4>
          <div class="mt-3 mt-lg-5 d-flex flex-column w-100">
            <span class=""
              >Please share your email so we can get in touch with you.</span
            >
            <form action="">
              <div class="d-flex mt-2">
                <input
                  type="text"
                  id="footer-email"
                  placeholder="Enter your email"
                  class="form-control"
                  @focus="handleFocus($event)"
                  tabindex="1"
                />
                <button
                  tabindex="2"
                  class="btn-gradient ms-3 btn-active"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
    <div class="text-center mt-2">Created By Ravi👻</div>
  </div>
</template>
<script setup lang="ts">
import { useFocusHighlight } from "@/hooks/driver";

function handleFocus(event: any) {
  useFocusHighlight('footer-email','Write your email, we will get back to you.');
}
</script>
