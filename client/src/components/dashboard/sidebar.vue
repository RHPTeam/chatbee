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
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-home />
          </icon-base>
          <span class="menu--item-text">Bảng điều khiển</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/f-message">
          <icon-base
            icon-name="chat"
            width="20"
            height="20"
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
            width="20"
            height="20"
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
            width="20"
            height="20"
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
            width="20"
            height="20"
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-friend />
          </icon-base>
          <span class="menu--item-text">Bạn bè</span>
        </router-link>
      </li>
      <li class="menu--item d_flex align_items_center">
        <router-link to="/f-account">
          <icon-base
            icon-name="account"
            width="20"
            height="20"
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
            width="20"
            height="20"
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

<script src="./sidebar.script"></script>

<style scoped lang="scss">
@import "./sidebar.style";
</style>
