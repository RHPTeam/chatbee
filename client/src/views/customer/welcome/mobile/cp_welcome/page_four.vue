<template>
  <div class="popup--content position_fixed" :data-theme="currentTheme">
    <div class="popup position_relative">
      <div class="popup--body">
        <div
          class="main--content d_flex flex_column justify_content_center align_items_center"
        >
          <div class="img--content">
            <img :src="imageWelcomeFinal" alt="images-page" />
          </div>
          <div class="main--content-title">Welcome to Zinbee</div>
          <div class="main--content-sub mt_4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam aliquid consequuntur dolorem eum excepturi facilis harum iste, laborum minima minus modi necessitatibus nulla officiis quaerat quis voluptatum. Consequatur cupiditate debitis, dolorem dolorum eaque, exercitationem illum iure, necessitatibus non perspiciatis qui quisquam tempora tenetur! Architecto autem deserunt eaque eos ex fuga, harum rerum sequi. A earum esse minima necessitatibus totam.
          </div>
          <div class="mt_4">
            <button class="main--content-button button--end">Đi tới trang chủ</button>
          </div>
          <div class="main--content-back mt_4" @click="closePageFour">Trước</div>
        </div>
      </div>
      <!--End: Popup Body-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["isPageFour"],
  data() {
    return {
      isPageThree: false,
      imageWelcomeFinal: require("@/assets/images/welcome-4.png")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePageFour: function() {
      this.$emit("closePageFour", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index_mobile.style";
</style>
