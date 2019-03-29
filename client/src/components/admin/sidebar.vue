<template>
  <div class="sidebar text_left" :class="{ collapseSidebar: collapseSidebar }">
    <div class="sidebar--logo d_flex align_items_center justify_content_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
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
    <div class="d_flex justify_content_center">
      <ul class="sidebar--menu d_inline_block">
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'admin_dashboard' }"
          active-class="active"
          exact
        >
          <a>
            <icon-base
              icon-name="dashboard"
              width="24"
              height="18.857"
              viewBox="0 0 24 18.857"
            >
              <icon-dashboard />
            </icon-base>
            <span class="menu--item-text">Bảng điều khiển</span>
          </a>
        </router-link>
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'admin_users' }"
          active-class="active"
        >
          <a class="account">
            <icon-base
              icon-name="manage-account"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-manage-account />
            </icon-base>
            <span class="menu--item-text">Tài khoản</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconLogoAdmin from "@/components/icons/IconLogoAdmin";
import IconDashboard from "@/components/icons/IconDashboard";
import IconManageAccount from "@/components/icons/IconManageAccount";
export default {
  components: {
    IconBase,
    IconLogoAdmin,
    IconDashboard,
    IconManageAccount
  },
  computed: {
    collapseSidebar() {
      return this.$store.getters.collapseSidebar;
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 260px;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  min-height: 100vh;
  .active {
    background-color: #2f3136;
    border-right: 3px solid #ffb94a !important;
  }
  .sidebar--logo {
    width: 100%;
    height: 120px;
    margin-left: -10px;
    svg {
      color: #fff;
    }
  }
  .sidebar--menu {
    padding: 0;
    list-style: none;
    margin-top: .5rem;
    width: 100%
  }
  .menu--item {
    padding: .5rem 1rem;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px transparent;
    transition: all .4s ease-in;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: #2f3136;
    }
    a {
      width: 100%;
      text-decoration: none;
      transition: all 0.4s ease;
      color: #f7f7f7;
    }
    .account {
      svg {
        vertical-align: sub;
      }
    }
    .menu--item-text {
      -webkit-animation: fadeIn 1s;
      animation: fadeIn 1s;
      padding-left: 1.5rem;
    }
  }
  &.collapseSidebar {
    width: 200px;
    .menu--item {
      .menu--item-text {
        padding-left: 20px;
      }
    }
  }
}
</style>
