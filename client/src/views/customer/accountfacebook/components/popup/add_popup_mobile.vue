<template>
  <div class="popup--mobile">
    <div
      class="popup--mobile-wrap d_flex justify_content_center align_items_center"
    >
      <div class="popup-mobile-content">
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
          <h3 class="mb_3">Thêm tài khoản Facebook</h3>
          <p class="mb_4">
            Dán mã kích hoạt Facebook vào ô bên dưới để thêm tài khoản.
          </p>
          <textarea
            placeholder="Nhập mã kích hoạt tại đây ..."
            class="form_control"
            v-model="cookie"
          ></textarea>
        </div>
        <div class="popup--mobile-bot">
          <div>
            <button class="btn btn_primary btn-add mb_3" @click="addCookie">
              XONG
            </button>
          </div>
          <div class="btn-skip text_center mt_2" @click="closeAddPopup">
            HỦY
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconModalCookie from "@/components/icons/IconModalCookie";
export default {
  props: ["showModal"],

  data() {
    return {
      cookie: ""
    };
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },

    addCookie() {
      this.$store.dispatch("addCookie", this.cookie);
      this.$emit("closeAddPopup", false);
    }
  },

  components: {
    IconBase,
    IconModalCookie
  }
};
</script>
<style lang="scss" scoped>
@import "../list_account_mobile";
</style>
