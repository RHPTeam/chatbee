<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none"></div>
    <!--Desktop-->
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Kịch bản"
        subBread="Trang giúp bạn tạo ra các kịch bản cho khách hàng của bạn"
      />
      <div class="main--content r">
        <div class="left-sidebar d_flex c_md_4">
          <app-left-sidebar-script />
        </div>
        <div class="main--scripts d_flex c_md_8">
          <app-main-script/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppLeftSidebarScript from './components/leftsidebar/leftsidebarscript';
import AppMainScript from './components/mainscript/mainscript';

export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppLeftSidebarScript,
    AppMainScript,
    AppBreadCrumb
  }
};
</script>

<style lang="scss" scoped>

.main {
  font-family: "Open Sans", sans-serif;

  .main--content {
    border-radius: 10px;
    min-height: calc(100vh - 260px);
  }

  .main--scripts {
    > div {
      padding: 20px;
      width: 100%;
    }
  }
}

/**********************************/
/**********Change Color************/
/**********************************/
/**           Theme Light        **/
div[data-theme="light"] {
  .left-sidebar, .main--scripts {
  }
}

/**           Theme Dark         **/
div[data-theme="dark"] {
  .left-sidebar, .main--scripts {
  }
}
</style>
