<template>
  <div class="search_bar_wrapper position-relative">
    <input
      type="search"
      placeholder="Search"
      class="form-control"
      v-model="searchedTerm"
      @input="$emit('searchedTerm', searchedTerm)"
    />
    <span
      class="material-symbols-outlined icon position-absolute top-50 end-0 translate-middle-y pe-2"
    >
      search
    </span>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from "vue";
export default {
  props: ["clearSearchValue"],
  setup(props: any) {
    const searchedTerm = ref();
    const clearFilter = computed(() => {
      return props.clearSearchValue;
    });
    watch(clearFilter, () => {
      // console.log(clearFilter.value);

      if (clearFilter.value == true) {
        searchedTerm.value = null;
      }
    });
    return { searchedTerm };
  },
};
</script>
