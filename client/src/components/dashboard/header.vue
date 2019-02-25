<template>
  <div
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="header--icon" @click="toogleSidebar">
      <icon-base icon-name="menu" width="20" height="20" viewBox="0 0 500 500">
        <icon-menu />
      </icon-base>
    </div>
    <div
      class="header--profile position_relative d_flex justify_content_end align_items_center"
      @click="showDropdown"
    >
      <div class="header--profile-img">
        <img
          src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
          width="40"
          alt="User Image"
        />
      </div>
      <div class="header--profile-name ml_2 mr_2">{{ user.name }}</div>
      <icon-base
        icon-name="arrow-down"
        width="10"
        height="10"
        viewBox="0 0 130 130"
      >
        <icon-arrow-down />
      </icon-base>
      <ul
        class="profile--dropdown position_absolute"
        :class="{ show: showdropdown }"
      >
        <li @click="logOut">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script src="./header.script"></script>

<style scoped lang="scss">
@import "./header.style";
</style>
