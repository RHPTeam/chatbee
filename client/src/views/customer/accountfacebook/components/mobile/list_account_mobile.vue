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
                Kết nối với FaceBook
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(item, index) in accountsFB" :key="index" class="item">
        <item-account :item="item" />
      </div>
      <div
        v-if="this.$store.getters.facebookStatus === 'loading'"
        class="item c_md_6 c_lg_4 c_xl_3"
      >
        <div class="card">
          <div
            class="card_body d_flex align_items_center justify_content_center"
          >
            <loading-component />
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
import AddPopupMobile from "./popup/add_cookie_mobile";
import UpgradeProPopupMobile from "@/components/shared/upgradepro-mobile";
import ItemAccount from "./item_account_mobile";

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
    },
    user() {
      return this.$store.getters.userInfo;
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
    AddPopupMobile,
    UpgradeProPopupMobile,
    ItemAccount
  }
};
</script>

<style scoped lang="scss">
@import "list_account_mobile";
</style>
