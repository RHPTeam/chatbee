<template>
  <div class="video--wrap d_flex flex_column justify_content_between">
    <h5 class="login--video-desc mt_5 mb_4">
      Lorem ipsum dolor sit amet consectetur
    </h5>
    <div class="login--video-svg">
      <icon-base
        icon-name="imac"
        width="943.374"
        height="852.274"
        viewBox="0 0 943.374 853.274"
      >
        <icon-imac />
      </icon-base>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconImac from "@/components/icons/IconImac";
export default {
  components: {
    IconBase,
    IconImac
  }
};
</script>

<style scoped lang="scss">
.video--wrap {
  background-color: #23272a;
  min-height: 100vh;
  .login--video-desc {
    font-family: SegoeUI;
    font-size: 30px;
    font-weight: bold;
    line-height: 1.33;
    color: #f8f8f8;
  }
  .login--video-svg {
    svg {
      width: 68%;
      height: auto;
    }
  }
}
</style>
