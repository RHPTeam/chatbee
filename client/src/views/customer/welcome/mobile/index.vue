<template>
  <div class="popup--content position_fixed" :data-theme="currentTheme">
    <div class="popup position_relative">
      <div class="popup--body">
        <div
          class="main--content d_flex flex_column justify_content_center align_items_center"
        >
          <div class="img--content">
            <img :src="imagesPage" alt="images-page" />
          </div>
          <div class="main--content-title">Tự động trả lời</div>
          <div class="main--content-sub mt_4">
            Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản. Thiết lập
            trả lời tin nhắn tự động theo kịch bản.
          </div>
          <div class="main--redirect d_flex align_items_center mt_4">
            <div class="main--redirect-item active mr_2"></div>
            <div class="main--redirect-item mr_2"></div>
            <div class="main--redirect-item"></div>
          </div>
          <div class="mt_4">
            <button class="main--content-button" @click="isPageTwo = true">
              Tiếp theo
            </button>
          </div>
        </div>
      </div>
      <!--End: Popup Body-->

      <!--Popup Page 2-->
      <transition name="changeTheme">
        <app-page-two
          v-if="isPageTwo == true"
          :data-theme="currentTheme"
          :popupTheme="isPageTwo"
          @closePageTwo="isPageTwo = $event"
        />
      </transition>
      <!--End: Popup Page 2-->
    </div>
  </div>
</template>
<script>
import AppPageTwo from "./cp_welcome/page_two";

export default {
  data() {
    return {
      isPageTwo: false,
      isPageThree: false,
      isPageFour: false,
      imagesPage: require("@/assets/images/welcome-1.png")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppPageTwo
  }
};
</script>
<style lang="scss" scoped>
@import "./index_mobile.style";
</style>
