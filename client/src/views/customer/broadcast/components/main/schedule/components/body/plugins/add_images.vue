<template>
  <div>
    <div class="images d_flex align_items_center position_relative mb_2">
      <div class="image--link">
        <img :src="item.valueText" width="280px" height="207px" />
      </div>
      <div class="body--icon ml_2">
        <div class="icon--delete" @click="isDeleteItemSchedule = true">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="icon--move d_none mt_1 mb_1">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <icon-move />
          </icon-base>
        </div>
        <div class="icon--plus d_none">
          <icon-base
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
      <div class="upload--image position_absolute">
        <form enctype="multipart/form-data" @submit.prevent="sendFile">
          <input
            type="file"
            ref="file"
            @change="selectFile(item._id)"
            id="upload_image"
          />
        </form>
        <div class="image--icon">
          <div class="icon-image">
            <icon-base
              class="icon-image"
              width="32"
              height="32"
              viewBox="0 0 26 26"
              name="upload-image"
            >
              <icon-upload-image />
            </icon-base>
          </div>
          <span>Tải ảnh lên</span>
        </div>
      </div>
    </div>
    <!--Start:Delete Item Popup-->
    <delete-item
      v-if="isDeleteItemSchedule === true"
      desc="Bạn có thực sự muốn xóa nội dung này trong chiến dịch không?"
      :block="schedule._id"
      :content="item._id"
      target="itemschedule"
      @close="isDeleteItemSchedule = $event"
    />
    <!--End: Delete Item Popup-->
  </div>
</template>
<script>
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  props: ["item", "schedule"],
  data() {
    return {
      isDeleteItemSchedule: false,
      file: ""
    };
  },
  methods: {
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
    selectFile(id) {
      this.file = this.$refs.file.files[0];
      this.sendFile(id);
    },
    async sendFile(id) {
      const formData = new FormData();
      formData.append("file", this.file);
      const schedules = await this.getSchedules();
      const objSender = {
        bcId: schedules._id,
        blockId: this.schedule._id,
        contentId: id,
        value: formData
      };
      this.$store.dispatch("updateItemImageSchedule", objSender);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
