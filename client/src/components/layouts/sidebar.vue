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
            icon-name="logo"
            width="59.92"
            height="49.73"
            viewBox="0 0 250.446 93.703"
          >
            <icon-logo-short />
          </icon-base>
        </div>
        <div class="sidebar--logo-text">
          <icon-base
            icon-name="logo"
            width="132.92"
            height="49.73"
            viewBox="0 0 250.446 93.703"
          >
            <icon-logo />
          </icon-base>
        </div>
      </router-link>
    </div>
    <ul class="sidebar--menu">
      <!-- Home -->
      <!-- <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'c_dashboard' }"
        active-class="active"
        exact
      >
        <a>
          <icon-base
            icon-name="home"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-home />
          </icon-base>
          <span class="menu--item-text">Bảng điều khiển</span>
        </a>
      </router-link> -->

      <!-- Script -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'f_script' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="script"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-script />
          </icon-base>
          <span class="menu--item-text">Kịch bản</span>
        </a>
      </router-link>

      <!-- Chatting -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'f_message' }"
        active-class="active"
        exact
      >
        <a>
          <icon-base
            icon-name="chat"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-chat />
          </icon-base>
          <span class="menu--item-text">Trò chuyện</span>
        </a>
      </router-link>

      <!-- Auto Reply -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'f_auto' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="auto-answer"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-auto-answer />
          </icon-base>
          <span class="menu--item-text">Trả lời tự động</span>
        </a>
      </router-link>

      <!-- Friends -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'f_friends' }"
        active-class="active"
      >
        <a class="friend">
          <icon-base
            icon-name="friend"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <icon-friend />
          </icon-base>
          <span class="menu--item-text">Bạn bè</span>
        </a>
      </router-link>

      <!-- Broadcast -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'f_broadcast' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="broadcast"
            width="21"
            height="21"
            viewBox="0 0 24 24"
          >
            <icon-broadcast />
          </icon-base>
          <span class="menu--item-text">Chiến dịch</span>
        </a>
      </router-link>

      <!-- FB Account -->
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        :to="{ name: 'f_account' }"
        active-class="active"
      >
        <a>
          <icon-base
            icon-name="account"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-account />
          </icon-base>
          <span class="menu--item-text">Tài khoản Facebook</span>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script src="./sidebar.script"></script>

<style scoped lang="scss">
@import "sidebar.style";
</style>
