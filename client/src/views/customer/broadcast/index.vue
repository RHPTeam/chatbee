<template>
  <div class="main">
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Broadcasts"
        subBread="Trang giúp bạn thiết lập nhanh cài đặt kịch bản tự động trả lời"
      />
      <!--Nội dung-->
      <div class="main--content r">
        <div class="auto--sidebar c_md_12 c_xl_4">
          <app-sidebar />
        </div>
        <div class="auto--main c_md_12 c_xl_8 mt_4">
          <div class="auto--main-wrap">
            <main-broadcast />
          </div>
        </div>
      </div>
    </div>
    <div class="d_block d_md_none">
      <app-mobile/>
    </div>
  </div>
</template>
<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppSidebar from "./components/sidebar/sidebar_broadcast";
import MainBroadcast from "./components/main_broadcast/main_broadcast";
import AppMobile from "./mobile/index_mobile";
export default {
  components: {
    AppBreadCrumb,
    AppSidebar,
    MainBroadcast,
    AppMobile
  }
};
</script>
