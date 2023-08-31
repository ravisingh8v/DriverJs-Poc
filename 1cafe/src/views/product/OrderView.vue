<template>
  <section class="mb-5">
    <!-- order hero -->
    <OrderHero></OrderHero>

    <!-- navigation  -->
    <section class="theme-p mt-3">
      <!-- Breadcrumb component  -->
      <BreadcrumbAndCart
        :cartItems="cartItems"
        :isBakery="isBakery"
        @activeComponent="activeComponent"
        @viewCart="viewCart"
        @searchedTerm="searchedTerm"
        :clearSearchValue="clearSearchValue"
      ></BreadcrumbAndCart>

      <!-- Breakfast and Bakery component  -->
      <section class="px-1 mt-3 mt-md-5">
        <!-- Search  -->
        <div
          class="search_wrapper mb-3 ms-0 ms-md-3 d-md-none d-block"
          id="big-screen-search"
        >
          <BaseSearch
            :clearSearchValue="clearSearchValue"
            @searchedTerm="searchedTerm"
          ></BaseSearch>
        </div>
        <!-- Products  -->
        <Transition name="route" mode="out-in">
          <component
            :is="currentComponent"
            @getDetails="getDetails"
            @clearSearch="clearSearch"
          ></component>
        </Transition>
      </section>
    </section>

    <!-- overlay component  -->
    <Transition name="overlay">
      <section
        v-if="productDetail || cartDetails"
        @click="(productDetail = null), (cartDetails = false)"
        class="product_details_wrapper position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
      >
        <product-detail
          ref="productDetailsPage"
          v-if="productDetail"
          :productDetail="productDetail"
          @closeModel="closeModel"
          @cartAdded="cartAdded"
        ></product-detail>
        <CartDetails
          v-else
          @close="cartDetails = false"
          :cartData="cartData"
          @itemDeleted="itemDeleted"
          @editItem="editCartItem"
        ></CartDetails>
      </section>
    </Transition>
  </section>
</template>
<script lang="ts">
import OrderHero from "@/component/order/OrderHero.vue";
import BakeryList from "@/component/order/BakeryList.vue";
import BreakfastList from "@/component/order/BreakfastList.vue";
import ProductDetail from "@/component/order/ProductDetail.vue";

import { useStore } from "vuex";
import {
  shallowRef,
  ref,
  computed,
  watch,
  provide,
  defineComponent,
} from "vue";
import CartDetails from "@/component/cart/CartDetails.vue";
import { Cart } from "@/component/cart/model/CartModel";
import BreadcrumbAndCart from "@/component/order/BreadcrumbAndCart.vue";
import BaseSearch from "@/ui/BaseSearch.vue";
import productService from "@/views/product/service/product.services";
import useSearch from "@/hooks/useSearch";
import "driver.js/dist/driver.css";
export default defineComponent({
  components: {
    OrderHero,
    BakeryList,
    ProductDetail,
    CartDetails,
    BreadcrumbAndCart,
    BaseSearch,
  },
  emits: ["searchedTerm", "allBreakfastProduct", "allBakeryProduct"],
  setup() {
    // const isAuthenticated = localStorage.getItem("userId");
    const store = useStore();
    // for active component
    const currentComponent = shallowRef();
    // default component
    const isBakery = ref(true);

    // for dynamic component bakery and breakfast
    currentComponent.value = BakeryList;
    function activeComponent(value: string) {
      if (value == "bakery") {
        isBakery.value = true;
        currentComponent.value = BakeryList;
      } else if (value == "breakfast") {
        isBakery.value = false;
        currentComponent.value = BreakfastList;
      }
    }

    // get products
    const allBakeryProduct: any = ref();
    const allBreakfastProduct: any = ref();
    const products = computed(() => {
      return store.getters["products/allProducts"];
    });

    // function to filter all bakery food
    const filterBakeryProduct = () => {
      return (allBakeryProduct.value = products.value.filter(
        (res: any) => res.category == "bakery"
      ));
    };
    // function to filter all breakfast food
    const filterBreakFastProduct = () => {
      return (allBreakfastProduct.value = products.value.filter(
        (res: any) => res.category == "breakfast"
      ));
    };

    watch(products, () => {
      filterBakeryProduct();
      filterBreakFastProduct();
    });

    // get details function and sending to another component
    const productDetail = ref();
    function getDetails(value: any) {
      productDetail.value = value;
      // router.push("");
    }

    // view cart
    const cartData = ref();
    const cartItems = ref();
    // cartData.value = store.getters["products/cartData"];
    const carts = computed(() => {
      return store.getters["products/cartData"];
    });
    watch(carts, () => {
      // console.log(carts);

      cartData.value = carts.value;
      cartItems.value = carts.value.length;
    });

    const cartDetails = ref();
    cartDetails.value = false;
    function viewCart() {
      cartDetails.value = true;
    }

    //when cart added
    function cartAdded(value: boolean) {
      if (value == true) {
        productDetail.value = null;
      }
    }
    function editCartItem(cartData: Cart) {
      if (cartData) {
        productDetail.value = cartData;
      }
    }
    // getting cart data
    // const cartData =
    function itemDeleted(value: number) {
      cartItems.value = value;
    }
    function closeModel() {
      productDetail.value = "";
    }

    // search
    const searchedTerms = ref();
    async function searchedTerm(event: any) {
      clearSearchValue.value = false;
      const { item } = useSearch(products, event);

      allBakeryProduct.value = item.filter(
        (res: any) => res.category == "bakery"
      );

      allBreakfastProduct.value = item.filter(
        (res: any) => res.category == "breakfast"
      );
      searchedTerms.value = event;
    }
    provide("searchedTerm", searchedTerms);

    // clear search filter
    const clearSearchValue = ref(false);
    function clearSearch() {
      clearSearchValue.value = true;
      filterBakeryProduct();
      filterBreakFastProduct();
    }
    // provide this to bakery and breakfast component
    provide("allBakeryProduct", allBakeryProduct);
    provide("allBreakfastProduct", allBreakfastProduct);

    // previous approach
    // calling stores action method here
    // store.dispatch("products/getAllProducts");

    const getProducts = productService.getAllProducts().then((res: any) => {
      store.dispatch("products/getAllProducts", res);
    });

    // store.dispatch("products/getCartData");

    const getCartData = productService.getCartData().then((res: any) => {
      store.dispatch("products/getCartData", res);
    });
    // const productDetailsPage = ref();

    // onMounted(() => {
    //   console.log(productDetailsPage.value);

    //   const driverObj = driver({
    //     showProgress: true,
    //     steps: [
    //       {
    //         element: ".product_details_wrapper",
    //         popover: {
    //           title: "Animated Tour Example",
    //           description:
    //             "Here is the code example showing animated tour. Let's walk you through it.",
    //           side: "left",
    //           align: "start",
    //         },
    //       },
    //       {
    //         element: ".product_details_wrapper",
    //         popover: {
    //           title: "Animated Tour Example",
    //           description:
    //             "Here is the code example showing animated tour. Let's walk you through it.",
    //           side: "left",
    //           align: "start",
    //         },
    //       },
    //       {
    //         element: ".product_details_wrapper",
    //         popover: {
    //           title: "Animated Tour Example",
    //           description:
    //             "Here is the code example showing animated tour. Let's walk you through it.",
    //           side: "left",
    //           align: "start",
    //         },
    //       },
    //     ],
    //   });
    //   driverObj.drive();
    //   // driverObj.highlight({
    //   //   element: ".product_details_wrapper",
    //   //   popover: {
    //   //     title: "Animated Tour Example",
    //   //     description:
    //   //       "Here is the code example showing animated tour. Let's walk you through it.",
    //   //     side: "left",
    //   //     align: "start",
    //   //   },
    //   // });
    // });
    // return
    return {
      // productDetailsPage,
      // isAuthenticated,
      currentComponent,
      activeComponent,
      isBakery,
      getDetails,
      viewCart,
      productDetail,
      cartDetails,
      cartAdded,
      cartData,
      cartItems,
      itemDeleted,
      editCartItem,
      closeModel,
      searchedTerm,
      clearSearch,
      clearSearchValue,
    };
  },
});
</script>
<style lang="scss">
// animation
.overlay-enter-from {
  opacity: 0;
}
.overlay-enter-active {
  transition: all 0.35s ease-out;
}
.overlay-enter-to {
  opacity: 1;
}
.overlay-leave-from {
  opacity: 1;
}
.overlay-leave-active {
  transition: all 0.25s ease-out;
}
.overlay-leave-to {
  opacity: 0;
}
</style>

<!-- // --- previous approach for search ---
// console.log("worked", event);

// allBreakfastProduct.value = products?.value.filter(
//   (res: any) =>
//     res.title.toLowerCase().includes(event.toLowerCase()) &&
//     res.category == "breakfast"
// );
// allBakeryProduct.value = products?.value.filter(
//   (res: any) =>
//     res.title.toLowerCase().includes(event.toLowerCase()) &&
//     res.category == "bakery"
// ); -->
