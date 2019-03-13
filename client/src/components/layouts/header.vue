<template>
  <div v-if="!user"></div>
  <div
    v-else
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="header--icon" @click="toogleSidebar">
      <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
        <icon-menu/>
      </icon-base>
    </div>
    <div
      class="header--profile position_relative d_flex justify_content_end align_items_center"
      @click="showDropdown"
    >
      <div class="header--profile-img">
        <div
          v-if="user.imageAvatar"
          class="avatar--content avatar--img position_relative d_block"
          :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
        ></div>
        <div v-else class="avatar--content avatar--default position_relative d_block">
          <span class="position_absolute">{{user.name | getFirstLetter}}</span>
        </div>
      </div>
      <div class="header--profile-name ml_2 mr_2">{{ user.name }}</div>
      <icon-base icon-name="arrow-down" width="10" height="10" viewBox="0 0 130 130">
        <icon-arrow-down/>
      </icon-base>
      <div
        class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
        :class="{ show: showdropdown }"
      >
        <span class="with--arrow">
          <span class="bg_primary"></span>
        </span>
        <div class="d_flex align_items_center p_3 bg_primary text_white mb_2">
          <div class="avatar--wrap">
            <div
              v-if="user.imageAvatar"
              class="avatar--content avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div v-else class="avatar--content avatar--default position_relative d_block">
              <span class="position_absolute">{{user.name | getFirstLetter}}</span>
            </div>
          </div>
          <div class="ml_2">
            <h4 class="mb_0">{{ user.name }}</h4>
            <p class="mb_0">{{ user.email }}</p>
          </div>
        </div>
        <router-link class="dropdown--item" :to="{ name: 'c_account' }">
          <icon-base icon-name="account" width="18" height="18" viewBox="0 0 24 24">
            <icon-account/>
          </icon-base>Thiết lập tài khoản
        </router-link>
        <a class="dropdown--item" href="javascript:void(0)">
          <icon-base icon-name="friend" width="18" height="18" viewBox="0 0 25 25">
            <icon-friend/>
          </icon-base>Quản lý bạn bè
        </a>
        <a class="dropdown--item" href="javascript:void(0)">
          <icon-base icon-name="libs" width="18" height="18" viewBox="0 0 24 24">
            <icon-libs/>
          </icon-base>Quản lý thư viện
        </a>
        <div class="dropdown--divider"></div>
        <a class="dropdown--item" href="javascript:void(0)" @click="logOut">
          <icon-base icon-name="logout" width="18" height="18" viewBox="0 0 20 20">
            <icon-logout/>
          </icon-base>Đăng xuất
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./header.script"></script>

<style scoped lang="scss">
@import "header.style";
</style>
