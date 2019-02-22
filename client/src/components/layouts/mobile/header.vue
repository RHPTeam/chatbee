<template>
  <div class="header--mobile p_3">
    <app-popup-mobile v-if="isShowPopup == true" />
    <div class="header--mobile-top position_fixed p_3">
      <div class="d_flex align_items_center">
        <div class="header--mobile-img text_left" @click="isShowPopup == true">
          <img src="http://source.unsplash.com/random/50x50" alt="" />
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
import AppPopupMobile from "./sidebar";
export default {
  props: ["isShowPopup"],
  components: {
    IconBase,
    IconSearch,
    AppPopupMobile
  }
};
</script>
<style lang="scss" scoped>
.header--mobile {
  background: #fff;
  .header--mobile-top {
    top: 0;
    left: 0;
    z-index: +99;
    width: 100%;
    background: #fff;
    .header--mobile-img {
      img {
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .header--mobile-title {
      h3 {
        font-size: 34px;
        font-weight: 700;
        color: #000000;
      }
    }
  }

  .header--mobile-search {
    margin-top: 70px;
    .icon {
      top: 22%;
      left: 20px;
    }
    input {
      height: 40px;
      line-height: 40px;
      padding-left: 50px;
      background: #f0f0f0;
      border: none;
      border-radius: 5px;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>
