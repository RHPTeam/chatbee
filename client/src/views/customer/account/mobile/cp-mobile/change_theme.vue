<template>
  <div class="popup-theme position_fixed">
    <div class="popup--wrapper">
      <!--Popup Header-->
      <div
        class="header--change-theme d_flex justify_content_between align_items_center"
      >
        <div class="popup--change-back">Chủ đề</div>
        <div class="popup--change-action">Lưu</div>
      </div>
      <!--Popup Content-->
      <div class="popup--change-content">
        <div class="form_group form_inline">
          <label>Tự động điều chỉnh</label>
          <div class="group--radio ml_auto">
            <input id="checkboxTheme" class="radio" type="checkbox" />
            <label for="checkboxTheme"></label>
          </div>
        </div>
        <div
          class="images--theme d_flex align_items_center justify_content_center"
        >
          <div class="images--theme-light">
            <icon-base
              icon-name="icon-light"
              width="165"
              height="120"
              viewBox="0 0 21 21"
            >
              <icon-light />
            </icon-base>
            <p>Light</p>
          </div>
          <div class="images--theme-dark">
            <icon-base
              icon-name="icon-light"
              width="165"
              height="120"
              viewBox="0 0 21 21"
            >
              <icon-light />
            </icon-base>
            <p>Dark</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconLight from "@/components/icons/IconLight";
export default {
  // props: ["isChangeTheme"],
  // methods: {
  //   closeChangeTheme:function() {
  //     this.$emit("closeChangeTheme", false);
  //   }
  // },
  components: {
    IconBase,
    IconLight
  }
};
</script>
<style lang="scss" scoped>
/*@import "../index_mobile.style";*/
</style>
