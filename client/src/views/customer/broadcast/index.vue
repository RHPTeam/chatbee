<template>
  <div class="main">
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Chiến dịch"
        subBread="Trang giúp bạn thiết lập các chiến dịch cá nhân hóa khách hàng"
      />
      <!-- Start: Content -->
      <div class="main--content r">
        <div class="c_md_12 c_xl_4 pr_xl_0">
          <app-sidebar />
        </div>
        <div class="c_md_12 c_xl_8 mt_md_4 mt_xl_0">
          <router-view />
        </div>
      </div>
      <!-- End: Content -->
    </div>
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
  </div>
</template>
<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppSidebar from "./components/sidebar";
import AppMobile from "./mobile/index_mobile";
export default {
  components: {
    AppBreadCrumb,
    AppSidebar,
    AppMobile
  }
};
</script>
<style lang="scss" scoped></style>
