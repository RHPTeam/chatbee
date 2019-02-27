<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">        
        <div class="modal--body">
          Body Confirm
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-add">THÊM COOKIE</button>
          <button class="btn-skip" @click="closeAddPopup">SKIP</button>
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
  methods: {
    closeAddPopup() {
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
@import "./modal";
</style>
