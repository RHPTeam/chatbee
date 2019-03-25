<template>
  <div class="wrapper">
    <div class="alert alert_warning text_left">
      CHÚ Ý! Khi quyết định xóa một tài khoản Facebook khỏi hệ thống. Tất cả
      dữ liệu được thiết lập trước đó của tài khoản sẽ bị dừng hoặc xóa. Liên hệ với bộ phận CSKH của Zinbee để giải đáp thắc mắc nếu có.
    </div>
    <div class="list r">
      <div class="addItem c_md_6 c_lg_4 c_xl_3 ">
        <div class="card" @click="showPopup" :class="disabledClass()">
          <div
            class="card_body d_flex align_items_center justify_content_center"
          >
            <div class="item--content">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="60"
                height="60"
                viewBox="0 0 60 60"
              >
                <icon-plus />
              </icon-base>

              <p>Thêm một cookie</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(item, index) in accountsFB"
        :key="index"
        class="item c_md_6 c_lg_4 c_xl_3"
      >
        <div class="card">
          <div class="card_body">
            <div class="card--header">
              <delete-popup :content="item" />
            </div>
            <div class="card--content">
              <div class="avatar">
                <img class="picture" :src="item.userInfo.thumbSrc" />
                <span class="status active"> </span>
              </div>
              <h3 class="name">{{ item.userInfo.name }}</h3>
              <button class="btn btn--connect">
                Kết nối
              </button>
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
      <upgrade-pro-popup
        v-if="showUpgradePro == true"
        :data-theme="currentTheme"
        :showUpgradePro="showUpgradePro"
        @closeAddPopup="showUpgradePro = $event"
      />

      <add-popup
        v-if="showModal == true"
        :data-theme="currentTheme"
        :popupData="showModal"
        @closeAddPopup="showModal = $event"
      />
    </transition>
  </div>
</template>

<script>
import AddPopup from "./popup/add_popup";
import DeletePopup from "@/components/popup/p_acfb";
import UpgradeProPopup from "@/components/shared/upgradepro";
export default {
  props: ["accountsFB"],

  data() {
    return {
      showModal: false,
      showUpgradePro: false
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
    AddPopup,
    DeletePopup,
    UpgradeProPopup
  }
};
</script>

<style scoped lang="scss">
@import "./list_account.scss";
</style>
