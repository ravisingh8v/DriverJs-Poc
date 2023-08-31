<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <Transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h5>{{ title }}</h5>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <button class="btn btn-outline-danger" @click="tryClose">
              {{ button ? button : "Close" }}
            </button>
          </slot>
        </menu>
      </dialog>
    </Transition>
  </teleport>
</template>

<script lang="ts">
import { string } from "yup";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    button: {
      type: string,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],

  setup(props: any, context: any) {
    function tryClose() {
      if (props.fixed) {
        return;
      }
      context.emit("close");
    }
    return { tryClose };
  },
};
</script>

<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30rem;
  z-index: 100;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  @media (max-width: 576px) {
    width: 20rem;
  }
  header {
    background-color: $danger;
    color: white;
    width: 100%;
    padding: 1rem;
    header h2 {
      margin: 0;
    }
  }
  section {
    padding: 1rem;
  }
  menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
  }
}

// @media (min-width: 768px) {
//   dialog {
//     left: calc(50% - 20rem);
//     width: 40rem;
//   }
// }

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  //   transform: scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  //   transform: scale(1);
}
.dialog-enter-active {
  transition: all 0.2s ease-out;
  //   transition: opacity 0.2s ease-out;
}

.dialog-leave-active {
  transition: all 0.2s ease-in;
  //   transition: opacity 0.2s ease-in;
}
</style>
