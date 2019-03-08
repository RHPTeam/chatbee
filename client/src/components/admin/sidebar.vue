<template>
  <div class="sidebar text_left" :class="{ collapseSidebar: collapseSidebar }">
    <div class="sidebar--logo d_flex align_items_center justify_content_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
          <icon-base icon-name="logo-admin" width="160" height="81.09" viewBox="0 0 160 81.09">
            <icon-logo-admin/>
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
            <icon-base icon-name="dashboard" width="24" height="18.857" viewBox="0 0 24 18.857">
              <icon-dashboard/>
            </icon-base>
            <span class="menu--item-text">Dashboard</span>
          </a>
        </router-link>
        <router-link
          class="menu--item d_flex align_items_center"
          tag="li"
          :to="{ name: 'admin_users' }"
          active-class="active"
        >
          <a>
            <icon-base icon-name="manage-account" width="24" height="24" viewBox="0 0 24 24">
              <icon-manage-account/>
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
  width: 300px;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  min-height: 100vh;
  .sidebar--logo {
    width: 100%;
    height: 120px;
    svg {
      color: #000;
    }
  }
  .sidebar--menu {
    padding-left: 0;
    list-style: none;
    margin-top: 50px;
  }
  .menu--item {
    margin-bottom: 38px;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      text-decoration: none;
      transition: all 0.4s ease;

      color: #3d3d3d;
    }
    .menu--item-text {
      -webkit-animation: fadeIn 1s;
      animation: fadeIn 1s;
      padding-left: 50px;
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