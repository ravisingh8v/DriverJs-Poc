<template>
  <footer class="footer_wrapper d-flex flex-column">
    <!-- footer section -->
    <div
      class="bg-dark text-white flex-grow-1 row gx-0 gap-5 justify-content-center"
    >
      <!-- footer 1 section  -->
      <div class="col-md-3 col-2 p-5 d-none d-md-block">
        <div>
          <h3 class="mb-3">Newsletter</h3>
          <p class="mb-3">Stay up to date with all the latest from 1Cafe</p>

          <span class="fw-lighter ps-1">Email*</span>
          <div class="d-flex">
            <input
              type="text"
              id="email"
              name="email"
              autocomplete=""
              class="form-control rounded-0"
            />
            <button class="btn btn-outline-secondary join rounded-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <!-- footer 2 section  -->
      <div class="col-md-3 col-5 p-5 d-flex justify-content-center">
        <div>
          <h3 class="mb-3">Talk to Us</h3>
          <div class="mb-3 d-flex flex-column">
            <span>123-456-7890</span>
            <a href="mailto:ravi.singh@1rivet.com">ravi.singh@1rivet.com</a>
          </div>
          <div class="mt-5 d-flex flex-column">
            <span>500 Terry Francine St.</span>
            <span>San Francisco, CA 94158</span>
          </div>
        </div>
      </div>
      <!-- footer 3 section  -->
      <div
        class="col-5 col-md-3 p-5 d-flex align-items-center justify-content-md-end justify-content-center"
      >
        <div>
          <h3 class="mb-3">Facebook</h3>
          <h3 class="mb-3">Instagram</h3>
          <h3 class="">Twitter</h3>
        </div>
      </div>
    </div>
    <div class="text-center">
      © 2035 by 1Cafe . Powered and secured by Ravi ✌
    </div>
  </footer>
</template>
