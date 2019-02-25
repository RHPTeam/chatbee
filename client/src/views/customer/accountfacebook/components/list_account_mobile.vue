<template>
  <div>
    <div class="list_mobile d_flex flex_wrap">
      <div class="addItem">
        <div class="card">
          <div class="card_body">
            <div class="item--content" @click="showModalMobile = true">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="60"
                height="60"
                viewBox="0 0 60 60"
              >
                <icon-plus />
              </icon-base>
              <p>
                Thêm một cookie
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-for="item in arrStt" :key="item.id" class="item">
        <div class="card">
          <div class="card_body">
            <div class="card--header">
              <app-icon-remove />
            </div>
            <div class="card--content">
              <div class="avatar">
                <img
                  class="picture"
                  src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
                />
                <span class="status">
                  <app-icon-disative v-if="item.stt == true" />
                  <app-icon-active v-else />
                </span>
              </div>
              <h3 class="name">Thanh Lam</h3>
              <button
                @click="item.stt = !item.stt"
                class="btn btn--connect"
                v-if="item.stt == true"
              >
                Kết nối
              </button>
              <button
                @click="item.stt = !item.stt"
                class="btn btn--disconnect"
                v-else
              >
                Ngắt kết nối
              </button>
            </div>
            <div class="card--footer">
              <div class="left">
                <p>12</p>
                <p>Kết nối</p>
              </div>
              <div class="right">
                <p>1</p>
                <p>Hoạt động</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="popup">
      <add-popup-mobile
        v-if="showModalMobile == true"
        :data-theme="currentTheme"
        :popupData="showModalMobile"
        @closeAddPopup="showModalMobile = $event"
      />
    </transition>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import AppIconRemove from "@/components/icons/IconRemove";
import AppIconDisative from "@/components/icons/IconDisative";
import AppIconActive from "@/components/icons/IconActive";
import AddPopupMobile from "./popup/add_popup_mobile";
export default {
  data() {
    return {
      showModalMobile: "false",
      arrStt: [
        { id: 1, stt: true },
        { id: 2, stt: true },
        { id: 3, stt: false },
        { id: 4, stt: false }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconPlus,
    AppIconRemove,
    AppIconDisative,
    AppIconActive,
    AddPopupMobile
  }
};
</script>

<style scoped lang="scss">
@import "./list_account_mobile.scss";
</style>
