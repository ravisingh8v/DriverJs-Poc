<template>
  <section class="d-flex flex-column h-100 app_wrapper overflow-auto">
    <base-spinner v-if="isLoading"></base-spinner>
    <!-- Header  -->
    <transition name="route">
      <the-header
        class="header"
        :isLogin="isLogin"
        :isAuthenticated="isAuthenticated"
        :menu="menu"
        @openMenu="openMenu"
        v-if="!isNotFound"
      ></the-header>
    </transition>
    <!-- Router components -->
    <section class="flex-grow-1" @click="menuFn">
      <router-view v-slot="slotProps">
        <transition mode="out-in" name="route">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </section>
    <transition name="route">
      <the-footer v-if="!isLogin && footer && !isNotFound"></the-footer>
    </transition>
  </section>
</template>
<script lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// Importing Layout component
import TheHeader from "./component/layout/TheHeader.vue";
import TheFooter from "./component/layout/TheFooter.vue";
import authService from "./views/auth/service/auth.services";

import "driver.js/dist/driver.css";
export default {
  components: { TheHeader, TheFooter },
  setup() {
    const route = useRoute();
    const store = useStore();
    // getting current route to hide footer on login page
    const currentRoute = ref("");
    const isNotFound = ref();
    const checkCurrentRoute = computed(() => {
      return route.path;
    });
    watch(
      checkCurrentRoute,
      async () => {
        currentRoute.value = checkCurrentRoute?.value;
        if (route.matched[0]) {
          if (route.matched[0]["path"] === "/:notFound(.*)*") {
            isNotFound.value = true;
          } else {
            isNotFound.value = false;
          }
        }
      },
      { immediate: true }
    );
    const isLogin = computed(() => {
      if (
        currentRoute.value.includes("login") ||
        currentRoute.value.includes("registration") ||
        currentRoute.value.includes("/manage-profile")
      ) {
        return currentRoute.value;
      } else {
        return false;
      }
    });

    // to showing footer when route is ready
    const footer = ref();
    watch(
      isLogin,
      () => {
        isLogin.value == false
          ? setTimeout(() => {
              footer.value = true;
            }, 1000)
          : (footer.value = false);
      },
      { immediate: true }
    );

    // checking authentication
    const isAuthenticated = ref();
    const isAuth = computed(() => {
      return store.getters["auth/isAuthenticated"];
    });
    // watch on isAuth computed prop
    watch(
      isAuth,
      () => {
        isAuthenticated.value = isAuth.value;
      },
      { immediate: true }
    );

    // profile menu open and close toggle
    const menu = ref();
    function openMenu(value: boolean) {
      if (value == true) {
        menu.value = true;
      } else {
        menu.value = false;
      }
    }
    function menuFn() {
      menu.value = false;
    }
    // end

    const isLoading = ref();
    const isLoadings = computed(() => {
      return store.getters.isLoading;
    });
    watch(isLoadings, () => {
      isLoading.value = isLoadings.value;
    });

    store.dispatch("auth/isAuth");
    authService.getUserData();
    // store.dispatch("auth/getUserData");

    // driverObj.drive();
    onMounted(() => {
      //#### first trying from here
      // console.log(productDetailsPage.value);
      // const driverObj = driver();
      // {
      //   showProgress: true,
      //   steps: [
      //     {
      //       element: ".header",
      //       popover: {
      //         title: "Animated Tour Example",
      //         description:
      //           "Here is the code example showing animated tour. Let's walk you through it.",
      //       },
      //     },
      //   ],
      // }
      // driverObj.drive();
      // driverObj.setSteps([
      //   {
      //     element: ".header ",
      //     popover: {
      //       title: "Animated Tour Example",
      //       description:
      //         "Here is the code example showing animated tour. Let's walk you through it.",
      //       side: "left",
      //       align: "start",
      //       onNextClick(element, steps, opts: any) {
      //         console.log(opts);
      //         if (isAuthenticated.value) {
      //           driverObj.moveTo(opts.state.activeIndex + 1);
      //         } else {
      //           driverObj.moveTo(opts.state.activeIndex + 2);
      //         }
      //       },
      //     },
      //   },
      //   {
      //     element: ".footer_wrapper ",
      //     popover: {
      //       title: "Animated Tour Example",
      //       description:
      //         "Here is the code example showing animated tour. Let's walk you through it.",
      //       side: "left",
      //       align: "start",
      //       onNextClick(element, steps, opts: any) {
      //         console.log(opts);
      //         if (isAuthenticated.value) {
      //           router.push("/order");
      //           driverObj.moveTo(opts.state.activeIndex + 1);
      //         } else {
      //           driverObj.moveTo(opts.state.activeIndex + 2);
      //         }
      //       },
      //     },
      //   },
      // ]);
      // driverObj.drive();
    });

    return {
      isLogin,
      footer,
      isAuthenticated,
      menu,
      isLoading,
      isNotFound,
      menuFn,
      openMenu,
    };
  },
};
</script>
<style lang="scss">
// route animation
.route-enter-from {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.35s ease-out;
}
.route-enter-to {
  opacity: 1;
}
.route-leave-from {
  opacity: 1;
}
.route-leave-active {
  transition: all 0.35s ease-in;
}
.route-leave-to {
  opacity: 0;
}
</style>

<!-- <base-dialog
      :title="'Something went wrong'"
      @close="handleError"
      :show="!!errorMessage"
    >
      <p>{{ errorMessage }}</p>
    </base-dialog> -->

<!-- function handleError() {
      store.commit("errorMessage", null);
      return (errorMessage.value = "");
    }
    const errorMessage = ref();
    const error = computed(() => {
      // console.log(store.getters.errorMessage);
      return store.getters.errorMessage;
    });
    watch(error, () => {
      console.log(store.getters.errorMessage);
      errorMessage.value = error.value;
    }); -->
