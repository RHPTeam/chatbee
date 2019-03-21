<template>
  <div class="wrapper">
    <div class="notification d_flex justify_content_center align_items_center">
      <div class="notification--content">
        <div class="notification--content-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam. Click
          <span><a href="#">here</a></span> to see more detail.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notificationContent"],
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(153, 153, 153, 0.4);
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;

  .notification {
    width: 100%;
    height: 100%;
    &--content {
      width: 90%;
      padding: 0.75rem 1.25rem;
      font-size: 14px;
      background-color: #fff;
      border-radius: 10px;

      &-text {
        text-align: left;
        color: #999;
        padding: 1rem 0;
      }
    }
  }
}
</style>
