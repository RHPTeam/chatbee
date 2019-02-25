<template>
  <div class="header--mobile p_3" :data-theme="currentTheme">
    <transition name="popup">
      <app-sidebar-mobile
        v-if="isShowPopup == true"
        :data-theme="currentTheme"
        :popupData="isShowPopup"
        @closePopup="isShowPopup = $event"
    /></transition>
    <div class="header--mobile-top position_fixed p_3">
      <div class="d_flex align_items_center">
        <div
          class="header--mobile-img text_left"
          @click.prevent="isShowPopup = true"
        >
          <img
            src="https://i.ytimg.com/vi/X9GwXIYmuUk/maxresdefault.jpg"
            alt=""
          />
        </div>
        <div class="header--mobile-title text_left ml_2">
          <h3>Chat</h3>
        </div>
      </div>
    </div>
    <div class="header--mobile-search position_relative">
      <div class="icon position_absolute">
        <icon-base
          icon-name="icon-search"
          width="16"
          height="16"
          viewBox="0 0 20 20"
        >
          <icon-search />
        </icon-base>
      </div>
      <input type="text" placeholder="Tìm kiếm" class="form_control" />
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconSearch from "@/components/icons/IconSecurity";

import AppSidebarMobile from "./popup";

export default {
  components: {
    IconBase,
    IconSearch,

    AppSidebarMobile
  },
  data() {
    return {
      isShowPopup: false
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
