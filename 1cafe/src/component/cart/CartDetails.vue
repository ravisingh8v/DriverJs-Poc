<template>
  <div class="h-100 w-100 d-flex justify-content-end">
    <div
      class="cart_details justify-content-between card rounded-0 shadow overflow-auto"
      @click.stop
    >
      <div class="overflow-auto">
        <!-- title  -->
        <div
          class="p-4 d-flex justify-content-between position-sticky top-0 bg-white"
          style="z-index: 200"
        >
          <h3 class="fs-2">My Orders</h3>
          <span
            class="cp close_button material-symbols-outlined icon"
            @click="$emit('close')"
            >close</span
          >
        </div>
        <!-- items  -->
        <transition-group
          tag="div"
          mode="out-in"
          class="mt-4 position-relative px-4 overflow-hidden"
          name="cart"
        >
          <!-- cart 1 -->
          <!-- <div v-if="carts"> -->
          <!-- no Data found -->
          <div v-if="noDataFound && show" class="text-center">
            No Item Found
          </div>
          <CartDetailsItem
            v-for="(cart, index) in carts"
            :key="cart.id.toString()"
            :cart="cart"
            :index="index"
            @deleteItem="deleteItem"
            @editItem="$emit('editItem', $event)"
          ></CartDetailsItem>
          <!-- </div> -->
          <!-- break line  -->
          <div
            v-if="show && carts"
            :key="'horizontal'"
            class="border-top mt-3 horizontal_line"
          ></div>

          <!-- subtotal -->
          <div
            v-if="show && carts && !noDataFound"
            :key="'subTotal'"
            class="d-flex justify-content-between px-4 p-2"
          >
            <span>Subtotal</span>
            <span>${{ subTotal }}</span>
          </div>
          <!-- div to help in transition smoother  -->
          <div class="py-5" key="space"></div>
        </transition-group>
      </div>
      <!-- bottom  -->
      <!-- checkout -->
      <div class="p-4">
        <button class="w-100 checkout btn btn-primary">Checkout</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, watch, Ref } from "vue";
import { useStore } from "vuex";
import CartDetailsItem from "./CartDetailsItem.vue";
import { Cart } from "./model/CartModel";
import productService from "@/views/product/service/product.services";
export default {
  components: { CartDetailsItem },
  props: {
    cartData: {
      type: Object,
    },
  },
  setup(props: any, context: any) {
    const store = useStore();

    // calling get cart data service
    productService.getCartData().then((res: Cart[]) => {
      store.dispatch("products/getCartData", res);
    });

    // subtotal price
    const subTotal: Ref<number> = ref(0);
    const totalPrice = computed(() => {
      let total = 0;
      for (const key in props.cartData) {
        total += props.cartData[key].totalPrice;
      }
      return total;
    });
    // watch on total price changes
    watch(
      totalPrice,
      () => {
        subTotal.value = totalPrice.value;
      },
      { immediate: true }
    );

    // getting props data into another variable to perform some local operation

    const carts: Ref<Cart[]> = ref([]);

    const cartData: Ref<Cart[]> = computed(() => {
      return props.cartData;
    });
    watch(cartData, () => {
      carts.value = cartData.value.reverse();
    });

    // calling method delete cart item
    const noDataFounds = computed(() => {
      // console.log(carts.value.length);
      if (carts.value.length == 0) {
        return true;
      } else {
        return false;
      }
    });
    const noDataFound = ref(false);
    watch(
      noDataFounds,
      () => {
        noDataFound.value = noDataFounds.value;
      },
      { immediate: true }
    );
    // function checkCartData(value: Cart[]) {
    //   console.log(value);

    //   value.length == 0
    //     ? (noDataFound.value = true)
    //     : (noDataFound.value = false);
    // }
    // checkCartData(carts.value);

    async function deleteItem(id: number) {
      try {
        productService.deleteCartItem(id);
        // store.dispatch("products/deleteCartItem", id);
        const index = carts.value.findIndex((data: any) => data.id === id);
        carts.value.splice(index, 1);
        context.emit("itemDeleted", carts.value.length);
        // checkCartData(carts.value);
      } catch (e: any) {
        // console.log("error");
      }
    }
    // to hide the Element
    const show = ref(false);
    setTimeout(() => {
      show.value = true;
    }, 1000);
    return { subTotal, deleteItem, carts, show, noDataFound };
  },
};
</script>
<style lang="scss" scoped>
// cart animation
.cart-enter-from {
  transform: translateX(-200px);
  opacity: 0;
}
.cart-enter-to {
  opacity: 1;
}
.cart-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.cart-enter-active {
  transition: all 0.35s ease-out;
}
.cart-leave-active {
  transition: all 0.35s ease-in;
  position: absolute;
  width: 100%;
}
.cart-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.cart-move {
  transition: all 0.8s ease;
}
</style>
