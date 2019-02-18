<template>
  <div class="main">
    <div class="r no_g">
      <div class="c_12 c_md_8 c_xl_8 main--left">
        <div class="main--text">
          <h1>500</h1>
          <p>Oops ! We can't seem to find the page you're looking for</p>
          <div class="main--text-info">
            Dont worry, our development team have automaticaly been notified of
            this issue and they are working on it. Please try again in afew
            minutes.
          </div>
        </div>
      </div>
      <div class="d_none d_lg_block c_12 c_md_4 c_xl_4 position_relative">
        <div class="bg_svg position_absolute">
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

<style scoped>
.main {
  font-family: "Segoe UI Semibold";
  width: 100%;
  min-height: 100vh;
}
.main--left {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #000000;
}
.main--text {
  position: absolute;
  top: 33%;
  left: 16%;
  width: 60%;
}
.main--text h1 {
  font-size: 60px;
  color: #fff;
}
.main--text p {
  font-size: 40px;
  color: #fff;
}
.main--text button {
  background: #ffb94a;
  padding: 8px 30px;
  text-transform: uppercase;
}
.main--text-info {
  font-family: "Segoe UI";
  color: #fff;
}
.bg_svg {
  top: 31%;
  left: 35%;
}
</style>
