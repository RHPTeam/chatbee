<template>
  <div class="popup--mobile position_fixed" :data-theme="currentTheme">
    <div
      class="popup--mobile-wrap d_flex justify_content_center align_items_center"
    >
      <div class="popup-mobile-content p_3">
        <div class="popup--mobile-top">
          <icon-base
            icon-name="modal-cookie"
            width="450"
            height="160"
            viewBox="0 0 440 165"
          >
            <icon-modal-cookie />
          </icon-base>
        </div>
        <div class="popup--mobile-main p_3 mb_3 mt_1">
          <h3 class="mb_3">{{ nameBread }}</h3>
          <p class="mb_4">
            {{ subBread }}
          </p>
          <div class="alert p_2" v-if="isShowAlert === true">
            Mã cookie của bạn không chính xác, vui lòng xác nhận đây là mã cookie của tài khoản <span>{{ item.userInfo.name }}</span>.
          </div>
          <textarea
          class="form_control"
            placeholder="Nhập mã kích hoạt tại đây ..."
            v-model="cookie"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="updateCookie"
            @keydown.enter.shift.exact="newline"
          ></textarea>
        </div>
        <div class="popup--mobile-bot">
          <div>
            <button class="btn btn-add form_control mb_3" @click="updateCookie">
              Cập nhật
            </button>
          </div>
          <div class="btn btn-skip form_control text_center mt_2" @click="closeAddPopup">
            Hủy
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StringFuntion from "@/utils/string.util.js";
export default {
  props: ["item", "subBread", "nameBread"],
  data() {
    return {
      cookie: "",
      isShowAlert: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    async updateCookie() {
      const newUserId = StringFuntion.findSubString(this.cookie, "c_user=",  ";");
      const userId = this.item.userInfo.id
      if(newUserId === userId){
          await this.$store.dispatch("updateFacebook", {
          fbId: this.item,
          cookie: this.cookie
        });
        this.$emit("closeAddPopup", false);
      this.$router.go("/f_account");
      } else {
        this.isShowAlert = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style.mobile";
</style>
