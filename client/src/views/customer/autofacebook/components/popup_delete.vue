<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <img :src="imageLogo" width="136" height="70" alt="" />
        </div>
        <div class="modal--body">
          <div class="modal--desc">
            Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không
            ?
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-add" @click="closeDeletePopup">
            Hủy
          </button>
          <button class="btn-skip">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showModal"],
  data() {
    return {
      imageLogo: require("@/assets/images/register--logo.png")
    };
  },
  methods: {
    closeDeletePopup() {
      this.$emit("closeDeletePopup", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../auto_sidebar.style";
</style>
