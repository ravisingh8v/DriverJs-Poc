<template>
  <div class="position-relative">
    <Field
      id="password"
      :type="inputType"
      class="form-control"
      name="password"
      placeholder="Enter Password"
      :class="{ 'is-invalid': errors.password }"
    />
    <span
      @click="changeInputType"
      class="position-absolute material-symbols-outlined top-50 end-0 translate-middle-y pe-2 fs-6 text-secondary icon"
      >{{ hidden }}</span
    >
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Field } from "vee-validate";
export default {
  props: ["errors"],
  components: { Field },
  setup() {
    const hidden = ref("visibility");
    const inputType = ref("password");
    // to change password visibility
    function changeInputType() {
      if (inputType.value == "password") {
        inputType.value = "text";
        hidden.value = "visibility_off";
      } else {
        inputType.value = "password";
        hidden.value = "visibility";
      }
    }
    return { hidden, inputType, changeInputType };
  },
};
</script>
