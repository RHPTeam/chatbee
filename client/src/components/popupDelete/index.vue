<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <img :src="imageLogo" width="136" height="70" alt="" />
        </div>
        <div class="modal--body">
          <div class="modal--desc">
            {{ desc }}
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--modal btn-skip" @click="closeDeletePopup">
            Hủy
          </button>
          <button class="btn--modal btn-add" @click.prevent="deleteItem">
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: String,
    desc: String,
    target: String
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
    closeDeletePopup() {
      this.$emit("close", false);
    },
    deleteItem() {
      if (this.target.toString().toLowerCase() === "schedule") {
        this.$store.dispatch("deleteSchedule", this.content);
        this.closeDeletePopup();
        this.$router.push({ name: "f_broadcast" });
      } else if (this.target.toString().toLowerCase() === "syntax") {
        this.$store.dispatch("deleteSyntax", this.content);
        this.closeDeletePopup();
        this.$router.push({ name: "f_auto" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./popup_delete.style";
</style>
