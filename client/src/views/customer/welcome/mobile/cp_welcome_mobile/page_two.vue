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
          <div class="main--content-title">Chiến dịch truyền thông</div>
          <div class="main--content-sub mt_4 mb_4">Cho phép thiết lập tin nhắn trả lời tự động theo kịch bản.
            <br/>
            Thiết lập trả lời tin nhắn tự động theo kịch bản.
          </div>
          <input @click="isPageThree = true" type="button" class="main--content-button" value="Tiếp Theo">
          <input type="button" class="main--content-button-back" value="TRƯỚC">
        </div>
      </div>
      <!--End: Popup Body-->


      <!--Popup Page 3-->
      <transition name="changeTheme">
        <app-page-three
                v-if="isPageThree == true"
                :data-theme="currentTheme"
                :popupPassword="isPageThree"
                @closePageThree="isPageThree = $event"
        />
      </transition>
      <!--End: Popup Page 3-->

    </div>
  </div>
</template>

<script>
// import AppPageThree from "/page_three";

export default {
  props: ["isPageTwo"],
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
      // AppPageThree
  },
  methods: {
    closePageTwo: function() {
      this.$emit("closePageTwo", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "page_two.style";
</style>
