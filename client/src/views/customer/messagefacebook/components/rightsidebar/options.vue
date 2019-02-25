<template>
  <div class="option">
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
  components: {
    IconBase,
    IconInputSearch,
    IconRemove
  }
};
</script>

<style scoped lang="scss">
.option {
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  .option--desc {
    font-size: 12px;
    color: #999;
    margin-top: -5px;
  }
  .option--item {
    margin-top: 20px;
    .option--item-icon {
      color: #ffb94a;
      margin-right: 10px;
      height: 20px;
    }
    .option--item-name {
      font-size: 14px;
      color: #444;
    }
  }
}
</style>
