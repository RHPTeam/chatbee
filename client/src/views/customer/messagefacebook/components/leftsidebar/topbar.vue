<template>
  <div class="topbar d_flex justify_content_between align_items_center">
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
            <div class="account active">
              <div class="account--header">
                <span class="account--status online"></span>
              </div>
              <div class="account--body">
                <span class="account--body-title">Tên một</span>
              </div>
            </div>
            <div class="account">
              <div class="account--header">
                <span class="account--status"></span>
              </div>
              <div class="account--body">
                <span class="account--body-title">Tên hai</span>
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
        </div>
      </div>
    </div>
    <div class="fb--account d_flex justify_content_start align_items_center">
      <div class="fb--account-avatar">
        <img
          src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
          width="40"
          alt="User Avatar"
        />
      </div>
      <span class="fb--account-name">Emily Rose</span>
    </div>
    <div class="new--message">
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
import IconBase from "@/components/icons/IconBase";
import IconChangeAccount from "@/components/icons/IconChangeAccount";
import IconNewMessage from "@/components/icons/IconNewMessage";
import IconPlus from "@/components/icons/IconPlus";

export default {
  data() {
    return {
      isShowChangeAccountDropdown: false
    };
  },
  methods: {
    closeChangeAccountDropdown() {
      this.isShowChangeAccountDropdown = false;
    }
  },
  components: {
    IconBase,
    IconChangeAccount,
    IconNewMessage,
    IconPlus
  }
};
</script>

<style scoped lang="scss">
.topbar {
  height: 57.5px;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding: 2.5px 20px 15px 20px;
  margin-top: 12.5px;
  margin-right: -1px;
  .fb--account-name {
    margin-left: 12px;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    color: #666666;
  }
  .change--account,
  .new--message {
    color: #ffb94a;
    cursor: pointer;
  }

  // CSS FOR ACCOUNT DROPDOWN
  .dropdown--menu {
    background-clip: padding-box;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
    color: #3e5569;
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
        background-color: #fff;
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
      color: #212529;
      display: block;
      padding: 0.65rem 1rem;
      text-align: inherit;
      text-decoration: none;
      width: 100%;
      white-space: nowrap;

      &:hover {
        background-color: #f8f9fa;
        color: #16181b;
        text-decoration: none;
      }

      > svg {
        margin: 0 5px;
        vertical-align: top;
      }
    }

    .dropdown--divider {
      border-top: 1px solid #f8f9fa;
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
      color: #1c1e21;
      font-weight: 700;
      font-size: 14px;
    }

    &-desc {
      color: #8d949e;
      font-size: 12px;
    }

    .account {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #dddfe2;
      text-align: center;
      width: 100px;
      &.add {
        .account--header {
          align-items: center;
          background: #dddfe2;
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
          svg {
            color: #fff;
          }
        }
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
      &:hover {
        border: 1px solid #bec3c9;
        border-radius: 4px;
        box-shadow: -1px 1px 2px 0 rgba(0, 0, 0, 0.1);
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
          background-color: #999;
          border: 1px solid #fff;
          border-radius: 50%;
          display: inline-block;
          height: 16px;
          position: absolute;
          right: -8px;
          top: -8px;
          width: 16px;
          &.online {
            background-color: #42b72a;
          }
        }
      }
      &--body {
        border-top: 1px solid #dddfe2;
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        &-title {
          color: #1c1e21;
          font-size: 12px;
          line-height: 32px;
          white-space: nowrap;
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
