<template>
  <div class="popup--content position_fixed" :data-theme="currentTheme">
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
                class="main--content d_flex flex_column justify_content_center align_items_center p_4"
        >
          <div class="img--content"></div>
          <div class="main--content-title">Tự động trả lời</div>
          <div class="main--content-sub mt_4 mb_4">Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
          <br/>
            Thiết lập trả lời tin nhắn tự động theo kịch bản.
          </div>
          <input @click="isPageTwo = true" type="button" class="main--content-button mb_4" value="TIẾP ">
        </div>
      </div>
      <!--End: Popup Body-->

      <!--Popup Page 2-->
      <transition name="changeTheme">
        <app-page-two
                v-if="isPageTwo == true"
                :data-theme="currentTheme"
                :popupTheme="isPageTwo"
                @closePageTwo="isPageTwo = $event
"
        />
      </transition>
      <!--End: Popup Page 2-->

      <!--Popup Page 3-->
      <transition name="changeTheme">
        <app-change-password
                v-if="isChangePassword == true"
                :data-theme="currentTheme"
                :popupPassword="isChangePassword"
                @closeChangePassword="isChangePassword = $event"
        />
      </transition>
      <!--End: Popup Page 3-->

      <!--Popup Page 4-->
      <transition name="changeTheme">
        <app-change-password
                v-if="isChangePassword == true"
                :data-theme="currentTheme"
                :popupPassword="isChangePassword"
                @closeChangePassword="isChangePassword = $event"
        />
      </transition>
      <!--End: Popup Page 4-->
    </div>
  </div>
</template>
<script>
    import AppPageTwo from "./cp-welcome_mobile/page_two";

    export default {
    data() {
      return {
        isPageTwo: false,
        isPageThree: false,
        isPageFour: false
      }
    },
    computed: {
      currentTheme() {
        return this.$store.getters.themeName;
      }
    },
    components: {
        AppPageTwo
    }
  }
</script>
<style lang="scss" scoped>
  @import "./index_mobile.style";
</style>
