<template>
  <div class="footer mt_3">
    <div class="title text_left">Thêm phần tử</div>
    <div class="group d_flex align_items_center">
      <div
        class="item d_flex align_items_center justify_content_center flex_column"
        @click="openAddText"
      >
        <icon-base
          class="icon-text"
          width="20"
          height="20"
          viewBox="0 0 13.53 20.11"
        >
          <icon-text />
        </icon-base>
        Văn bản
      </div>

      <div
        class="item d_flex align_items_center justify_content_center flex_column"
      >
        <icon-base
          class="icon-image"
          width="20"
          height="20"
          viewBox="0 0 26 26"
        >
          <icon-image />
        </icon-base>
        Hình ảnh
      </div>
      <div
        class="item d_flex align_items_center justify_content_center flex_column"
      >
        <icon-base
          class="icon-sand-clock"
          width="20"
          height="20"
          viewBox="0 0 14.41 20.14"
        >
          <icon-sand-clock />
        </icon-base>
        Thời gian
      </div>
      <div
        class="item d_flex align_items_center justify_content_center flex_column"
      >
        <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
          <icon-plus />
        </icon-base>
        Thêm mới
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconPlus from "@/components/icons/IconPlus";
import IconSandClock from "@/components/icons/IconSandClock";
export default {
  data() {
    return {};
  },
  methods: {
    openAddText() {
      this.$emit("addText", true);
    }
  },
  components: {
    IconBase,
    IconImage,
    IconText,
    IconSandClock,
    IconPlus
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
