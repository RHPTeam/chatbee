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
      <input type="text" placeholder="Nhập tên nhóm, từ khóa, hoặc tên kịch bản" />
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconInputSearch from "@/components/icons/IconInputSearch";
export default {
  components: {
    IconBase,
    IconInputSearch
  }
};
</script>

<style scoped lang="scss">
@import "../../auto_sidebar.style";
</style>
