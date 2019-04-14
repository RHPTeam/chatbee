<template>
  <div>
    <div class="list_mobile d_flex flex_wrap">
      <div class="addItem">
        <div class="card" @click="showPopup" :class="disabledClass()">
          <div class="card_body">
            <div class="item--content">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="30"
                height="30"
                viewBox="0 0 60 60"
              >
                <icon-plus />
              </icon-base>
              <p>
                Thêm tài khoản FaceBook
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(item, index) in accountsFB" :key="index" class="item">
        <div class="card">
          <div class="card_body">
            <div class="card--header">
              <app-icon-remove />
            </div>

            <div class="card--content">
              <div class="avatar">
                <img class="picture" :src="item.userInfo.thumbSrc" />
                <span class="status active"></span>
              </div>
              <h3 class="name">{{ item.userInfo.name }}</h3>
              <button class="btn btn--connect" v-if="1">
                Đang hoạt động
              </button>
              <!--              <button class="btn btn&#45;&#45;update">-->
              <!--                Cập nhật-->
              <!--              </button>-->
              <!-- <button
                                @click="item.stt = !item.stt"
                                class="btn btn--disconnect"
                                v-else
                            >
                                Ngắt kết nối
                            </button> -->
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
      <upgrade-pro-popup-mobile
        v-if="showUpgradePro == true"
        :data-theme="currentTheme"
        :showUpgradePro="showUpgradePro"
        @closeAddPopup="showUpgradePro = $event"
      />

      <add-popup-mobile
        v-if="showModal == true"
        :data-theme="currentTheme"
        :popupData="showModal"
        @closeAddPopup="showModal = $event"
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
import UpgradeProPopupMobile from "@/components/shared/upgradepro-mobile";

export default {
  props: ["accountsFB"],

  data() {
    return {
      showModal: "false",
      showUpgradePro: "false"
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },

  methods: {
    showPopup() {
      if (this.accountsFB.length >= 2) {
        this.showUpgradePro = true;
      } else {
        this.showModal = true;
      }
    },
    disabledClass() {
      if (this.accountsFB.length >= 2) {
        return {
          disabled: true
        };
      } else {
        return {
          disabled: false
        };
      }
    }
  },

  components: {
    IconBase,
    IconPlus,
    AppIconRemove,
    AppIconDisative,
    AppIconActive,
    AddPopupMobile,
    UpgradeProPopupMobile
  }
};
</script>

<style scoped lang="scss">
@import "./list_account_mobile.scss";
</style>
