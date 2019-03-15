<template>
  <div class="chatarea" :data-theme="currentTheme">
    <div class="chatarea--history">
      <div class="receive d_flex justify_content_start align_items_end">
        <div class="user--send">
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="30"
            alt="User Avatar"
          />
        </div>
        <div class="message message--receive">
          <div class="message--item">Lorem ipsum dolor sit amet</div>
          <div class="message--item">Lorem ipsum dolor sit amet</div>
          <div class="message--item">Lorem ipsum dolor sit amet</div>
          <!-- <app-gallery/> -->
        </div>
      </div>
      <div class="send d_flex justify_content_end align_items_end">
        <div class="message message--send">
          <div class="message--item">Lorem ipsum dolor sit amet</div>
          <app-gallery />
          <div class="message--item">Lorem ipsum dolor sit amet</div>
        </div>
        <div class="user--seen">
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="15"
            alt="User Avatar"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppMessage from "./chatarea/message";
import AppGallery from "./chatarea/gallery";
export default {
  components: {
    // AppMessage,
    AppGallery
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./chatarea/style";
</style>
