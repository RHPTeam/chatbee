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
      <div
        class="dropdown--menu dropdown--menu-right user--dd"
        :class="{ show: showdropdown }"
      >
        <span class="with-arrow">
          <span class="bg-primary"></span>
        </span>
        <div class="d_flex align_items_center p_3 bg_primary text_white mb_2">
          <div class="">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              alt="user"
              class="img_circle"
              width="60"
            />
          </div>
          <div class="ml_2">
            <h4 class="mb_0">Steave Jobs</h4>
            <p class=" mb_0">varun@gmail.com</p>
          </div>
        </div>
        <a class="dropdown-item" href="javascript:void(0)">
          <icon-base
            icon-name="account"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-account />
          </icon-base>
          Thiết lập tài khoản</a
        >
        <a class="dropdown-item" href="javascript:void(0)">
          <icon-base
            icon-name="libs"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-libs />
          </icon-base>
          Quản lý thư viện</a
        >
        <a class="dropdown-item" href="javascript:void(0)">
          <icon-base
            icon-name="friend"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-friend />
          </icon-base>
          Quản lý bạn bè Facebook</a
        >
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="javascript:void(0)">
          <i class="ti-user mr_1 ml_1"></i> Đăng xuất</a
        >
      </div>
    </div>
  </div>
</template>

<script src="./header.script"></script>

<style scoped lang="scss">
@import "header.style";

.dropdown--menu {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
  color: #3e5569;
  font-size: .875rem;
  margin: .125rem 0 0;
  padding: 0 0.5rem 0 0.5rem;
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
    right: 0;
    left: auto;
  }
}
</style>
