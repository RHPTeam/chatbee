<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <icon-base
            icon-name="modal-cookie"
            width="440.4"
            height="156.808"
            viewBox="0 0 440.4 156.808"
          >
            <icon-modal-cookie />
          </icon-base>
        </div>
        <div class="modal--body">
          <div class="modal--title">Đăng nhập với cookie</div>
          <div class="modal--desc">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et.
          </div>
          <textarea
            placeholder="Nhập cookie tại đây ..."
            v-model="cookie"
          ></textarea>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-add" @click="addCookie">
            THÊM COOKIE
          </button>
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
@import "../list_account.scss";
</style>
