<template>
  <div class="wrapper">
    <div class="wrap--content d_none d_md_flex">
      <div class="wrap--content-sidebar">
        <app-sidebar/>
      </div>
      <div class="wrap--content-main">
        <app-header/>
        <div class="account text_left pt_4 pb_4 pl_5 pr_5">
          <div class="account--title mb_4">Quản lý tài khoản</div>
          <div class="account--content card card_body p_4">
            <app-top/>
            <div class="account--grid">
              <div class="grid--header d_flex justify_content_between align_items_center mb_1">
                <div class="grid--header-checkall d_flex align_items_center">
                  <input type="checkbox" name="" value="">
                  <span class="ml_4">
                    <icon-base icon-name="remove" width="15" height="15" viewBox="0 0 15 15">
                      <icon-remove/>
                    </icon-base>
                  </span>
                </div>
                <div class="">Đã chọn 1 tài khoản</div>
              </div>
              <div class="grid--content p_3">
                  <div class="ct_f p_0">
                    <div class="r">
                      <div class="c_md_3">
                        <app-grid-item/>
                      </div>
                      <div class="c_md_3">
                        <app-grid-item/>
                      </div>
                      <div class="c_md_3">
                        <app-grid-item/>
                      </div>
                      <div class="c_md_3">
                        <app-grid-item/>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
import AppHeader from "@/components/admin/header";
import AppSidebar from "@/components/admin/sidebar";
import AppTop from "./components/top";
import AppGridItem from "./components/grid-item";

export default {
  components: {
    IconBase,
    IconRemove,
    AppHeader,
    AppSidebar,
    AppTop,
    AppGridItem
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  color: #666;
  background-color: #ffffff;
  .wrap--content-main {
    width: 100%;
    min-height: 100vh;
    background-color: #eff1f5;
  }
}

.account {
  .account--title {
    font-size: 18px;
    font-weight: bold;
    color: #56e8bd;
  }
  .account--content {
    border-radius: 8px;
    border: 0;
  }
}

.grid--content {
  border-top: 1px solid #DCDCDC;
  border-bottom: 1px solid #DCDCDC;
}
</style>
