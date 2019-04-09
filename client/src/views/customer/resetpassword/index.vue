<template>
  <div class="main position_relative">
    <div class="main--wrap position_absolute"></div>
    <div class="form--reset">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .main--wrap {
    bottom: 0;
    left: 0;
    min-width: 100%;
    max-width: 100%;
    min-height: 60%;
    background: url("~@/assets/wave.svg") no-repeat center;
    background-size: cover;
    img {
      width: 100%;
    }
  }
  .form--reset {
    position: absolute;
    padding: 3rem;
    top: 10%;
    left: 40%;
    z-index: +99;
    width: 25%;
    height: auto;
    border: 1px solid #cccccc;
    border-radius: 10px;
    background: #fff;
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .form--reset {
    left: 31% !important;
    width: 40% !important;
    padding: 30px !important;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .form--reset {
    left: 31% !important;
    width: 35% !important;
    padding: 30px 50px !important;
  }
}
@media screen and (min-width: 320px) and (max-width: 767px) {
  .main--wrap {
    display: none !important;
  }
  .form--reset {
    top: 10% !important;
    left: 10% !important;
    width: 80% !important;
    padding: 0 !important;
    border: none !important;
  }
}
</style>
