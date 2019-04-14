<template>
  <div class="video--wrap d_flex flex_column align_items_center justify_content_between">
    <div class="login--video-desc m_auto text_left">
      <div>
        <h3 class="m_0">Bán hàng Online ...</h3>
        <p class="pl_5">siêu hiệu quả , thảnh thơi cùng Zinbee</p>
      </div>
      <div class="desc pl_3">
        " Khách hàng sẽ quên những điều bạn làm. Nhưng họ sẽ không bao giờ quên những cảm nhận mà bạn mang đến cho họ. "
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      srcDefaultLogin: require("@/assets/images/message/images-login.jpg")
    }
  }
};
</script>

<style scoped lang="scss">
.video--wrap {
  font-family: "Open Sans", sans-serif;
  min-height: 100vh;
  .login--video-desc {
    color: #fdffe9;
    padding: 1rem 3rem;
    width: 68%;
    h3 {
      font-size: 3rem;
      font-weight: bold;
      line-height: 1.33;
    }
    .desc {
      color: #ffb94a;
      font-style: italic;
    }
  }
}
</style>
