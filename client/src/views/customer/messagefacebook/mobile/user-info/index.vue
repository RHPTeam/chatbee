<template>
  <div class="profile position_fixed" :data-theme="currentTheme">
    <!-- Menu come back chat -->
    <div class="user--topbar d_flex justify_content_start align_items_center">
      <div class="user--back" @click="closeInfo">
        <icon-base
          icon-name="icon-arrow-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <icon-arrow-left />
        </icon-base>
      </div>
    </div>
    <!-- Infomation user -->
    <VuePerfectScrollbar class="profile--detail">
      <!-- Avatar and Info user -->
      <app-info :info="item" :currentTheme="currentTheme" />

      <!-- Option -->
      <app-option :currentTheme="currentTheme" />

      <!--General photos-->
      <app-library :currentTheme="currentTheme" />
    </VuePerfectScrollbar>
    <!-- End.Infomation user -->
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppInfo from "./cp-info/info";
import AppOption from "./cp-info/option";
import AppLibrary from "./cp-info/libraries";
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
export default {
  props: ["isShowInfo", "item"],
  methods: {
    closeInfo() {
      this.$emit("closeInfo", false);
    }
  },
  components: {
    VuePerfectScrollbar,
    AppInfo,
    AppOption,
    AppLibrary,
    IconBase,
    IconArrowLeft
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>
<style lang="scss" scoped>
.profile {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  /* CSS Topbar */
  .user--topbar {
    height: 56px;
    padding: 0 16px;
    .user--back {
      color: #999;
      cursor: pointer;
    }
  }
  /* Content scroll */
  .profile--detail {
    height: calc(100vh - 56px);
  }
}

/*Transition popup*/

.info-enter {
  transform: translateX(100%);
}

.info-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.info-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

//Change Theme
.profile[data-theme="light"] {
  background-color: #fff;
  color: #444;
}

.profile[data-theme="dark"] {
  background-color: #2f3136;
  color: #f7f7f7;
}
</style>
