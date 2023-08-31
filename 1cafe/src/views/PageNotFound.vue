<template>
  <section class="d-flex justify-content-center align-items-center h-100">
    <div class="page_not_found_card">
      <base-card>
        <div class="text-center">
          <h2 class="text-center m-0 p-0"><span>404</span></h2>
          <span>Page not found</span>
        </div>
        <p class="text-center mt-5">
          The Page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <div class="text-center mb-2">
          <button class="btn btn-primary" @click="$router.push('/')">
            Home Page
          </button>
        </div>
      </base-card>
    </div>
  </section>
</template>
