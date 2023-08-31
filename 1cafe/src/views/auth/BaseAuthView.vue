<template>
  <div class="row gx-0 h-100">
    <!-- Dialog Box For Error  -->
    <base-dialog
      :title="'Something went wrong'"
      @close="handleError"
      :show="!!catchError"
    >
      <p>{{ catchError }}</p>
    </base-dialog>
    <!-- left section  -->
    <div class="col-sm-5 d-sm-block d-none">
      <!-- for background image  -->
      <div
        class="h-100 auth_left_section"
        :class="isRouteLogin ? 'login_bg' : 'register_bg'"
      ></div>
    </div>
    <!-- right section  -->
    <div
      class="col-sm-7 col-12 justify-content-center align-items-center d-flex"
    >
      <div class="auth_right_section">
        <!-- dynamic heading for login or registration page -->
        <h1 class="text-center mb-5" v-if="currentPage !== 'Manage Profile'">
          {{ currentPage }}
        </h1>
        <h1 class="text-center mb-5" v-else>Profile</h1>
        <!-- import slot -->
        <base-card>
          <!-- :isLoading="isLoading" -->
          <UserRegistration
            @submitForm="submitForm"
            :isManageProfileRoute="isManageProfileRoute"
            v-if="!isRouteLogin"
            :manageProfileData="manageProfileData"
          ></UserRegistration>
          <UserLogin @submitForm="submitForm" v-else></UserLogin>
          <!-- @onRecaptchaVerified="onRecaptchaVerified" -->
        </base-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// component
import UserRegistration from "./UserRegistration.vue";
import UserLogin from "./UserLogin.vue";
// Setup
import { computed, ref, watch } from "vue";
// routing
import { useRoute, useRouter } from "vue-router";
// for validation
import { FormContext } from "vee-validate";
// store
import { useStore } from "vuex";

import authService from "./service/auth.services";

export default {
  // components: { Field, Form },
  components: { UserRegistration, UserLogin },

  setup() {
    const router = useRouter();
    const route = useRoute();
    // const isLoading = ref();
    const store = useStore();
    const isRouteLogin = ref();
    const currentRoute = computed(() => {
      return route.path;
    });

    // watch on change route to manipulate data according to registration and login
    watch(
      currentRoute,
      () => {
        if (currentRoute.value == "/login") {
          isRouteLogin.value = true;
        } else {
          isRouteLogin.value = false;
        }
      },
      { immediate: true }
    );

    // forms Data
    const catchError = ref();
    // const clickListener = ref(0);
    // getting token

    /**
     * sending to store
     * @param value from form
     */
    async function submitForm(value: FormContext["values"]) {
      // on Login
      if (isRouteLogin.value) {
        // console.log(captchaToken);

        authService
          .userLogin({
            email: value.email,
            password: value.password,
          })
          .then((res: any) => {
            // comes from backend
            if (res && !res.error) {
              // router.push("/");
              router.back();
              store.dispatch("auth/userLogin", res);
              authService.getUserData();
              // store.dispatch("auth/getUserData");
            } else {
              catchError.value = res.error?.message;
            }
          });
      } else {
        // on registration sending this to firebase admin dashboard
        if (value.password && value.firstName) {
          // if password is not there so its manage profile

          await authService
            .signUpWithEmailPassword({
              email: value.email,
              password: value.password,
            })
            .then((res: any) => {
              console.log(res);
              if (res && !res.error) {
                router.push("/login");
              } else {
                catchError.value = res.error?.message;
              }
            });
        }
        await authService.registration({
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
        });
        authService.getUserData();
        // to getting updated user data when manage profile form is submitted
      }
    }

    // Data for Patch
    const manageProfileData = ref();

    // Checking currentPage in manage profile ?
    const isManageProfileRoute = ref(false);
    watch(
      () => route.path,
      () => {
        if (route.path.includes("/manage-profile")) {
          isManageProfileRoute.value = true;
          // if route is manage profile, getting active user data
          const getActiveUserData = computed(() => {
            return store.getters["auth/activeUser"];
          });
          watch(
            getActiveUserData,
            () => {
              manageProfileData.value = getActiveUserData.value;
              // console.log(manageProfileData);
            },
            { immediate: true }
          );
        } else {
          isManageProfileRoute.value = false;
          manageProfileData.value = "";
        }
      },
      { immediate: true }
    );

    /**
     * finding route to manipulate dom
     */
    const currentPage = computed(() => {
      if (isRouteLogin.value) {
        return "Login";
      } else if (isManageProfileRoute.value) {
        return "Manage Profile";
      } else {
        return "Register";
      }
    });

    // dialog
    function handleError() {
      catchError.value = "";
    }
    // expose
    return {
      isRouteLogin,
      catchError,
      handleError,
      // isLoading,
      // file,
      // uploadFile,
      submitForm,
      isManageProfileRoute,
      currentPage,
      manageProfileData: manageProfileData,
    };
  },
};
</script>

<!-- // --- previous approach ---
// sending this to database
// await store.dispatch("auth/registration", {
//   firstName: value.firstName,
//   lastName: value.lastName,
//   email: value.email,
// }); -->

<!-- // form method
    // const file = ref("");
    // function uploadFile(event: any) {
    //   const image = event.target.files[0];
    //   console.log(image);
    //   console.log(file);
    // } -->

<!-- // await store.dispatch("auth/userLogin", {
      //   email: value.email,
      //   password: value.password,
      // });
      // console.log("try"); -->

<!-- 
      // try {
        // await store.dispatch("auth/signUpWithEmailPassword", {
        //   email: value.email,
        //   password: value.password,
        // }); -->
