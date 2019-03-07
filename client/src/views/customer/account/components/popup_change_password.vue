<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <img :src="imageLogo" width="136" height="70" alt>
        </div>
        <div class="modal--body">
          <div
            class="modal--desc"
          >Chúng tôi thấy bạn vừa thay đổi mật khẩu của mình. Bạn phải nhập mật khẩu cũ để xác nhận sự thay đổi này.</div>
          <div class="modal--input position_relative p_3">
            <div class="icon position_absolute">
              <icon-base icon-name="lock" viewBox="0 0 20 20">
                <icon-padlock/>
              </icon-base>
            </div>
            <input type="text" class="form_control" placeholder="Nhập mật khẩu cũ">
          </div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button class="btn--modal btn-add" @click="closeDeletePopup">Hủy</button>
          <button class="btn--modal btn-skip">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPadlock from "@/components/icons/IconPadlock";
export default {
  props: ["showModal"],
  data() {
    return {
      imageLogo: require("@/assets/images/register--logo.png")
    };
  },
  methods: {
    closeDeletePopup() {
      this.$emit("closeDeletePopup", false);
    }
  },
  components: {
    IconBase,
    IconPadlock
  }
};
</script>
<style lang="scss" scoped>
@import "./popup.style";
</style>
