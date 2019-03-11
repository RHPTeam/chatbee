<template>
  <div class="popup--content position_fixed" :data-theme="currentTheme">
    <div class="popup position_relative">
      <div class="popup--body">
        <div
          class="main--content d_flex flex_column justify_content_center align_items_center"
        >
          <div class="img--content">
            <img :src="imageWelcomeThree" alt="images-page" />
          </div>
          <div class="main--content-title">Trò chuyện dễ dàng</div>
          <div class="main--content-sub mt_4">
            Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản. Thiết lập
            trả lời tin nhắn tự động theo kịch bản.
          </div>
          <div class="main--redirect d_flex align_items_center mt_4">
            <div class="main--redirect-item mr_2"></div>
            <div class="main--redirect-item mr_2"></div>
            <div class="main--redirect-item active"></div>
          </div>
          <div class="mt_4">
            <button class="main--content-button" @click="isPageFour = true">
              Tiếp theo
            </button>
          </div>
          <div class="main--content-back mt_4" @click="closePageThree">
            Trước
          </div>
        </div>
      </div>
      <!--End: Popup Body-->

      <!--Popup Page 3-->
      <transition name="changeTheme">
        <app-page-four
          v-if="isPageFour == true"
          :data-theme="currentTheme"
          :popupTheme="isPageFour"
          @closePageFour="isPageFour = $event"
        />
      </transition>
      <!--End: Popup Page 2-->
    </div>
  </div>
</template>

<script>
import AppPageFour from "./page_four";

export default {
  props: ["isPageThree"],

  data() {
    return {
      isPageFour: false,
      imageWelcomeThree: require("@/assets/images/welcome-3.png")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppPageFour
  },
  methods: {
    closePageThree: function() {
      this.$emit("closePageThree", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index_mobile.style";
</style>
