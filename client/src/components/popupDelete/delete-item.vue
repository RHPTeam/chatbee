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
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  props: {
    block: String,
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
    async getSchedules() {
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      return result[0];
    },
    async deleteItem() {
      if (this.target.toString().toLowerCase() === "itemblock") {
        const dataSender = {
          blockId: this.block,
          itemId: this.content
        };
        this.$store.dispatch("deleteItemBlock", dataSender);
        this.$router.push({ name: "f_script" });
      } else if (this.target.toString().toLowerCase() === "itemschedule") {
        const schedules = await this.getSchedules();
        const dataSender = {
          bcId: schedules._id,
          blockId: this.block,
          contentId: this.content
        };
        this.$store.dispatch("deleteItemSchedule", dataSender);
        this.$router.push({ name: "f_broadcast_schedule" });
      } else if (this.target.toString().toLowerCase() === "blocksequence") {
        const dataSender = {
          blockId: this.content,
          sq_id: this.block
        };
        this.$store.dispatch("deleteBlockOnSequence", dataSender);
        this.$router.push({ name: "f_script" });
      }
      await this.closeDeleteItemPopup();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./popup_delete.style";
</style>
