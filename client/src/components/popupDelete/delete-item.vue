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
          <button class="btn--modal btn-skip" @click="closeDeleteItemPopup">
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
    group: String,
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
    async closeDeleteItemPopup() {
      this.$emit("close", false);
    },
    async deleteItem() {
      await this.closeDeleteItemPopup();
      const dataSender = {
          blockId: this.group,
          itemId: this.content,
          target: this.target
        }
        console.log(dataSender)
      if (this.target.toString().toLowerCase() === "itemBlock") {
        console.log(this.target);
        const data = {
          blockId: this.dataSender.blockId
        }
        console.log(data)
        // this.$store.dispatch("deleteItemBlock", dataSender);
        // this.$router.push({ name: "f_script" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./popup_delete.style";
</style>
