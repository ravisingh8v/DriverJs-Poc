<template>
  <div class="row pb-4" id="query-details">
    <div class="col-12 mt-4">
      <label for="query-type" class="fw-semibold mb-2">Query Type</label>
      <select name="query" class="form-select" id="query-type">
        <option value="feedback">Feedback</option>
        <option value="help">Help & Support</option>
      </select>
    </div>
    <div class="col-12 mt-4">
      <label for="message" class="fw-semibold mb-2">Message</label>
      <textarea
        name="message"
        id="message"
        class="form-control"
        cols="30"
        placeholder="Enter Your Message"
        rows="4"
      ></textarea>
    </div>
  </div>
</template>
