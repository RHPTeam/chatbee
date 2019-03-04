<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content modal--confirm">
        <div class="modal--body">
          <div class="logo">
            <div class="logo--icon">
              <icon-base
                icon-name="logo-short"
                width="44.08"
                height="44.01"
                viewBox="0 0 31.706 31.659"
              >
                <icon-logo-short/>
              </icon-base>
            </div>
            <div class="logo--text">
              <icon-base
                icon-name="logo-text"
                width="136.4"
                height="21.96"
                viewBox="0 0 98.122 15.799"
              >
                <icon-logo-text/>
              </icon-base>
            </div>
          </div>
          <div class="confirm-desc">Bạn chắc chắn muốn lưu bộ hẹn?</div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button class="btn-cancel" @click="closeAddPopup">Hủy</button>
          <button class="btn-done" >Có</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconLogoShort from "@/components/icons/IconLogoShort";
import IconLogoText from "@/components/icons/IconLogoText";
export default {
  props: ["showModal"],
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    }
  },
  components: {
    IconBase,
    IconLogoShort,
    IconLogoText
  }
};
</script>
<style lang="scss" scoped>
@import "./modal";
</style>
