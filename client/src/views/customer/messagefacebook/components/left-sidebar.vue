<template>
  <div class="left--sidebar">
    <app-topbar />
    <VuePerfectScrollbar class="scroll-content">
      <app-search />
      <div class="list--content">
        <app-user />
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppTopbar from "./leftsidebar/topbar";
import AppSearch from "./leftsidebar/search";
import AppUser from "./leftsidebar/user-item";
export default {
  components: {
    AppTopbar,
    AppSearch,
    AppUser,
    VuePerfectScrollbar
  }
};
</script>

<style scoped lang="scss">
.left--sidebar {
  .scroll-content {
    height: calc(100vh - 322px);
    padding: 2px 0;
  }
}
</style>
