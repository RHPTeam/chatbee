<template>
  <div class="popup-theme position_fixed">
    <div class="popup--wrapper">
      <!--Popup Header-->
      <!--Start: Popup Header-->
      <div
        class="popup--header d_flex justify_content_between align_items_center"
      >
        <div class="popup--header-back" @click="closeChangeTheme">
          <icon-base
            icon-name="logo-short"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <icon-arrow-left />
          </icon-base>
        </div>
        <div class="popup--header-title text_left">
          <span>Chủ đề</span>
        </div>
        <div class="popup--header-action">
          <span>Lưu</span>
        </div>
      </div>
      <!--End: Popup Header-->
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
          <div class="images--theme-item">
            <div class="images--theme-child text_left">
              <img :src="imageLight" alt="" />
              <p class="text_center">Sáng</p>
            </div>
          </div>
          <div class="images--theme-item flex_column">
            <div class="images--theme-child text_right ml_auto">
              <img :src="imageDark" alt="" />
              <p class="text_center">Tối</p>
            </div>
          </div>
        </div>
        <!--Option theme light-->
        <div class="theme--option text_left mb_4">
          <div class="divide--theme mb_3">Chủ đề sáng</div>
          <check-radio statusCheckRadio="Luôn luôn" />
          <div class="check--theme-about d_flex">
            <check-radio />
            <div class="check--theme-hours mt_1 ml_1">
              <span>Từ</span>
              <input type="text" value="4:00" />
              <span>đến</span>
              <input type="text" value="17:00" />
            </div>
          </div>
        </div>
        <!--Option theme dark-->
        <div class="theme--option text_left">
          <div class="divide--theme mb_3">Chủ đề tối</div>
          <check-radio statusCheckRadio="Luôn luôn" />
          <div class="check--theme-about d_flex">
            <check-radio />
            <div class="check--theme-hours mt_1 ml_1">
              <span>Từ</span>
              <input type="text" value="4:00" />
              <span>đến</span>
              <input type="text" value="17:00" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import CheckRadio from "@/components/shared/UI_library/radio";
export default {
  props: ["isChangeTheme"],
  data() {
    return {
      imageLight: require("@/assets/images/theme-light-setting.png"),
      imageDark: require("@/assets/images/theme-dark-setting.png")
    };
  },
  methods: {
    closeChangeTheme: function() {
      this.$emit("closeChangeTheme", false);
    }
  },
  components: {
    IconBase,
    IconArrowLeft,
    CheckRadio
  }
};
</script>
<style lang="scss" scoped>
@import "./account_change_mobile.style";
</style>
