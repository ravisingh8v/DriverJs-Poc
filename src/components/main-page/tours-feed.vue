<template>
  <div class="container pt-4 text-dark">
    <div id="tours-container">
      <div>
        <h2 class="section-headings">TOURS</h2>
      </div>
      <div class="mb-5 mt-4">
        <div>
          <span class="">
            By clicking on below buttons you can see the different types of
            tour.
          </span>
        </div>
        <div class="mt-3 row gx-2">
          <div
            class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-start"
          >
            <button
              class="btn-gradient text-center text-nowrap btn-hover btn-active my-2 border"
              @click="handleHighlightTour"
            >
              Highlight Tour
            </button>
          </div>
          <div
            class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-start"
          >
            <button
              id="contextual"
              class="btn-gradient text-center text-nowrap btn-hover btn-active my-2"
              @click="handleContextHighlight"
            >
              Contextual Tour
            </button>
          </div>
          <div
            class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-start"
          >
            <button
              id=""
              class="btn-gradient text-center text-nowrap btn-hover btn-active my-2"
              @click="handleNoElementHighlight"
            >
              No Element
            </button>
          </div>
          <div
            class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-start"
          >
            <button
              id="preventExit"
              class="btn-gradient text-center text-nowrap btn-hover btn-active my-2"
              @click="handlePreventExitHighlight('preventExit')"
            >
              Prevent Exit
            </button>
          </div>
          <!-- <div
            class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-start"
          >
            <button class="btn-gradient text-nowrap btn-hover btn-active my-2">
              Highlight Tour
            </button>
          </div>
          <div
            class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-start"
          >
            <button class="btn-gradient text-nowrap btn-hover btn-active my-2">
              Highlight Tour
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <div class="tour-box">
      <div class="">
        <h3 class="section-headings">HIGHLIGHT ELEMENT</h3>
      </div>
      <div class="mt-4">This element going to be highlighted</div>
      <div class="card my-3" id="highlight-element">
        <div class="card-header">Highlight</div>
        <div class="card-body">
          <h5 class="card-title">Highlight Me By Clicking Above Buttons</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button class="btn-gradient btn-active" @click="handleHighlightTour">
            Highlight Me
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  useHighlightElement,
  useNoElementHighlight,
  usePreventExitHighlight,
} from "@/hooks/driver";

function handleHighlightTour() {
  useHighlightElement(
    "highlight-element",
    "Highlight",
    "this is a highlight tour just highlight the element"
  );
}

function handleContextHighlight() {
  useHighlightElement(
    "contextual",
    "Contextual Guide",
    "This button show you the highlight and the content of this button"
  );
}
function handleNoElementHighlight() {
  useNoElementHighlight();
}
function handlePreventExitHighlight(id: string) {
  usePreventExitHighlight(id);
}
// function handleAsyncTour() {
//   useAsyncTour("async");
// }
</script>
