<template>
  <div class="message text_left" :data-theme="currentTheme">
    <div class="d_flex justify_content_between align_items_center">
      <div class="message--desc">Nội dung tin nhắn</div>
      <div class="user--list position_relative">
        <div
          class="user--current"
          @click.prevent="statusDropdown = !statusDropdown"
        >
          <img
            src="http://binhruamuirinorin.com/wp-content/uploads/2016/11/girl-512.png"
            width="30"
            alt="User Image"
          />
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="statusDropdown" class="user--dropdown show">
            <div
              class="selected user--item d_flex justify_content_start align_items_center"
            >
              <img
                src="http://binhruamuirinorin.com/wp-content/uploads/2016/11/girl-512.png"
                width="30"
                alt="User Image"
              />
              <div class="user--item-name">Đặng Yến</div>
            </div>
            <div
              class="user--item d_flex justify_content_start align_items_center"
            >
              <img
                src="https://www.shareicon.net/download/2015/09/18/103158_user_512x512.png"
                width="30"
                alt="User Image"
              />
              <div class="user--item-name">Lê Chi</div>
            </div>
            <div
              class="user--item d_flex justify_content_start align_items_center"
            >
              <img
                src="http://binhruamuirinorin.com/wp-content/uploads/2016/11/girl-512.png"
                width="30"
                alt="User Image"
              />
              <div class="user--item-name">Đặng Yến</div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="message--content">
      <VuePerfectScrollbar class="message--scroll">
        <div
          contenteditable="true"
          class="message--content-detail"
          placeholder="Nhập nội dung tin nhắn"
        ></div>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      statusDropdown: false
    };
  }
};
</script>

<style scoped lang="scss">
@import "./message";
</style>
