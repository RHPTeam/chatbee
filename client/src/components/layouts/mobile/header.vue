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
    <div class="header--mobile-top d_flex justify_content_between align_items_center">
      <div class="d_flex justify_content_start align_items_center">
        <div class="header--mobile-img text_left" @click.prevent="isShowPopup = true">
        <div
          v-if="user.imageAvatar"
          class="avatar--content avatar--img position_relative d_block"
          :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
        ></div>
        <div
          v-else
          class="avatar--content avatar--default position_relative d_block"
        >
          <span class="position_absolute">{{
            user.name | getFirstLetter
          }}</span>
        </div>
      </div>
        <div class="header--mobile-title text_left">{{changeTitlePage}}</div>
      </div>
      <div class="d_flex justify_content_end align_items_center" v-if="this.$route.path === '/f-message'">
        <div class="icon change--account" @click="showChangeAccount = true">
          <icon-base icon-name="change-account" width="26" height="26" viewBox="0 0 15.02 17.34">
            <icon-change-account/>
          </icon-base>
        </div>
        <div class="icon new--message">
          <icon-base icon-name="new-message" width="26" height="26" viewBox="0 0 20.6 20.2">
            <icon-new-message/>
          </icon-base>
        </div>
      </div>
      <div class="icon add--script" v-if="this.$route.path === '/f-script'">
          <icon-base icon-name="plus" width="24" height="24" viewBox="0 0 64 64">
            <icon-plus/>
          </icon-base>
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
import IconPlus from "@/components/icons/IconPlus";
export default {
  components: {
    AppSidebarMobile,
    ModalDelete,
    IconBase,
    IconChangeAccount,
    IconNewMessage,
    IconPlus
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
    },
    user() {
      return this.$store.getters.userInfo;
    },
    changeTitlePage() {
      if (this.$route.path === "/") {
        return "Bảng Điều Khiển";
      }
      if (this.$route.path === "/f-script") {
        return "Kịch bản";
      }
      if (this.$route.path === "/f-message") {
        return "Trò chuyện";
      }
      if (this.$route.path === "/f-auto") {
        return "Trả lời tự động";
      }
      if (this.$route.path === "/f-friends") {
        return "Bạn bè Facebook";
      }
      if (this.$route.path === "/f-broadcast/") {
        return "Chiến dịch";
      }
      if (this.$route.path === "/f-account") {
        return "Tài khoản facebook";
      }
    }
  },
  filters: {
    getFirstLetter(string) {
       if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./header";
</style>
