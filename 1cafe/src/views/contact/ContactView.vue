<template>
  <section class="contact_us theme-p mx-auto d-flex align-items-center h-100">
    <!-- Submit Form Error Message Dialog -->
    <base-dialog :show="!!catchError" @close="handleError" :title="catchError">
      <p>something went wrong please try after sometimes</p>
    </base-dialog>
    <base-card class="w-100" v-if="!submitted">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <!-- heading  -->
        <h1>Contact Us</h1>
        <!-- Form Section  -->
        <div class="w-100">
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="row mt-3">
              <!-- Firstname  -->
              <div class="col-6">
                <label for="firstName"
                  >Firstname<span class="text-danger">*</span></label
                >
                <Field
                  name="firstName"
                  id="firstName"
                  class="form-control"
                  placeholder="e.g. ravi"
                  v-model="activeUser.firstName"
                  :class="{ 'is-invalid': errors.firstName }"
                />
                <!-- Firstname validation error message  -->
                <span
                  class="invalid-text text-danger"
                  v-if="errors.firstName"
                  >{{ errors.firstName }}</span
                >
              </div>
              <!-- Lastname  -->
              <div class="col-6">
                <label for="lastName"
                  >Lastname<span class="text-danger">*</span></label
                >
                <Field
                  name="lastName"
                  id="lastName"
                  class="form-control"
                  placeholder="e.g. singh"
                  v-model="activeUser.lastName"
                  :class="{ 'is-invalid': errors.lastName }"
                />
                <!-- Lastname validation error message  -->
                <span class="invalid-text text-danger" v-if="errors.lastName">{{
                  errors.lastName
                }}</span>
              </div>
            </div>
            <!-- Email  -->
            <div class="mt-3">
              <label for="email">Email<span class="text-danger">*</span></label>
              <Field
                name="email"
                id="email"
                class="form-control"
                placeholder="e.g. test@gmail.com"
                :class="{ 'is-invalid': errors.email }"
                v-model="activeUser.email"
                autocomplete=""
              />
              <!-- email validation error message  -->
              <span class="invalid-text text-danger" v-if="errors.email">{{
                errors.email
              }}</span>
            </div>
            <!-- Message area  -->
            <div class="mt-3">
              <label for="message" class="my-2"
                >Message<span class="text-danger">*</span>
              </label>
              <Field
                id="message"
                as="textarea"
                name="message"
                class="form-control"
                cols="30"
                rows="5"
                placeholder="Enter your message here"
                :class="{ 'is-invalid': errors.message }"
              ></Field>
              <!-- message validation error message  -->
              <span class="invalid-text text-danger" v-if="errors.message">{{
                errors.message
              }}</span>
            </div>
            <!-- For Submit and back button  -->
            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2 text-nowrap">
                Submit
              </button>
              <button
                class="btn btn-secondary ms-2 text-nowrap"
                type="button"
                @click="$router.back()"
              >
                Back
              </button>
            </div>
          </Form>
          <!-- End  -->
        </div>
      </div>
    </base-card>
    <!-- To showing success Message When form is submitted  -->
    <base-card class="w-100" v-else>
      <div class="">
        Form Submitted Successfully Go back to
        <RouterLink to="/" class="text-primary">Home</RouterLink>
      </div>
    </base-card>
  </section>
</template>

<script lang="ts">
// Imports
import * as yup from "yup";
import { Field, Form, FormContext } from "vee-validate";
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import contactService from "./service/contact.services";
export default defineComponent({
  // declaring components
  components: { Field, Form },

  setup() {
    const store = useStore();
    const catchError = ref("");

    const schema = yup.object({
      firstName: yup.string().required("firstname is a required field"),
      lastName: yup.string().required("firstname is a required field"),
      email: yup.string().required(),
      message: yup.string().required(),
    });

    // getting active user
    // for giving default value to the v-model
    const activeUser = ref({
      firstName: "",
      lastName: "",
      email: "",
    });
    const currentUser = computed(() => {
      return store.getters["auth/activeUser"];
    });
    watch(
      currentUser,
      () => {
        if (currentUser.value) {
          activeUser.value = currentUser.value;
        }
        // console.log(currentUser.value);
      },
      { immediate: true }
    );
    // end

    const submitted = ref(false);
    async function onSubmit(value: FormContext["values"]) {
      // getting hour and minute
      const today = new Date();
      const getFullDay =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      let getHours = today.getHours().toString();
      if (getHours.length < 2) {
        getHours = "0" + getHours;
      }
      let getMinutes = today.getMinutes().toString();
      if (getMinutes.length < 2) {
        getMinutes = "0" + getMinutes;
      }
      const time = getHours + ":" + getMinutes;
      const day = getFullDay;
      // console.log(day);

      // Sending contact request
      // try {
      await contactService
        .sendingUserMessage({
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          message: value.message,
          time: time,
          day: day,
        })
        .then((res) => {
          res.data
            ? (submitted.value = true)
            : (catchError.value = res.statusText);
        });
      // .catch((res) => {
      //   console.log("catch", res);
      // });

      // --- previous approach ---
      // await store.dispatch("contact/sendingUserMessage", {
      //   firstName: value.firstName,
      //   lastName: value.lastName,
      //   email: value.email,
      //   message: value.message,
      //   time: time,
      //   day: day,
      // });
      // for opening success message
      // if error occur
      // } catch (error: any) {
      //   catchError.value = error;
      //   console.log(error);
      // }
    }
    // end

    // to hide error alert box
    function handleError() {
      catchError.value = "";
    }

    return {
      onSubmit,
      schema,
      catchError,
      handleError,
      submitted,
      // currentUser,
      activeUser,
    };
  },
});
</script>
