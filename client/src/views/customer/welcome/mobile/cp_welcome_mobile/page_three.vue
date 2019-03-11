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
          <div class="main--content-title">Trò chuyện dễ dàng</div>
          <div class="main--content-sub mt_4 mb_4">Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            <br/>
            Thiết lập trả lời tin nhắn tự động theo kịch bản.
          </div>
          <input @click="isPageFour = true" type="button" class="main--content-button" value="Tiếp Theo">
          <input @click="isPageTwo = true" type="button" class="main--content-button-back" value="TRƯỚC">
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

      <!--Popup Page 4-->
      <transition name="changeTheme">
        <app-page-four
                v-if="isPageFour == true"
                :data-theme="currentTheme"
                :popupPassword="isPageFour"
                @closePageFour="isPageFour = $event"
        />
      </transition>
      <!--End: Popup Page 4-->

    </div>
  </div>
</template>

<script>
    import AppPageFour from "./page_four";
    import AppPageTwo from "./page_two";

    export default {
        props: ["isPageThree"],

        data() {
            return {
                isPageFour: false,
                isPageTwo: false,
            }
        },
        computed: {
            currentTheme() {
                return this.$store.getters.themeName;
            }
        },
        components: {
            AppPageFour,
            AppPageTwo
        },
        methods: {
            closePageThree: function() {
                this.$emit("closePageThree", false);
            }
        }
    };
</script>
<style lang="scss" scoped>
  @import "page_three.style";
</style>
