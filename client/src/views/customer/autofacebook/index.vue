<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none">Nội dung mobile</div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Trả lời tự động"
        subBread="Trang giúp bạn thiết lập nhanh AI tự động trả lời"
      />
      <div class="main--content r">
        <div class="auto--sidebar c_md_4 c_xl_4">
          <auto-sidebar/>
        </div>
        <div class="auto--main c_md_8 c_xl_8">
          <div class="auto--main-wrap p_4">
            <auto-reply-head/>
            <auto-reply-main/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AutoSidebar from "./components/auto_sidebar";
import AutoReplyHead from "./components/autocontent/auto_content_header";
import AutoReplyMain from "./components/autocontent/auto_main_content";
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppBreadCrumb,
    AutoSidebar,
    AutoReplyHead,
    AutoReplyMain
  }
};
</script>

<style scoped lang="scss">
.main {
  font-family: "Open Sans", sans-serif;
  .main--content {
    min-height: calc(100vh - 260px);
    border-radius: 10px;
    color: #999999;
    .auto--main-wrap {
      background: #fff;
      height: 100%;
      border-radius: 10px;
    }
  }
}

/* ChangeColor */
// Light
.main[data-theme="light"] {
  color: #666;
  .main--content {
    background-color: #f7f7f7;
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
