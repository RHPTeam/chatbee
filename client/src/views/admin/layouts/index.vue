<template>
  <div class="main">
    <!-- Start: Sidebar Component -->
    <div class="sidebar"></div>
    <!-- End: Sidebar Component -->
    <!-- Start: Navbar Component -->
    <div class="navbar"></div>
    <!-- End: Navbar Component -->
    <router-view/>
  </div>
</template>
<script>
export default {
  async created() {
    await this.$store.dispatch("getUserInfo");
  }
};
</script>

<style scoped>
</style>