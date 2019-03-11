<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none">
      <app-auto-mobile />
    </div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Trả lời tự động"
        subBread="Trang giúp bạn thiết lập nhanh AI tự động trả lời"
      />
      <div class="main--content r">
        <div class="auto--sidebar c_md_12 c_xl_4">
          <auto-sidebar />
        </div>
        <div class="auto--main c_md_12 c_xl_8">
          <div class="auto--main-wrap p_4">
            <div class="auto--content-header d_flex align_items_center mb_3">
              <h4>Mặc định</h4>
              <div class="icon--drop ml_auto" @click="showModal = true">
                <icon-base
                  class="icon--remove"
                  icon-name="remove"
                  width="26"
                  height="26"
                  viewBox="0 0 20 20"
                >
                  <icon-remove />
                </icon-base>
              </div>
            </div>
            <auto-reply-main />
          </div>
        </div>
      </div>
    </div>
    <transition name="popup">
      <auto-popup
        v-if="showModal == true"
        :data-theme="currentTheme"
        :popupData="showModal"
        @closeDeletePopup="showModal = $event"
      />
    </transition>
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AutoSidebar from "./components/auto_sidebar";
import AutoReplyMain from "./components/autocontent/auto_main_content";
import AutoPopup from "./components/popup_delete";
import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
import AppAutoMobile from "./mobile/index_mobile";
export default {
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconRemove,
    AppBreadCrumb,
    AutoSidebar,
    AutoReplyMain,
    AutoPopup,
    AppAutoMobile
  }
};
</script>

<style scoped lang="scss">
@import "auto_facebook.style";
</style>
