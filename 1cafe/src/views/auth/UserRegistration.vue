<template>
  <Form
    @submit="$emit('submitForm', $event)"
    v-slot="{ errors }"
    :validation-schema="schema"
  >
    <!-- this div is visible only when route is registration -->
    <div class="mb-3">
      <div class="row gx-0 g-2">
        <div class="col-6">
          <label for="firstname"
            >Firstname<span class="text-danger">*</span></label
          >
          <Field
            type="text"
            class="form-control"
            name="firstName"
            id="firstname"
            v-model="firstName"
            placeholder="Firstname"
            :class="{ 'is-invalid': errors.firstName }"
          />
          <span class="invalid-text text-danger">{{ errors.firstName }}</span>
        </div>
        <div class="col-6">
          <label for="lastname"
            >lastname<span class="text-danger">*</span></label
          >
          <Field
            type="text"
            class="form-control"
            name="lastName"
            id="lastname"
            v-model="lastName"
            placeholder="Lastname"
            :class="{ 'is-invalid': errors.lastName }"
          />
          <span class="invalid-text text-danger">{{ errors.lastName }}</span>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- for login and registration similar fields  -->
    <div class="mb-3" v-if="!isManageProfileRoute">
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
    <div class="mb-4 mt-3" v-if="!isManageProfileRoute">
      <label for="password">Password<span class="text-danger">*</span></label>
      <!-- imported input field with credential show hide functionality  -->
      <BasePasswordField :errors="errors"></BasePasswordField>
      <span class="invalid-text text-danger">{{ errors.password }}</span>
    </div>
    <div class="d-flex flex-column mb-2">
      <!-- submit button  -->
      <div>
        <button class="btn btn-primary">
          Submit
          <span v-if="isLoading"> ....</span>
        </button>
      </div>
      <!-- <div class="my-2">
                <span>{{ catchError }}</span>
              </div> -->
    </div>
    <!-- action -->
    <span class="mt-2" v-if="!isManageProfileRoute">
      <span>If you don't have an account click here to </span>
      <RouterLink to="/login" class="text-primary">login</RouterLink>
    </span>
  </Form>
</template>
<script lang="ts">
import * as yup from "yup";
import { reactive, watch, ref, defineComponent } from "vue";
import { Form, Field } from "vee-validate";
import BasePasswordField from "@/ui/BasePasswordField.vue";
export default defineComponent({
  // props
  props: ["isLoading", "isManageProfileRoute", "manageProfileData"],
  // component
  components: { Form, Field, BasePasswordField },

  setup(props: any) {
    // validation
    const schema = reactive({} as any);
    if (!props.isManageProfileRoute) {
      // for registration
      schema.value = yup.object({
        profileImage: yup.string(),
        firstName: yup.string().required("this field is required"),
        lastName: yup.string().required("this field is required"),
        email: yup.string().email().required("this field is required"),
        password: yup.string().required("this field is required").min(6),
      });
    } else {
      // for manage profile
      schema.value = yup.object({
        firstName: yup.string().trim().required("this field is required"),
        lastName: yup.string().required(),
        email: yup.string(),
      });
    }
    // Getting Data for patch
    const firstName = ref("");
    const lastName = ref("");
    watch(
      () => props.manageProfileData,
      () => {
        firstName.value = props.manageProfileData?.firstName || "";
        lastName.value = props.manageProfileData?.lastName || "";
        // console.log(props.manageProfileData);
        schema.value.email = props.manageProfileData?.email || "";
      },
      { immediate: true }
    );

    return {
      schema: schema.value,
      firstName,
      lastName,
    };
  },
});
</script>

<!-- profile upload   -->
<!-- <div class="mb-3 profile d-flex align-items-center">
                <label
                  for="profile"
                  class="profile_wrapper overflow-hidden rounded-circle position-relative"
                >
                  <span
                    class="position-absolute label_overlay d-flex justify-content-center align-items-center"
                  >
                    <span>Upload</span>
                  </span>
                  <img
                    src="./../../assets/images/mainSection/drink.webp"
                    alt=""
                  />
                </label>
                <label
                  for="profile"
                  class="mx-3 btn btn-outline-secondary p-0 px-1"
                >
                  upload file
                </label>
                <span>{{ errors.profileImage }}</span>
                <Field
                  type="file"
                  class="d-none"
                  name="profileImage"
                  id="profile"
                  @change="uploadFile"
                  ref="file"
                />
              </div> -->
