<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content add--receiver">
        <div class="modal--body">
          <div class="receiver--list d_flex justify_content_start align_items_center">
            <div class="list--item">
              <img
                src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
                width="36"
                alt="User Image"
              >
            </div>
            <div class="list--item">
              <img
                src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
                width="36"
                alt="User Image"
              >
            </div>
          </div>
          <div class="receiver--search"></div>
          <div class="receiver--filter"></div>
          <div class="receiver--user"></div>
        </div>
        <!-- <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-add">THÊM COOKIE</button>
          <button class="btn-skip" @click="closeAddPopup">SKIP</button>
        </div>-->
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
