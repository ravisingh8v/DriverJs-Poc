<template>
  <header
    class="main_header theme-p bg-dark d-flex justify-content-between align-items-center text-white position-sticky top-0"
  >
    <!-- left section  -->
    <div>
      <div>
        <img src="./../../assets/images/logo/1Cafe.svg" alt="" />
      </div>
    </div>
    <!-- right section  -->
    <input
      type="checkbox"
      name=""
      class="d-none"
      id="toggleNav"
      :checked="isChecked"
    />
    <div
      class="mobile_navigation"
      id="navigation_section"
      ref="mobileNavigation"
      @click="openMenu = false"
    >
      <!-- navigation  -->
      <nav class="navbar w-md-100">
        <!-- this condition to prevent :- popover don't close on desktop mode when clicking on any of the link  -->
        <ul class="d-flex nav w-md-100" @click="closeNav">
          <li class="nav-item" id="home-tab">
            <RouterLink class="nav-link d-inline-block" to="/">Home</RouterLink>
          </li>
          <li class="nav-item" id="order-tab">
            <RouterLink class="nav-link d-inline-block" to="/order"
              >Order</RouterLink
            >
          </li>
          <li class="nav-item" id="contact-tab">
            <RouterLink class="nav-link d-inline-block" to="/contact"
              >Contact</RouterLink
            >
          </li>
          <li class="nav-item" id="about-tab">
            <RouterLink class="nav-link d-inline-block" to="/about"
              >About</RouterLink
            >
          </li>
        </ul>
      </nav>
      <!-- profile  -->
      <div
        class="profile_action ms-2 d-flex align-items-center position-relative"
        :class="{ 'ms-3': !isAuthenticated }"
        @click.stop
      >
        <div
          id="profile-tab"
          class="user_wrapper d-flex align-items-center"
          :class="{ 'min-w-100': isAuthenticated }"
        >
          <div
            class="cp user_profile_wrapper d-flex align-items-center justify-content-center"
            @click="openProfileMenu"
            v-if="isAuthenticated"
          >
            <span class="material-symbols-outlined"> account_circle </span>
          </div>
          <div class="ms-2" @click="openProfileMenu">
            <a>{{ user }}</a>
          </div>
        </div>

        <!-- Profile Menu  -->
        <div
          v-if="openMenu && isAuthenticated"
          class="profile_action_wrapper shadow border border-secondary position-absolute w-100 bg-dark"
        >
          <ul @click="closeNav">
            <li
              class="cp p-2 d-flex align-items-center"
              @click="$router.push('/manage-profile'), (openMenu = false)"
            >
              <span class="me-1 material-symbols-outlined"> person </span>
              <a>Profile</a>
            </li>
            <li class="cp p-2 d-flex align-items-center" @click="logout">
              <span class="me-1 material-symbols-outlined"> logout </span>
              <a>Logout</a>
            </li>
          </ul>
        </div>

        <!-- login and registration link  -->
        <div v-if="!isAuthenticated" id="authentication-tab">
          <div @click="isChecked = false">
            <RouterLink
              class="btn btn-primary"
              :to="isLogin !== '/login' ? '/login' : '/registration'"
              >{{ isLogin !== "/login" ? "Login" : "Registration" }}</RouterLink
            >
          </div>
        </div>
      </div>
      <!-- close icon  -->
      <label @click="closeNav" for="" class="close_mobile_navigation">
        <span class="fs-1 primary_close_btn icon material-symbols-outlined">
          close
        </span>
      </label>
    </div>
    <!-- hamburger icon  -->
    <label
      for=""
      class="hamburger_icon fs-1 material-symbols-outlined"
      ref="hamburgerIcon"
      @click="openNav"
    >
      menu
    </label>
  </header>
</template>

<!-- script -->
<script lang="ts">
// Imports
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useNavTour } from "../../hooks/useDriver";

// Export headers logics
export default {
  // Props
  props: ["isLogin", "isAuthenticated", "scrolled", "menu"],

  setup(props: any, context: any) {
    // Variables
    const store = useStore();
    const router = useRouter();

    // for profile menu
    const openMenu = ref(false);

    function openProfileMenu() {
      openMenu.value = !openMenu.value;
      context.emit("openMenu", openMenu.value);
    }
    const menuComp = computed(() => {
      return props.menu;
    });
    watch(menuComp, () => {
      openMenu.value = menuComp.value;
    });

    // getting user
    const user = ref();
    const activeUser = computed(() => {
      return store.getters?.["auth/activeUser"] || " ";
    });

    watch(
      activeUser,
      () => {
        if (activeUser.value?.["firstName" || "lastName"]) {
          user.value =
            activeUser.value?.firstName + " " + activeUser.value?.lastName;
        } else {
          user.value = "";
        }
      },
      { immediate: true }
    );

    // Logout
    function logout() {
      store.dispatch("auth/logout");
      openMenu.value = false;
      user.value = "";
      router.push("/login");
    }

    // for mobile navigation tour

    const isChecked = ref<boolean>(false);
    // for closing mobile nav
    function closeNav() {
      if (isChecked.value == true) {
        isChecked.value = false;
        console.log("this is working");
        useNavTour({ isMobile: true }, isChecked.value);
      }
    }

    // for open mobile navigation
    function openNav() {
      isChecked.value = true;
      useNavTour({ isMobile: true }, isChecked.value);
    }

    // onLoad if device is not mobile phone then call the tour
    onMounted(() => {
      if (
        window.innerWidth > 768 &&
        (!localStorage.getItem("navigationTour") ||
          localStorage.getItem("navigationTour") == "false")
      ) {
        useNavTour({ isMobile: false });
      }
    });
    // watch(isChecked, () => {
    //   if (isChecked.value == false) {
    //     useNavTour("", isChecked.value);
    //   }
    // });

    return {
      store,
      openMenu,
      openProfileMenu,
      user,
      logout,
      openNav,
      isChecked,
      closeNav,
      // hamburgerIcon,
    };
  },
};
</script>
<style lang="scss" scoped>
// style
</style>
