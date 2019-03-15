<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <img :src="imageLogo" width="136" height="70" alt="" />
        </div>
        <div class="modal--body">
          <div class="modal--desc">
            {{ descModal }}
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--modal btn-add" @click="closeDeletePopup">
            Hủy
          </button>
          <button class="btn--modal btn-skip" @click="deleteImage">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showModal", "descModal", "typePopup", "dataUser"],
  data() {
    return {
      imageLogo: require("@/assets/images/register--logo.png")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeDeletePopup() {
      this.$emit("closeDeletePopup", false);
    },
    deleteImage() {
      if(this.typePopup == 1) {
        this.dataUser.imageAvatar = ""
      }
      this.$store.dispatch("updateUser", this.user);
      this.closeDeletePopup();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./popup_delete.style";
</style>
