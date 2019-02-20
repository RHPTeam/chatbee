<template>
  <div class="wrapper" :data-theme="currentTheme">
    <Loading v-if="status == 'loading'" />
    <div v-else class="wrap--content d_flex">
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
import Loading from "@/components/shared/loading";
import AppHeader from "@/components/dashboard/header";
import AppSidebar from "@/components/dashboard/sidebar";
export default {
  async created() {
    await this.$store.dispatch("getUserInfo");
  },
  computed: {
    status() {
      return this.$store.getters.authStatus;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    Loading,
    AppHeader,
    AppSidebar
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  .wrap--content-main {
    width: 100%;
    padding: 30px 60px 60px 0;
  }
}

.wrapper[data-theme="light"] {
  color: #666;
  background-color: #f7f7f7;
}
.wrapper[data-theme="dark"] {
  color: #ccc;
  background-color: #23272a;
}
</style>
