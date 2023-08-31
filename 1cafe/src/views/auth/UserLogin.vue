<template>
  <Form
    @submit="$emit('submitForm', $event, captchaToken)"
    v-slot="{ errors }"
    :validation-schema="schema"
  >
    <div class="mb-3">
      <label for="email">Email<span class="text-danger">*</span></label>
      <Field
        id="email"
        type="email"
        name="email"
        class="form-control"
        placeholder="ravi.singh@test.com"
        :class="{ 'is-invalid': errors.email }"
      />
      <span class="invalid-text text-danger">{{ errors.email }}</span>
    </div>
    <div class="mb-3 mt-3">
      <label for="password">Password<span class="text-danger">*</span></label>
      <!-- imported input field with credential show hide functionality  -->
      <BasePasswordField :errors="errors"></BasePasswordField>
      <span class="invalid-text text-danger">{{ errors.password }}</span>
    </div>
    <!-- imported input field with credential show hide functionality  -->
    <!-- <div class="d-flex flex-column">
      <div>
        <Field
          name="checkbox"
          id="checkbox"
          type="checkbox"
          v-model="agree"
          @change="handleCheckbox"
        ></Field>

        <label for="checkbox" class="ms-1 fs-6"
          >Verify that you are not a robot.</label
        >
      </div>
      <span class="invalid-text text-danger">{{ errors.checkbox }}</span>
    </div> -->
    <!-- <span class="invalid-text text-danger">{{ errors.password }}</span> -->
    <!-- <div class="mb-1">
      <VueRecaptcha
        ref="recaptcha"
        size="invisible"
        sitekey="6Lfcrp0mAAAAADqOrCi0eFU50q8Kqvx0GkjjToTv"
        @verify="onRecaptchaVerified"
      ></VueRecaptcha>
    </div> -->
    <!-- @expire="onRecaptchaExpired" -->
    <div class="d-flex flex-column mb-2">
      <!-- submit button  -->
      <div>
        <button type="submit" class="btn btn-primary">
          Login
          <!-- <span v-if="isLoading"> ....</span> -->
        </button>
      </div>
      <!-- <div class="my-2">
                <span>{{ catchError }}</span>
              </div> -->
    </div>
    <!-- action -->
    <span class="mt-2">
      <span> If you don't have an account click here to </span>
      <RouterLink to="/registration" class="text-primary"
        >Registration</RouterLink
      >
    </span>
  </Form>
</template>
<script lang="ts">
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import BasePasswordField from "@/ui/BasePasswordField.vue";
import VueRecaptcha from "vue3-recaptcha2";
import { ref, computed, watch } from "vue";
// VueRecaptcha
export default {
  components: { Form, Field, BasePasswordField },
  props: ["isLoading"],
  setup() {
    const agree = ref(false);
    // validation
    const schema = yup.object({
      email: yup.string().email().required("this field is required"),
      password: yup.string().required("this field is required").min(6),
      // checkbox: yup.boolean().isTrue("please tick the checkbox"),
    });

    async function handleCheckbox(event?: any, extra?: boolean) {
      console.log("1");
      recaptcha.value.execute();

      if (extra) {
        agree.value = !agree.value;
      }
    }
    let recaptcha = ref();
    const captchaToken = ref(false);
    function onRecaptchaVerified(token: any) {
      handleCheckbox("", true);
      // if (token) {
      //   console.log(token);
      // }
      captchaToken.value = token;
    }
    // function onRecaptchaExpired() {
    //   agree.value = false;
    // }

    return {
      schema,
      recaptcha,
      onRecaptchaVerified,
      // onRecaptchaExpired,
      captchaToken,
      handleCheckbox,
      agree,
    };
  },
};
</script>
<style lang="scss">
.rc-anchor {
  width: 150px;
}
</style>
