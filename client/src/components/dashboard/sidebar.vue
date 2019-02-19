<template>
  <div
    class="sidebar text_left"
    :data-theme="currentTheme"
    :class="{ collapseMenu: collapseMenu }"
  >
    <div class="sidebar--logo d_inline_block text_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
          <icon-base
            icon-name="logo-short"
            width="31.706"
            height="31.659"
            viewBox="0 0 31.706 31.659"
          >
            <icon-logo-short />
          </icon-base>
        </div>
        <div class="sidebar--logo-text">
          <icon-base
            icon-name="logo-text"
            width="98.122"
            height="15.799"
            viewBox="0 0 98.122 15.799"
          >
            <icon-logo-text />
          </icon-base>
        </div>
      </router-link>
    </div>
    <ul class="sidebar--menu">
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="home"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-home />
          </icon-base>
          <span class="menu--item-text">Bảng điều khiển</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="chat"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-chat />
          </icon-base>
          <span class="menu--item-text">Trò chuyện</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="auto-answer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-auto-answer />
          </icon-base>
          <span class="menu--item-text">Trả lời tự động</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="timer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-timer />
          </icon-base>
          <span class="menu--item-text">Hẹn giờ gửi</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="script"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-script />
          </icon-base>
          <span class="menu--item-text">Kịch bản</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="friend"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-friend />
          </icon-base>
          <span class="menu--item-text">Bạn bè</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="account"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-account />
          </icon-base>
          <span class="menu--item-text">Tài khoản Facebook</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/">
          <icon-base
            icon-name="libs"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-libs />
          </icon-base>
          <span class="menu--item-text">Thư viện</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconLogoShort from "@/components/icons/IconLogoShort";
import IconLogoText from "@/components/icons/IconLogoText";
import IconHome from "@/components/icons/IconHome";
import IconChat from "@/components/icons/IconChat";
import IconAutoAnswer from "@/components/icons/IconAutoAnswer";
import IconTimer from "@/components/icons/IconTimer";
import IconScript from "@/components/icons/IconScript";
import IconFriend from "@/components/icons/IconFriend";
import IconAccount from "@/components/icons/IconAccount";
import IconLibs from "@/components/icons/IconLibs";
export default {
  components: {
    IconBase,
    IconLogoShort,
    IconLogoText,
    IconHome,
    IconChat,
    IconAutoAnswer,
    IconTimer,
    IconScript,
    IconFriend,
    IconAccount,
    IconLibs
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  padding: 28px 60px;
  width: 355px;
  -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  .sidebar--logo {
    margin-bottom: 48px;
    height: 60px;
  }
  .sidebar--menu {
    padding-left: 0;
    list-style: none;
  }
  .menu--item {
    margin-bottom: 32px;
    font-family: Segoe UI;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      text-decoration: none;
      transition: all 0.4s ease;
      font-weight: normal;

      &:active {
        font-weight: 600;
      }
    }
    .menu--item-text {
      -webkit-animation: fadeIn 1s;
      animation: fadeIn 1s;
    }
    svg {
      margin-right: 18px;
    }
  }

  &.collapseMenu {
    width: 152px;
    .sidebar--logo-text {
      display: none;
    }
    .menu--item {
      .menu--item-text {
        display: none;
      }
    }
  }
}

/* ChangeColor */
// Light
.sidebar[data-theme="light"] {
  .menu--item {
    a {
      color: #666;
      &.active,
      &:hover {
        color: #000;
      }
    }
  }
}

//Dark
.sidebar[data-theme="dark"] {
  .menu--item {
    a {
      color: #ccc;
      &.active,
      &:hover {
        color: #f7f7f7;
      }
    }
  }
}
</style>
