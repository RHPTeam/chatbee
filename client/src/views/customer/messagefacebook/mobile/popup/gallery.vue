<template>
  <div class="gallery position_fixed">
    <div class="wrapper d_flex flex_column justify_content_between">
      <div class="content">
        <div class="header d_flex align_items_center" @click="close">
          <icon-base
            icon-name="close"
            width="24"
            height="24"
            viewBox="0 0 25 25"
          >
            <icon-close />
          </icon-base>
        </div>
        <div class="body d_flex align_items_center justify_content_center">
          <div class="gallery--item" :style="{backgroundImage: 'url(' + item.valueContent + ')'}">
<!--            <img :src="item.valueContent" alt="image_sender" />-->
          </div>
        </div>
        <div class="footer d_flex align_items_center justify_content_between">
          <div class="left">
            <icon-base
              icon-name="close"
              width="24"
              height="24"
              viewBox="0 0 20 20"
            >
              <icon-expand />
            </icon-base>
          </div>
          <div class="right">
            <icon-base
              icon-name="close"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-edit />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.gallery {
  background-color: #000000;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  .wrapper {
    width: 100%;
    height: 100vh;
    .content {
      .header {
        height: 10vh;
        padding: 0 1.5rem;
        svg {
          color: #fafafa;
        }
      }
      .body {
        height: 80vh;
        .gallery--item {
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
            width: 100%;
            height: 100%;
        }
      }
      .footer {
        height: 10vh;
        padding: 0 1.5rem;
        svg {
          color: #fafafa;
        }
      }
    }
  }
}
</style>
