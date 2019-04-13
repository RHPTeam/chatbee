<template>
  <div>
    <div class="script--body-image">
      <div class="script--body-delete" @click="isDeleteItemBlock = true">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="script--body-move d_none">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 64 64"
        >
          <icon-move />
        </icon-base>
      </div>
      <div class="scrip--body-image-link">
        <div
          class="default"
          v-if="item.valueText === '' || item.valueText === undefined"
          :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
        ></div>
        <img v-else :src="item.valueText" width="280" height="207" />
      </div>
      <div class="script--body-upload-image">
        <form enctype="multipart/form-data" @submit.prevent="sendFile">
          <input
            type="file"
            ref="file"
            @change="selectFile(item._id)"
            id="upload_image"
          />
        </form>
        <div class="script--body-image-icon">
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
      v-if="isDeleteItemBlock === true"
      desc="Bạn có thực sự muốn xóa nội dung kịch bản này không?"
      :content="item._id"
      :block="block._id"
      target="itemblock"
      @close="isDeleteItemBlock = $event"
    />
    <!--End: Delete Item Popup-->
  </div>
</template>
<script>
export default {
  props: ["item", "block"],
  data() {
    return {
      isDeleteItemBlock: false,
      file: "",
      srcDefault: require("@/assets/images/message/logo.png")
    };
  },
  methods: {
    selectFile(id) {
      this.file = this.$refs.file.files[0];
      this.sendFile(id);
    },
    sendFile(id) {
      const formData = new FormData();
      formData.append("file", this.file);
      const objSender = {
        id: id,
        formData: formData,
        block: this.block
      };
      this.$store.dispatch("updateItemImageBlock", objSender);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../main_script.style";
.default {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 280px;
  height: 207px;
  opacity: 0.3;
}
</style>
