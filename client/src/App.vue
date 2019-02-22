<template>
  <div id="app">
    <VuePerfectScrollbar class="scroll-area">
      <router-view />
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  created() {
    console.log(
      "%cDừng lại!",
      "font-family: Arial, san-serif; color: red; font-size:75px; font-weight: 900;"
    );
    console.log(
      '%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Chatbee hoặc "hack" tài khoản của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào tài khoản Chatbee của bạn.',
      "font-size: 20px"
    );
    console.log(
      "%cXem https://www.chatbee.vn/devlopers-guide để biết thêm thông tin.",
      "font-size: 20px"
    );
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .scroll-area {
    position: relative;
    height: 100vh;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
