<template>
  <div class="popup--change position_fixed">
    <div class="popup--change-wrapper d_flex align_items_center p_3">
      <div class="popup--change-desc">
        Vừa có sự thay đổi, bạn có muốn lưu lại không?
      </div>
      <div class=" d_flex ml_auto">
        <div class="popup--change-reset mr_2">
          <button
            type="reset"
            class="btn--change btn-reset"
            @click="closePopupChangeInfo"
          >
            Hủy bỏ
          </button>
        </div>
        <div class="popup--change-save">
          <button type="submit" class="btn--change btn-save">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showPopupChangeInfo"],
  methods: {
    closePopupChangeInfo() {
      this.$emit("closePopupChangeInfo", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./popup.style";
</style>
