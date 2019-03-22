<template>
  <div class="popup--change-pass position_fixed">
    <div class="popup--wrapper">
      <!--Start: Popup Header-->
      <div
        class="popup--header d_flex justify_content_between align_items_center"
      >
        <div class="popup--header-back" @click="closeChangePassword">
          <icon-base
            icon-name="icon-arrow"
            width="24"
            height="24"
            viewBox="0 0 25 25"
          >
            <icon-arrow-left />
          </icon-base>
        </div>
        <div class="popup--header-title text_left">
          <span>Thay đổi mật khẩu</span>
        </div>
        <div class="popup--header-action" @click="resetPassword">
          <span>Lưu</span>
        </div>
      </div>
      <!--End: Popup Header-->
      <!--Popup change password content-->
      <div class="popup--change-content">
        <div class="change--pass-image">
          <img :src="imageChangePassword" width="218" height="130" alt="" />
        </div>
        <div
          class="alert alert_danger"
          v-if="this.$store.getters.authStatus === 'error'"
        >
          {{ this.$store.getters.textAuth }}
        </div>
        <div class="form_group position_relative text_left mb_3">
          <label>Mật khẩu cũ</label>
          <input
            :type="typePassword"
            class="form_control"
            v-model="oldPassword"
          />
          <div class="icon--before position_absolute">
            <icon-base
              icon-name="icon-lock"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            >
              <icon-lock />
            </icon-base>
          </div>
          <div
            class="icon--after position_absolute"
            @click.prevent="changeTypeInput"
          >
            <icon-base
              icon-name="icon-eyes"
              width="20"
              height="20"
              viewBox="0 0 442.04 240.57"
            >
              <icon-eye />
            </icon-base>
          </div>
        </div>
        <div
          class="form_group position_relative text_left mb_3"
          :class="{
            errors: statusClassError.newPassword,
            passed: statusClassPassed.newPassword
          }"
        >
          <label>Mật khẩu mới</label>
          <input
            :type="typePassword"
            placeholder="Nhập mật khẩu mới"
            class="form_control"
            v-model="reset.newPassword"
          />
          <div class="icon--before position_absolute">
            <icon-base
              icon-name="icon-lock"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            >
              <icon-lock />
            </icon-base>
          </div>
          <div
            class="icon--after position_absolute"
            @click.prevent="changeTypeInput"
          >
            <icon-base
              icon-name="icon-eyes"
              width="20"
              height="20"
              viewBox="0 0 442.04 240.57"
            >
              <icon-eye />
            </icon-base>
          </div>
        </div>
        <div class="text--error text_left mb_1">
          {{ errorText.newPassword }}
        </div>
        <div
          class="form_group position_relative text_left mb_3"
          :class="{
            errors: statusClassError.confirmNewPassword,
            passed: statusClassPassed.confirmNewPassword
          }"
        >
          <label>Nhập lại mật khẩu mới</label>
          <input
            :type="typePassword"
            placeholder="Nhập lại mật khẩu mới"
            class="form_control"
            v-model="reset.confirmNewPassword"
          />
          <div class="icon--before position_absolute">
            <icon-base
              icon-name="icon-lock-check"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            >
              <icon-lock-check />
            </icon-base>
          </div>
          <div
            class="icon--after position_absolute"
            @click.prevent="changeTypeInput"
          >
            <icon-base
              icon-name="icon-eyes"
              width="20"
              height="20"
              viewBox="0 0 442.04 240.57"
            >
              <icon-eye />
            </icon-base>
          </div>
        </div>
        <div class="text--error text_left">
          {{ errorText.confirmNewPassword }}
        </div>
      </div>
      <!--End popup change password content-->
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconLock from "@/components/icons/IconLock";
import IconLockCheck from "@/components/icons/IconLockCheck";
import IconEye from "@/components/icons/IconEye";

export default {
  props: ["isChangePassword"],
  data() {
    return {
      imageChangePassword: require("@/assets/images/password-change.png"),
      typePassword: "password",
      oldPassword: "",
      reset: {
        newPassword: "",
        confirmNewPassword: ""
      },
      errorText: {
        newPassword: "",
        confirmNewPassword: ""
      },
      statusClassError: {
        newPassword: false,
        confirmNewPassword: false
      },
      statusClassPassed: {
        newPassword: false,
        confirmNewPassword: false
      }
    };
  },
  methods: {
    closeChangePassword: function() {
      this.$emit("closeChangePassword", false);
    },
    changeTypeInput() {
      this.typePassword =
        this.typePassword === "password" ? "text" : "password";
    },
    resetPassword() {
      const resetSender = {
        password: this.oldPassword,
        newPassword: this.reset.newPassword
      };
      this.$store.dispatch("changePassword", resetSender);
      if (this.$store.getters.authStatus === "success") {
        console.log("đừng có đóng cmm");
      }
    }
  },
  watch: {
    "reset.newPassword"(value) {
      this.errorText.newPassword = "Mật khẩu phải nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.newPassword = true;
      this.statusClassPassed.newPassword = false;
      if (value.length > 5 && value.length < 20) {
        this.errorText.newPassword = "";
        this.statusClassError.newPassword = false;
        this.statusClassPassed.newPassword = true;
      } else if (value.length === 0) {
        this.errorText.newPassword = "";
        this.statusClassError.newPassword = false;
        this.statusClassPassed.newPassword = false;
      }
    },
    "reset.confirmNewPassword"(value) {
      this.errorText.confirmNewPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmNewPassword = true;
      this.statusClassPassed.confirmNewPassword = false;
      if (value === this.reset.newPassword) {
        this.errorText.confirmNewPassword = "";
        this.statusClassError.confirmNewPassword = false;
        this.statusClassPassed.confirmNewPassword = true;
      } else if (value.length === 0) {
        this.errorText.confirmNewPassword = "";
        this.statusClassError.confirmNewPassword = false;
        this.statusClassPassed.confirmNewPassword = false;
      }
    }
  },
  components: {
    IconBase,
    IconArrowLeft,
    IconLock,
    IconLockCheck,
    IconEye
  }
};
</script>
<style lang="scss" scoped>
@import "./account_change_password.style";
</style>
