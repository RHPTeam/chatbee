<template>
  <div
    class="dropdown action"
    :data-theme="currentTheme"
    @click="isShow = !isShow"
    v-click-outside="close"
  >
    <div class="action--icon">
      <icon-base
        icon-name="more"
        class="icon-more"
        width="23"
        height="23"
        viewBox="0 0 750 750"
      >
        <icon-more />
      </icon-base>
    </div>
    <div
      class="dropdown--menu dropdown--menu-left flipInY animated action--item"
      :class="{ show: isShow === true }"
    >
      <div class="dropdown--menu-content">
        <div class="dropdown--menu-item">
          <div>Sao chép</div>
          <div>
            Các bản cập nhật trong tương lai cho nhóm ban đầu sẽ không được sao
            chép sang các phiên bản được sao chép
          </div>
        </div>
        <div
          class="dropdown--menu-item"
          @click.prevent="remove(group._id)"
        >
          Xóa
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: Object,
    type: String
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    close() {
      this.isShow = false;
    },
    remove(id) {
      if (this.type === "sequence") {
        this.$store.dispatch("deleteSequence", id);
      } else if (this.type === "groupblock") {
        this.$store.dispatch("deleteGroup", id);
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  .action--icon {
    margin-bottom: -6px;
  }
}
.dropdown--menu {
  background-clip: padding-box;
  border: 0;
  border-radius: 2px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
  display: none;
  font-size: 0.875rem;
  margin: 0.125rem 0 0;
  position: absolute;
  text-align: left;
  top: 100%;
  z-index: 99;
  &.type {
    text-align: center;
    width: 150px;
  }
  &.show {
    display: block;
  }
  &.dropdown--menu-left {
    left: 20px;
    right: auto;
    top: 25px;
    .with--arrow {
      left: 0;
      > span {
        left: 20px;
        right: 0;
      }
    }
  }
  .with--arrow {
    height: 10px;
    position: absolute;
    top: -10px;
    width: 40px;
    > span {
      border-radius: 6px 0 0;
      content: "";
      height: 15px;
      position: absolute;
      transform: rotate(45deg);
      top: 3px;
      width: 15px;
    }
  }
  &-item {
    font-weight: 700;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f2f1f1;
  }
  &-item:last-child {
    border-bottom: 0;
  }
  &.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  &.flipInY {
    backface-visibility: visible !important;
    animation-name: flipInY;
  }
  @keyframes flipInY {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    40% {
      transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      animation-timing-function: ease-in;
    }
    60% {
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }
    80% {
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }
    to {
      transform: perspective(400px);
    }
  }
}
.group--item {
  cursor: pointer;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }

  .action {
    display: block;
    position: relative;
    transition: 0.5s ease-in;
    .action--item {
      left: 0;
      width: 250px;
      .dropdown--menu-item {
        padding: 0.75rem 1.25rem;
        text-transform: capitalize;
        &:first-child div:nth-child(2) {
          font-weight: 500;
          margin-top: 0.25rem;
          font-size: 0.75rem;
        }
        &:last-child {
          color: #f43c3c;
        }
        & > div:nth-child(2) {
          text-transform: initial;
        }
      }
    }
  }
}
.group--item.add {
  position: relative;
  .group--item-name {
    > span {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}
//Theme Light
div.action[data-theme="light"] {
  .action--icon {
    color: #e4e4e4;
  }
  .dropdown--menu {
    background: #fff;
    color: #3e5569;
    &-item:hover,
    &-item:focus,
    &-item:active {
      background-color: #f9f8f8;
    }
  }
}

//Theme Dark
div.action[data-theme="dark"] {
  .action--icon {
    color: #e4e4e4;
  }
  .dropdown--menu {
    background: #27292d;
    color: #ffffff;
    &--item {
      &:last-child {
        color: #ffffff;
      }
      &:hover,
      &:focus,
      &:active {
        background-color: #2f3136;
      }
    }
  }
}
</style>
