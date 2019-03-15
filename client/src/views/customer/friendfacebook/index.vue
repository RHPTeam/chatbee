<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none"></div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Bạn bè Facebook"
        subBread="Trang giúp bạn thiết lập nhanh các nhóm bạn bè"
      />
      <div class="main--content">
        <app-segments></app-segments>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppSegments from "./components/segments";
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppBreadCrumb,
    AppSegments
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
}

//Dark
.main[data-theme="dark"] {
  color: #ccc;
}
</style>
