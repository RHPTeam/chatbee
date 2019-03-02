<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none"></div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Thư viện"
        subBread="Trang giúp bạn thiết lập nhanh các nhóm bạn bè"
      />
      <div class="main--content"></div>
    </div>
  </div>
</template>

<script>
  import AppBreadCrumb from "@/components/breadcrumb";
  export default {
    computed: {
      currentTheme() {
        return this.$store.getters.themeName;
      }
    },
    components: {
      AppBreadCrumb
    }
  };
</script>

<style scoped lang="scss">
  .main {
    font-family: "Open Sans", sans-serif;
    .main--content {
      min-height: calc(100vh - 260px);
      border-radius: 10px;
    }
  }

  /* ChangeColor */
  // Light
  .main[data-theme="light"] {
    color: #666;
    .main--content {
      background-color: #fff;
    }
  }

  //Dark
  .main[data-theme="dark"] {
    color: #ccc;
    .main--content {
      background-color: #2c2f33;
    }
  }
</style>
