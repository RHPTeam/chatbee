<template>
  <div
    class="topbar d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div
      class="change--account position_relative"
      @click="isShowChangeAccountDropdown = !isShowChangeAccountDropdown"
      v-click-outside="closeChangeAccountDropdown"
    >
      <icon-base
        icon-name="change-account"
        width="26"
        height="26"
        viewBox="0 0 15.02 17.34"
      >
        <icon-change-account />
      </icon-base>
      <div
        class="dropdown--menu dropdown--menu-left user--dd flipInY animated"
        :class="{ show: isShowChangeAccountDropdown }"
      >
        <span class="with--arrow">
          <span></span>
        </span>
        <div class="d_flex p_3 flex_column">
          <div class="dropdown--menu-title mb_1">
            Tải lại bạn bè tài khoản khác
          </div>
          <div class="dropdown--menu-desc">
            Bạn sẽ được tải lại bạn bè. Sau đó, bạn có thể dùng tài khoản của
            mình để tiếp tục nhắn tin.
          </div>
          <div class="d_flex mt_3">
            <div
              class="account"
              v-for="account in listAccountFacebook"
              :key="account._id"
              @click="getConversationByAccount(account._id)"
            >
              <div
                class="account--header"
                :style="{
                  'background-image': 'url(' + account.userInfo.thumbSrc + ')'
                }"
              >
                <span class="account--status online"></span>
              </div>
              <div class="account--body">
                <span class="account--body-title">{{
                  account.userInfo.name
                }}</span>
              </div>
            </div>
            <div class="account add" @click="$router.push('/f-account')">
              <div class="account--header">
                <span>
                  <icon-base
                    icon-name="new-message"
                    width="16"
                    height="16"
                    viewBox="0 0 58 58"
                  >
                    <icon-plus />
                  </icon-base>
                </span>
              </div>
              <div class="account--body">
                <span class="account--body-title">Thêm tài khoản</span>
              </div>
            </div>
          </div>
          <div class="d_flex mt_3"></div>
        </div>
      </div>
    </div>
    <div class="fb--account">
      <span class="fb--account-name">Bạn bè nhắn tin</span>
    </div>
    <div class="new--message" @click.prevent="createNewConversation">
      <icon-base
        icon-name="new-message"
        width="26"
        height="26"
        viewBox="0 0 20.6 20.2"
      >
        <icon-new-message />
      </icon-base>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isShowChangeAccountDropdown: false
    };
  },
  async created() {
    await this.$store.dispatch("getAccountsFB");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    listAccountFacebook() {
      return this.$store.getters.accountsFB;
    },
    isNewConversation() {
      return this.$store.getters.isNewConversation;
    }
  },
  methods: {
    closeChangeAccountDropdown() {
      this.isShowChangeAccountDropdown = false;
    },
    createNewConversation() {
      this.$store.dispatch("changeChatSidebar", true);
      this.$store.dispatch("createNewConversation", true);
      this.$store.dispatch("pushPreviewConversation");
    },
    getConversationByAccount(fb_id) {
      window.localStorage.setItem("rid", fb_id);
      this.$store.dispatch("removePreviewConversation");
      this.$store.dispatch("getAllConversationsByAcc", fb_id);
    }
  }
};
</script>

<style scoped lang="scss">
.topbar {
  height: 57.5px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  padding: 2.5px 20px 15px 20px;
  margin-top: 12.5px;
  margin-right: -1px;
  .fb--account-name {
    margin-left: 12px;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }
  .change--account,
  .new--message {
    color: #ffb94a;
    cursor: pointer;
  }

  // CSS FOR ACCOUNT DROPDOWN
  .dropdown--menu {
    background-clip: padding-box;
    border: 0;
    border-radius: 2px;
    display: none;
    font-size: 0.875rem;
    left: -16px;
    margin: 0.125rem 0 0;
    position: absolute;
    text-align: left;
    top: 100%;
    z-index: 99;

    &.user--dd {
      min-width: 280px;
    }

    &.show {
      display: block;
    }

    &.dropdown--menu-right {
      right: auto;
      left: 0;

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
        left: 20px;
        position: absolute;
        transform: rotate(45deg);
        top: 3px;
        width: 15px;
      }
    }

    .dropdown--item {
      background-color: transparent;
      border: 0;
      display: block;
      padding: 0.65rem 1rem;
      text-align: inherit;
      text-decoration: none;
      width: 100%;
      white-space: nowrap;

      &:hover {
        text-decoration: none;
      }

      > svg {
        margin: 0 5px;
        vertical-align: top;
      }
    }

    .dropdown--divider {
      border-top: 1px solid;
      height: 0;
      margin: 0.5rem 0;
      overflow: hidden;
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

    &-title {
      font-weight: 700;
      font-size: 14px;
    }

    &-desc {
      font-size: 12px;
    }

    .account {
      border-radius: 4px;
      border: 1px solid;
      text-align: center;
      width: 100px;
      &.add {
        .account--header {
          align-items: center;
          display: flex;
          justify-content: center;
          > span {
            background-color: #ffb94a;
            border-radius: 50%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            width: 30px;
          }
        }
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
      &:hover {
        border: 1px solid;
        border-radius: 4px;
      }
      &.active {
        opacity: 0.6;
      }
      &--header {
        background: url("http://sendauroi.com/wp-content/uploads/2018/05/7-10.jpg")
          center center no-repeat;
        background-size: cover;
        height: 100px;
        position: relative;
        .account--status {
          border: 1px solid;
          border-radius: 50%;
          display: inline-block;
          height: 16px;
          position: absolute;
          right: -8px;
          top: -8px;
          width: 16px;
          &.online {
            background-color: #42b72a !important;
          }
        }
      }
      &--body {
        border-top: 1px solid;
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        &-title {
          font-size: 12px;
          line-height: 32px;
          white-space: nowrap;
        }
      }
    }
  }
}

/* ChangeColor */
// Light
.topbar[data-theme="light"] {
  border-color: #e4e4e4;
  .fb--account-name {
    color: #666;
  }
  .dropdown--menu {
    background-color: #fff;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
    color: #444444;
    .with--arrow {
      > span {
        background-color: #fff;
      }
    }
    .dropdown--item {
      &:hover {
        background-color: #f8f9fa;
        color: #16181b;
      }
    }
    .dropdown--divider {
      border-color: #f8f9fa;
    }
    &-desc {
      color: #999999;
    }
    .account {
      background-color: #fff;
      border-color: #dddfe2;
      &.add {
        .account--header {
          background: #dddfe2;
          svg {
            color: #fff;
          }
        }
      }

      &:hover {
        border-color: #bec3c9;
        box-shadow: -1px 1px 2px 0 rgba(0, 0, 0, 0.1);
      }
      &--header {
        .account--status {
          background-color: #999;
          border-color: #fff;
        }
      }
      &--body {
        border-color: #dddfe2;
        &-title {
          color: #1c1e21;
        }
      }
    }
  }
}

//Dark
.topbar[data-theme="dark"] {
  border-color: #444;
  .fb--account-name {
    color: #ccc;
  }
  .dropdown--menu {
    background-color: #1c1e21;
    box-shadow: 1px 1px 15px rgba(255, 255, 255, 0.1);
    color: #f7f7f7;
    .with--arrow {
      > span {
        background-color: #1c1e21;
      }
    }
    .dropdown--item {
      &:hover {
        background-color: #f8f9fa;
        color: #16181b;
      }
    }
    .dropdown--divider {
      border-color: #f8f9fa;
    }

    &-desc {
      color: #ccc;
    }
    .account {
      background-color: #1c1e21;
      border-color: #444444;
      &.add {
        .account--header {
          background: #2f3136;
          svg {
            color: #fff;
          }
        }
      }

      &:hover {
        border-color: #bec3c9;
        box-shadow: -1px 1px 2px 0 rgba(255, 255, 255, 0.1);
      }
      &--header {
        .account--status {
          background-color: #ccc;
          border-color: #fff;
        }
      }
      &--body {
        border-color: #444;
        &-title {
          color: #f7f7f7;
        }
      }
    }
  }
}

@media (max-width: 1025px) {
  .topbar {
    .change--account {
      display: none;
    }
    .fb--account {
      .fb--account-name {
        display: none;
      }
      img {
        width: 50px;
      }
    }
    .new--message {
      display: none;
    }
  }
}
</style>
