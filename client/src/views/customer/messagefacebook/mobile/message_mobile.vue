<template>
  <div class="message position_fixed">
    <div
      class="message--header d_flex align_items_center justify_content_between"
    >
      <div
        class="message--header-left d_flex align_items_center justify_content_start"
      >
        <div
          class="back--list d_flex align_items_center justify_content_start"
          @click="closeMessage"
        >
          <icon-base
            icon-name="icon-arrow-left"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <icon-arrow-left />
          </icon-base>
          <div class="message--number text_center">9</div>
        </div>
        <div class="user--info d_flex align_items_center">
          <div class="user--avatar">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              width="30"
              alt="User Avatar"
            />
          </div>
          <div class="user--profile text_left">
            <div class="user--profile-name">Lê Khang</div>
            <span class="user--profile-status"
              >Không có gì ngoài đẹp trai ...!!!</span
            >
          </div>
        </div>
      </div>
      <div class="message--info" @click="isShowInfo = true">
        <icon-base
          icon-name="icon-info"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <icon-info />
        </icon-base>
      </div>
    </div>
    <VuePerfectScrollbar class="message--content">
      <div class="show--message d_flex flex_column">
        <div class="message--user-1 text_left d_flex align_items_end">
          <div class="avatar-chat">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              width="40"
              alt="User Avatar"
            />
          </div>
          <div class="user--message d_flex flex_column">
            <div class="item user--message-1">Lorem ipsum dolor sit amet.</div>
            <div class="item user--message-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
              sit.
            </div>
          </div>
        </div>
        <div
          class="message--user-2 text_right d_flex flex_row_reverse align_items_end"
        >
          <div class="avatar-chat">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              width="16"
              alt="User Avatar"
            />
          </div>
          <div class="user--message d_flex flex_column">
            <div class="item user--message-2 text_left ml_auto">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque
              corporis distinctio explicabo fuga neque nulla officiis optio
              praesentium vitae.
            </div>
            <div class="time--read text_center">12: 46</div>
            <div class="item user--message-2 text_left ml_auto">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque
              corporis distinctio explicabo fuga neque nulla officiis optio
              praesentium vitae.
            </div>
            <!--Message Images-->
            <!--<one-images />-->
            <!--<two-images />-->
            <!--<three-images />-->
            <four-images />
            <!--End Message Images-->
            <div class="item user--message-2 text_left ml_auto">
              Lorem ipsum dolor. Fuga, sit.
            </div>
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>
    <div
      class="message--footer d_flex align_items_center justify_content_between"
    >
      <!--Icons options-->
      <div class="icons--left d_flex align_items_top justify_content_start">
        <div class="d_none">
          <div class="icon icon-change-account">
            <icon-base
              icon-name="icon-change-account"
              width="28"
              height="23"
              viewBox="0 0 18 18"
            >
              <icon-change-account />
            </icon-base>
          </div>
        </div>
        <div class="d_flex">
          <div class="icon icon-change-account">
            <icon-base
              icon-name="icon-grid"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-grid />
            </icon-base>
          </div>
          <div class="icon icon-camera">
            <icon-base
              icon-name="icon-camera"
              width="24"
              height="24"
              viewBox="0 0 24 26"
            >
              <icon-camera />
            </icon-base>
          </div>
          <div class="icon icon-image">
            <icon-base
              icon-name="icon-image"
              width="21"
              height="21"
              viewBox="0 0 21 21"
            >
              <icon-image />
            </icon-base>
          </div>
        </div>
      </div>
      <!--Input create message-->
      <div class="input--message">
        <div class="form_group m_0">
          <input type="text" placeholder="Aa" class="form_control" />
        </div>
      </div>
      <!--Icon smile and send when focus-->
      <div class="icon--right">
        <div class="icon--smile">
          <div class="icons">
            <icon-base
              icon-name="icon-smile"
              width="24"
              height="24"
              viewBox="0 0 26 26"
            >
              <icon-smile />
            </icon-base>
          </div>
        </div>
        <div class="icon--send ml_2 d_none">
          <div class="icons">
            <icon-base
              icon-name="icon-send"
              width="24"
              height="24"
              viewBox="0 0 540 540"
            >
              <icon-send />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
    <!--Popup user info chat-->
    <transition name="info">
      <user-info-chat
        v-if="isShowInfo == true"
        :data-theme="currentTheme"
        :popupInfo="isShowInfo"
        @closeInfo="isShowInfo = $event"
      />
    </transition>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import IconBase from "@/components/icons/IconBase";
import IconSend from "@/components/icons/IconSend";
import IconSmile from "@/components/icons/IconSmile";
import IconImage from "@/components/icons/IconImage";
import IconCamera from "@/components/icons/IconCamera";
import IconChangeAccount from "@/components/icons/IconChangeAccount";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconGrid from "@/components/icons/IconGrid";
import IconInfo from "@/components/icons/IconInfo";
import OneImages from "./cp-message/cp_images_1";
import TwoImages from "./cp-message/cp_images_2";
import ThreeImages from "./cp-message/cp_images_3";
import FourImages from "./cp-message/cp_images_4";
import UserInfoChat from "./user-info/index";
export default {
  props: ["ishowMessage"],
  data() {
    return {
      isShowInfo: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeMessage() {
      this.$emit("closeMessage", false);
    }
  },
  components: {
    VuePerfectScrollbar,
    IconBase,
    IconSend,
    IconCamera,
    IconImage,
    IconSmile,
    IconChangeAccount,
    IconArrowLeft,
    IconGrid,
    IconInfo,
    OneImages,
    TwoImages,
    ThreeImages,
    FourImages,
    UserInfoChat
  }
};
</script>
<style lang="scss" scoped>
@import "./message_mobile.style";
</style>
