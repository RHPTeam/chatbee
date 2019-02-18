<template>
  <div class="main position_relative">
    <div class="main--wrap position_absolute">
      <!--<img :src="`${base}images/svg/Path-22.svg`" alt="" />-->
    </div>
    <div class="form--reset p_3">
      <step1 />
      <!--<step2 />-->
      <!--<step3 />-->
    </div>
  </div>
</template>
<script>
import Step1 from "./components/step1/index";
import Step2 from "./components/step2/index";
import Step3 from "./components/step3/index";
export default {
  components: {
    Step1,
    Step2,
    Step3
  }
};
</script>
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
    background: url("~@/assets/Path-22.svg") no-repeat center;
    background-size: cover;
    img {
      width: 100%;
    }
  }
  .form--reset {
    position: absolute;
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
@media screen and (min-width: 768px) {
  .form--reset {
    left: 31% !important;
    width: 40% !important;
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
    border: none !important;
  }
}
</style>
