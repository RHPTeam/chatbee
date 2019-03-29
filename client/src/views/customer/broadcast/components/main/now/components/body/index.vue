<template>
  <div class="body mt_4 pb_3">
    <!--Thêm văn bản-->
    <div v-if="openAdd == true">
      <div class="text d_flex align_items_center mb_2">
        <div class="text-edit">
          <div contenteditable="true">Nhập văn bản</div>
        </div>
        <div class="body--icon ml_2">
          <div class="icon--delete mb_1">
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </div>
          <div class="icon-move d_none">
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
    <div>
      <div class="images d_flex align_items_center position_relative mb_2">
        <div class="image--link">
          <img
            src="http://pipsum.com/280x207.jpg"
            alt="demo scripts facebook"
          />
        </div>
        <div class="body--icon ml_2">
          <div class="icon--delete">
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </div>
          <div class="icon--move mt_1 mb_1 d_none">
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 64 64"
            >
              <icon-move />
            </icon-base>
          </div>
          <div class="icon--plus mt_1">
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
          <input type="file" name="upload_image" id="upload_image" />
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
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconPlus from "@/components/icons/IconPlus";
import IconMove from "@/components/icons/IconMove";
import IconUploadImage from "@/components/icons/IconUploadImage";
import IconRemove from "@/components/icons/IconRemove";
export default {
  props: ["openAdd"],
  data() {
    return {};
  },
  methods: {},
  components: {
    IconBase,
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
