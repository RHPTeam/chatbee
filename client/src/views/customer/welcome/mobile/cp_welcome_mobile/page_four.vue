<template>
  <div class="popup--content position_fixed">
    <div class="popup position_relative">
      <!--Start: Popup Header-->
      <div class="popup--wrapper">
        <div
                class="popup--header"
        >
        </div>
      </div>
      <!--End: Popup Header-->
      <div class="popup--wrap-head position_absolute"></div>
      <!--Start: Popup Body-->
      <div class="popup--body">
        <div
                class="main--content d_flex flex_column justify_content_center align_items_center"
        >
          <div class="img--content"></div>
          <div class="main--content-title">Welcome to Zinbee</div>
          <div class="main--content-sub">Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            Thiết lập trả lời tin nhắn tự động theo kịch bản. Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            Thiết lập trả lời tin nhắn tự động theo kịch bản. Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            Thiết lập trả lời tin nhắn tự động theo kịch bản. Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            Thiết lập trả lời tin nhắn tự động theo kịch bản. Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            Thiết lập trả lời tin nhắn tự động theo kịch bản.
          </div>
          <input type="button" class="main--content-button" value="Đi tới trang chủ">
          <input @click="isPageThree = true" type="button" class="main--content-button-back" value="TRƯỚC">
        </div>
      </div>
      <!--End: Popup Body-->


      <!--Popup Page 4-->
      <transition name="changeTheme">
        <app-page-three
                v-if="isPageThree == true"
                :data-theme="currentTheme"
                :popupPassword="isPageThree"
                @closePageFour="isPageThree = $event"
        />
      </transition>
      <!--End: Popup Page 4-->

    </div>
  </div>
</template>

<script>
     import AppPageThree from "./page_three";

    export default {
        props: ["isPageFour"],
        data() {
            return {
                isPageThree: false,
            }
        },
        computed: {
            currentTheme() {
                return this.$store.getters.themeName;
            }
        },
        components: {
            AppPageThree
        },
        methods: {
            closePageThree: function() {
                this.$emit("closePageFour", false);
            }
        }
    };
</script>
<style lang="scss" scoped>
  @import "page_four.style";
</style>
