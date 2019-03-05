<template>
  <div class="main d_flex justify_content_center align_items_center">
    <div class="r">
      <div class="c_12 c_md_8 c_xl_8 main--left">
        <div
          class="main--text d_flex align_items_center justify_content_center"
        >
          <div>
            <h1>404</h1>
            <p>Oops! We can't seem to find the page you're looking for.</p>
            <router-link tag="button" class="btn btn_dark" to="/"
              >Go back</router-link
            >
          </div>
        </div>
      </div>
      <div class="d_lg_block c_12 c_md_4 c_xl_4">
        <div class="bg_svg d_flex align_items_center justify_content_center">
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
