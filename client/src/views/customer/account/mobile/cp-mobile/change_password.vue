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
            viewBox="0 0 20 20"
          >
            <icon-arrow-left />
          </icon-base>
        </div>
        <div class="popup--header-title text_left">
          <span>Thay đổi mật khẩu</span>
        </div>
        <div class="popup--header-action">
          <span>Lưu</span>
        </div>
      </div>
      <!--End: Popup Header-->
      <!--Popup change password content-->
      <div class="popup--change-content">
        <div class="change--pass-image">
          <icon-base
            icon-name="icon-key"
            width="94.998"
            height="95"
            viewBox="0 0 94.998 95"
          >
            <icon-key />
          </icon-base>
        </div>
        <div class="form_group position_relative text_left mb_3">
          <label>Mật khẩu cũ</label>
          <input type="password" value="123456" class="form_control" />
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
          <div class="icon--after position_absolute">
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
        <div class="form_group position_relative text_left mb_3">
          <label>Mật khẩu mới</label>
          <input type="text" placeholder="Nhập mật khẩu mới" class="form_control" />
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
          <div class="icon--after position_absolute">
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
        <div class="form_group position_relative text_left mb_3">
          <label>Nhập lại mật khẩu mới</label>
          <input type="password" placeholder="Nhập lại mật khẩu mới" class="form_control" />
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
          <div class="icon--after position_absolute">
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
import IconKey from "@/components/icons/IconKey";
export default {
  props: ["isChangePassword"],
  methods: {
    closeChangePassword: function() {
      this.$emit("closeChangePassword", false);
    }
  },
  components: {
    IconBase,
    IconArrowLeft,
    IconLock,
    IconLockCheck,
    IconEye,
    IconKey
  }
};
</script>
<style lang="scss" scoped>
    @import "./account_change_password.style";
</style>
