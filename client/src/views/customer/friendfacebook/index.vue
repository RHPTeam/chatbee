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
          <span>KHUYẾN CÁO!</span> Ở lần đầu, hệ thống sẽ mất nhiều thời gian tải
          dữ liệu khi số lượng bạn bè lớn. Điều này giúp cho trải
          nghiệm sau đó trở nên tốt hơn, hãy kiên nhẫn chờ đợi (Thông báo sẽ được ẩn khi dữ liệu tải thành công).
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
  created() {
    if (this.$store.getters.allFriends.length === 0) {
      this.$store.dispatch("getFriendsBySize", 20);
    }
  },
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
    .alert {
      font-size: 14px;
      padding: .375rem .5rem;
    }
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
