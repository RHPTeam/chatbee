<template>
  <div class="auto--search mb_4">
    <div class="input--wrap position_relative">
      <div class="search--icon position_absolute">
        <icon-base
          icon-name="input-search"
          width="16.772"
          height="17.287"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
      <input
        type="text"
        v-model="searchCom"
        placeholder="Nhập tên nhóm, từ khóa, hoặc tên kịch bản"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    search: String
  },
  computed: {
    searchCom: {
      get() {
        return this.search;
      },
      set(value) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../auto_facebook.style";
</style>
