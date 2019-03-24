<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <icon-base
              icon-name="logo"
              width="183.99"
              height="68.84"
              viewBox="0 0 250.446 93.703"
            >
            <icon-logo />
          </icon-base>
        </div>
        <div class="modal--body">
          <div class="modal--txt mt_4 mb_2">
            Chúng tôi nhận thấy bạn vừa thay đổi mật khẩu của mình. Nhập mật
            khẩu cũ để xác nhận sự thay đổi này.
          </div>
          <div
            class="alert alert_danger"
            v-if="this.$store.getters.authStatus === 'error'"
          >
            {{ this.$store.getters.textAuth }}
          </div>
          <div class="modal--input position_relative p_3">
            <div class="icon position_absolute">
              <icon-base icon-name="lock" viewBox="0 0 20 20">
                <icon-padlock />
              </icon-base>
            </div>
            <input
              type="password"
              class="form_control"
              placeholder="Nhập mật khẩu cũ"
              v-model="oldPassword"
            />
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center mt_2"
        >
          <button class="btn--modal btn-add" @click="closeModalChangePassword">
            Hủy
          </button>
          <button class="btn--modal btn-skip" @click="updatePassword">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showModalChangePassword", "reset"],
  data() {
    return {
      imageLogo: require("@/assets/images/register--logo.png"),
      oldPassword: ""
    };
  },
  computed: {},
  methods: {
    closeModalChangePassword() {
      this.$emit("closeModalChangePassword", false);
    },
    updatePassword() {
      const passwordSender = {
        password: this.oldPassword,
        newPassword: this.reset.newPassword
      };
      this.$store.dispatch("changePassword", passwordSender);
      if (this.$store.getters.authStatus === "success") {
        this.$emit("closeModalChangePassword", false);
        this.$router.push("/account");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./popup.style";
</style>
