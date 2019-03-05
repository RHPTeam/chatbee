<template>
  <div class="option text_left" :data-theme="currentTheme">
    <div class="option--desc">Tùy chọn</div>
    <div class="option--item d_flex justify_content_start align_items_center">
      <div class="option--item-icon">
        <icon-base
          icon-name="input-search"
          width="20"
          height="20"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
      <div class="option--item-name">Tìm kiếm trong cuộc trò chuyện</div>
    </div>
    <div class="option--item d_flex justify_content_start align_items_center">
      <div class="option--item-icon">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 16.772 17.287"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="option--item-name">Xóa nội dung cuộc trò chuyện</div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconInputSearch from "@/components/icons/IconInputSearch";
import IconRemove from "@/components/icons/IconRemove";
export default {
  props: ["currentTheme"],
  components: {
    IconBase,
    IconInputSearch,
    IconRemove
  }
};
</script>
<style lang="scss" scoped>
.option {
  padding: 16px;
  border-bottom: 1px solid #707070;
  border-top: 1px solid #707070;
  .option--desc {
    font-size: 12px;
  }
}
.option--item {
  padding: 13px 0;
  .option--item-icon {
    color: #ffb94a;
    margin-right: 16px;
    height: 20px;
  }
  .option--item-name {
    font-size: 14px;
  }
}
//Change Theme
.option[data-theme="light"] {
  .option--desc {
    color: #999;
  }
}

.option[data-theme="dark"] {
  .option--desc {
    color: #ccc;
  }
}
</style>
