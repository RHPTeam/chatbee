<template>
  <div class="notification d_flex popup-enter" v-if="status === true">
    <div class="notification--text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam. Click
      <span><a href="#">here</a></span> to see more detail.
    </div>
    <div class="notification--close" @click="closeNotification">
      <icon-base icon-name="cancel" width="14" height="14" viewBox="0 0 15 15">
        <icon-cancel />
      </icon-base>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: false
    };
  },
  methods: {
    closeNotification() {
      this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  height: 100%;
  padding: 0.75rem 2.5rem;
  font-size: 14px;
  justify-content: space-between;
  transition: all 0.4s ease;

  &--text {
    width: 95%;
    margin-right: 1rem;
    text-align: center;
    color: #999;
  }

  &--close {
    cursor: pointer;
  }
}

/* ChangeColor */

// Light
.notification[data-theme="light"] {
  background-color: #fff;
  &--close {
    svg {
      color: #ccc;
    }
  }
}

//Dark
.notification[data-theme="dark"] {
  background-color: #27292d;
  &--close {
    svg {
      color: #999;
    }
  }
}
</style>
