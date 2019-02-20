<template>
  <div class="main d_flex justify_content_center align_items_center">
    <div class="r">
      <div class="c_12 c_md_8 c_xl_8 main--left">
        <div
          class="main--text d_flex align_items_center justify_content_center"
        >
          <div>
            <h1>500</h1>
            <p>Oops! There was internal server error.</p>
            <div class="main--text-info">
              Dont worry, our development team have automaticaly been notified
              of this issue and they are working on it. Please try again in afew
              minutes.
            </div>
          </div>
        </div>
      </div>
      <div class="d_lg_block c_12 c_md_4 c_xl_4">
        <div class="bg_svg  d_flex align_items_center justify_content_center">
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

<style scoped lang="scss">
@import "./index.style";
</style>
