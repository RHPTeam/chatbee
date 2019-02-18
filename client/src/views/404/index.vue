<template>
  <div class="main">
    <div class="r no_g">
      <div class="c_12 c_md_6 c_xl_6 main--left">
        <div class="main--text">
          <h1>404</h1>
          <p>Xin lỗi! Trang bạn truy cập hiện không khả dụng</p>
          <router-link tag="button" class="btn btn_dark" to="/"
            >Quay về trang chủ</router-link
          >
        </div>
      </div>
      <div class="d_none d_lg_block c_12 c_md_6 c_xl_6">
        <div class="bg_svg">
          <img :src="`${base}images/svg/chatBee-404.svg`" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      base: process.env.BASE_URL
    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  font-family: "Quicksand", sans-serif;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  .main--left {
    background-color: #000;
    .main--text {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      height: 100%;
      margin-top: 40%;
      h1 {
        color: #373737;
        font-size: 82px;
      }
      p {
        font-size: 24px;
      }
    }
  }
}
</style>
