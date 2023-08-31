<template>
  <div class="details_wrapper card shadow p-4 position-relative" @click.stop>
    <div class="product_image_wrapper product_details rounded">
      <img :src="productDetail.imageUrl" alt="" />
    </div>
    <h3 class="mt-4">{{ productDetail.title }}</h3>
    <p class="mt-2">{{ productDetail.description }}</p>
    <div class="d-flex justify-content-between">
      <span class="fw-semibold">Price: ${{ productDetail.price }}</span>
      <div class="me-2">Total Price : ${{ price }}</div>
    </div>
    <div class="my-2 row">
      <div class="col-sm-4 col-12 d-flex">
        <div class="row gx-0">
          <div class="col-6">
            <form action="" class="me-1">
              <input
                type="number"
                class="form-control me-3"
                v-model="quantity"
              />
            </form>
          </div>
          <div class="col-6 d-flex">
            <div class="me-1">
              <button class="btn btn-secondary" @click="removeQuantity">
                <span>-</span>
              </button>
            </div>
            <div class="">
              <button class="btn btn-secondary" @click="addQuantity">
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-sm-8 col-12 mt-3 mt-sm-0 d-flex align-items-center justify-content-between"
      >
        <button class="btn btn-primary px-4 flex-grow-1" @click="addToCart">
          {{ isEdit ? "Edit" : "Add to cart" }}
        </button>
      </div>
    </div>
    <!-- close button  -->
    <div class="position-absolute primary_close_btn">
      <span class="material-symbols-outlined icon" @click="closeModel">
        close
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";
import { ref, watch, computed } from "vue";
import productService from "@/views/product/service/product.services";
export default {
  props: ["productDetail"],
  emits: ["cartAdded", "closeModel"],
  setup(props: any, context: any) {
    const store = useStore();
    const quantity = ref();
    const price = ref();
    quantity.value = 1;
    watch(
      quantity,
      () => {
        if (quantity.value >= 10) {
          quantity.value = 10;
        } else if (quantity.value <= 1) {
          quantity.value = 1;
        }
        // console.log(quantity.value);
      },
      { immediate: true }
    );

    const prices = computed(() => {
      return props.productDetail.price;
    });
    // watch(prices, () => {
    //   console.log(prices);

    price.value = prices.value;
    // });

    function addQuantity() {
      if (quantity.value <= 9) {
        quantity.value += 1;
        price.value = prices.value * quantity.value;
      } else {
        quantity.value = 10;
      }
    }
    // comment
    function removeQuantity() {
      if (quantity.value >= 2) {
        quantity.value -= 1;
        price.value = prices.value * quantity.value;
      } else {
        quantity.value = 1;
      }
    }

    // if product details comes from cart details component
    const isEdit = computed(() => {
      return props.productDetail.id.length > 5;
    });

    /**
     * Add To Cart Product
     */
    async function addToCart() {
      try {
        await productService
          .addToCart({
            ...props.productDetail,
            quantity: quantity.value,
            totalPrice: price.value,
          })
          .then((res) => {
            console.log(res);
          });

        await productService.getCartData().then((res: any) => {
          store.dispatch("products/getCartData", res);
        });

        // emitting this to close details overlay
        setTimeout(() => {
          context.emit("cartAdded", true);
        }, 500);
      } catch (error) {
        // props.productDetail = null;
      }
    }
    // user click to edit cart data
    onMounted(() => {
      if (props.productDetail.quantity) {
        quantity.value = props.productDetail.quantity;
      }
    });
    function closeModel() {
      context.emit("closeModel");
    }
    return {
      quantity,
      price,
      addQuantity,
      removeQuantity,
      addToCart,
      isEdit,
      closeModel,
    };
  },
};
</script>

<!-- /**
/for none duplicate cart data 
*/

// const cartData = ref();
// const product = ref();
// productService.getCartData().then((res: any) => {
//   store.dispatch("products/getCartData", res);
//   cartData.value = store.getters["products/cartData"];
// }); -->

<!-- // await cartData.value.forEach((res: any) => {
  //   if (props.productDetail.id == res.productId) {
  //     const updateQuantity = res.quantity + quantity.value;
  //     const updatedTotalPrice = res.totalPrice + price.value;
  //     product.value = {
  //       ...props.productDetail,
  //       quantity: updateQuantity,
  //       totalPrice: updatedTotalPrice,
  //       editId: res.id,
  //     };
  //     console.log("matched");
  //   } else {
  //     product.value = {
  //       ...props.productDetail,
  //       quantity: quantity.value,
  //       totalPrice: price.value,
  //     };
  //   }
  // }); -->

<!-- // await store.dispatch("products/getCartData");

        // --- previous approach ---

        // store.dispatch("products/addToCart", {
        //   ...props.productDetail,
        //   quantity: quantity.value,
        //   totalPrice: price.value,
        // }); -->
