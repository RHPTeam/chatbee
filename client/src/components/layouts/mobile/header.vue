<template>
  <div class="header--mobile" :data-theme="currentTheme">
    <transition name="popup">
      <app-sidebar-mobile
        v-if="isShowPopup == true"
        :data-theme="currentTheme"
        :popupData="isShowPopup"
        @closePopup="isShowPopup = $event"
      />
    </transition>
    <div
      class="header--mobile-top d_flex justify_content_between align_items_center"
    >
      <div class="d_flex justify_content_start align_items_center">
        <div
          class="header--mobile-img text_left"
          @click.prevent="isShowPopup = true"
        >
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="30"
            alt="User Avatar"
          />
        </div>
        <div class="header--mobile-title text_left">Trò chuyện</div>
      </div>
      <div class="d_flex justify_content_end align_items_center">
        <div class="change--account" @click="showChangeAccount = true">
          <icon-base
            icon-name="change-account"
            width="26"
            height="26"
            viewBox="0 0 15.02 17.34"
          >
            <icon-change-account />
          </icon-base>
        </div>
        <div class="new--message">
          <icon-base
            icon-name="new-message"
            width="26"
            height="26"
            viewBox="0 0 20.6 20.2"
          >
            <icon-new-message />
          </icon-base>
        </div>
      </div>
    </div>
    <transition name="popup">
      <modal-delete
        v-if="showChangeAccount == true"
        :data-theme="currentTheme"
        :changAccount="showChangeAccount"
        @closeModal="showChangeAccount = $event"
      />
    </transition>
  </div>
</template>
<script>
import AppSidebarMobile from "./popup";
import ModalDelete from "@/views/customer/messagefacebook/mobile/change-account";
import IconBase from "@/components/icons/IconBase";
import IconChangeAccount from "@/components/icons/IconChangeAccount";
import IconNewMessage from "@/components/icons/IconNewMessage";
export default {
  components: {
    AppSidebarMobile,
    ModalDelete,
    IconBase,
    IconChangeAccount,
    IconNewMessage
  },
  data() {
    return {
      isShowPopup: false,
      showChangeAccount: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./header";
</style>
