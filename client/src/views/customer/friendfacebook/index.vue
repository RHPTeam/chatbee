<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Bạn bè Facebook"
        subBread="Trang giúp bạn thiết lập nhanh các nhóm bạn bè"
      />
      <div class="main--content">
        <div
          class="alert alert_success text_left"
          v-if="this.$store.getters.friendsStatus === 'loading'"
        >
          <b>KHUYẾN CÁO! </b> Lần đầu hệ thống sẽ mất nhiều thời gian để tải
          danh sách bạn bè của bạn khi bạn có quá nhiều. Việc này giúp trải
          nghiệm của bạn trở nên tốt hơn, hãy kiên nhẫn chờ đợi. THÔNG BÁO SẼ ẨN
          SAU KHI TẢI DỮ LIỆU THÀNH CÔNG!
        </div>
        <app-segments></app-segments>
      </div>
    </div>
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppSegments from "./components/segments";
import AppMobile from "./mobile/index_mobile";
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppBreadCrumb,
    AppSegments,
    AppMobile
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
