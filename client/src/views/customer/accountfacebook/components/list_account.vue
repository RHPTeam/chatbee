<template>
  <div class="wrapper">
    <div class="list r">
      <div class="addItem c_md_6 c_lg_4 c_xl_3 ">
        <div class="card">
          <div class="card_body">
            <div class="item--content" @click="showModal = true">
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
        v-for="item in arrStt"
        :key="item.id"
        class="item c_md_6 c_lg_4 c_xl_3 "
      >
        <div class="card">
          <div class="card_body">
            <div class="card--header">
              <icon-base
                icon-name="remove"
                width="15"
                height="15"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
            <div class="card--content">
              <div class="avatar">
                <img
                  class="picture"
                  src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
                />
                <span class="status" :class="{ active: !item.stt }">
                  <icon-base
                    icon-name="status"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <icon-status />
                  </icon-base>
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
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import IconStatus from "@/components/icons/IconStatus";
import AddPopup from "./popup/add_popup";
export default {
  data() {
    return {
      showModal: "false",
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
    IconRemove,
    IconStatus,
    AddPopup
  }
};
</script>

<style scoped lang="scss">
@import "./list_account.scss";
</style>
