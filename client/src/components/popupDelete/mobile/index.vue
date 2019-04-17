<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_end">
      <div class="modal--content mb_2">
        <div class="modal--body mb_2">
          <div class="modal--desc p_2">
            {{ desc }}
          </div>
          <div class="btn--delete p_2" @click.prevent="deleteItemAccount">
            Xóa
          </div>
        </div>
        <div class="modal--footer btn--skip p_2" @click="closeDeleteItemPopup">
          Hủy
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    desc: String
  },
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
    async closeDeleteItemPopup() {
      this.$emit("close", false);
    },
    async deleteItemAccount() {
      await this.closeDeleteItemPopup();
      // remove localStorage
      localStorage.removeItem("rid");
      this.$store.dispatch("deleteAccountFacebook", this.item._id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.mobile.styles";
</style>
