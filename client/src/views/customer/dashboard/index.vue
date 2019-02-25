<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none"></div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Bảng điều khiển"
        subBread="Trang giúp bạn quản lý nhanh chóng trên hệ thống"
      />
      <div class="main--content"></div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
export default {
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
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
