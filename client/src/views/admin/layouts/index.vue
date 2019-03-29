<template>
  <div class="wrapper">
    <div class="wrap--content d_none d_md_flex">
      <div class="wrap--content-sidebar">
        <app-sidebar />
      </div>
      <div class="wrap--content-main">
        <app-header />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from "@/components/admin/header";
import AppSidebar from "@/components/admin/sidebar";

export default {
  components: {
    AppHeader,
    AppSidebar
  },

  async created() {
    await this.$store.dispatch("getUserInfo");
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #ffffff;
  color: #666;
  .wrap--content-main {
    background-color: #f7f7f7;
    min-height: 100vh;
    width: 100%;
  }
  .wrap--content-sidebar {
    background-color: #27292D;
  }
}
</style>
