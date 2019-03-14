<template>
  <div class="script--footer">
    <div class="script--footer-addelm">
      <!--Thêm văn bản-->
      <div v-if="textList.length > 0">
        <div
          class="script--body-text d_flex align_items_center mb_2"
          v-for="(item, index) in textList"
          :key="index"
        >
          <div class="script--body-text-edit">
            <div contenteditable="true" v-model="textValue">Nhập văn bản</div>
          </div>
          <div class="script--body-icon ml_2">
            <div class="script--body-delete mb_1" @click="removeText(index)">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
            <div class="script--body-move">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 64 64"
              >
                <icon-move />
              </icon-base>
            </div>
          </div>
        </div>
      </div>
      <!--Thêm ảnh mới-->
      <div v-if="imageList.length > 0">
        <div
          class="script--body-image d_flex align_items_center position_relative mb_2"
          v-for="(item, index) in imageList"
          :key="index"
        >
          <div class="scrip--body-image-link">
            <img
              src="http://pipsum.com/280x207.jpg"
              alt="demo scripts facebook"
            />
          </div>
          <div class="script--body-icon ml_2">
            <div class="script--body-delete" @click="removeText(index)">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
            <div class="script--body-move mt_1 mb_1">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 64 64"
              >
                <icon-move />
              </icon-base>
            </div>
            <div class="script--body-move">
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
          <div
            class="script--body-upload-image position_absolute"
            v-model="textValue"
          >
            <input type="file" name="upload_image" id="upload_image" />
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
      </div>
      <!--end add element-->
      <div class="title">Thêm phần tử</div>
      <div class="gr-addelm d_flex align_items_center ">
        <div
          class="addelm-item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addElm('text')"
        >
          <icon-base
            class="icon-text"
            width="20"
            height="20"
            viewBox="0 0 13.53 20.11"
          >
            <icon-text />
          </icon-base>
          Văn bản
        </div>

        <div
          class="addelm-item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addElm('image')"
        >
          <icon-base
            class="icon-image"
            width="20"
            height="20"
            viewBox="0 0 26 26"
          >
            <icon-image />
          </icon-base>
          Hình ảnh
        </div>
        <div
          class="addelm-item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addElm('timer')"
        >
          <icon-base
            class="icon-sand-clock"
            width="20"
            height="20"
            viewBox="0 0 14.41 20.14"
          >
            <icon-sand-clock />
          </icon-base>
          Thời gian chờ
        </div>
        <div
          class="addelm-item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addElm('timer')"
        >
          <icon-base
            class="icon-plus"
            width="20"
            height="20"
            viewBox="0 0 68 68"
          >
            <icon-plus />
          </icon-base>
          Thêm mới
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconPlus from "@/components/icons/IconPlus";
import IconSandClock from "@/components/icons/IconSandClock";
import IconTag from "@/components/icons/IconTag";
import IconMove from "@/components/icons/IconMove";
import IconUploadImage from "@/components/icons/IconUploadImage";
import IconRemove from "@/components/icons/IconRemove";
export default {
  data() {
    return {
      textValue: "",
      textList: [],
      imageList: [],
      timerList: []
    };
  },
  methods: {
    addElm(type) {
      if (type === "text") {
        this.textList.push({ textValue: "" });
      } else if (type === "image") {
        this.imageList.push({ imageValue: "" });
      } else if (type === "timer") {
        this.timerList.push({ timerValue: "" });
      }
    },
    removeText(index) {
      this.textList.pop(index);
    }
  },
  components: {
    IconBase,
    IconImage,
    IconText,
    IconSandClock,
    IconTag,
    IconMove,
    IconUploadImage,
    IconPlus,
    IconRemove
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
