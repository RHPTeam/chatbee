<template>
  <div class="main position_relative">
    <div class="main--wrap position_absolute">
      <!--<img :src="`${base}images/svg/Path-22.svg`" alt="" />-->
    </div>
    <div class="form--reset p_5">
        <step1/>
    </div>
  </div>
</template>
<script>
    import  Step1 from "./components/step1-form";
export default {
  data() {
      return {
      base: process.env.BASE_URL
      // bgImage: require("@/assets/Path-22.svg")
      // :style="{ 'background-image': 'url(' + bgImage + ');' }"
    };
  },
  components: {
    Step1,
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
.main--wrap {
  bottom: 0;
  left: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 60%;
  background: url("~@/assets/Path-22.svg") no-repeat center;
  background-size: cover;
}
.main--wrap img {
  width: 100%;
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
</style>
