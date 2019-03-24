<template>
  <div class="script--body-tag">
    <div class="script--body-tag-title">
      <span class="script--body-tag-icon">
        <icon-base
          class="icon-tag"
          width="15"
          height="16"
          viewBox="0 0 337.7 487.85"
        >
          <icon-tag />
        </icon-base>
      </span>
      <span>Thuộc tính người dùng</span>
      <div class="ml_auto">
        <icon-base
          icon-name="remove"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <div class="script--body-tag-description">
      Đặt giá trị cho thuộc tính người dùng hiện có hoặc thêm thuộc tính mới. Sử
      dụng nhóm chiến dịch để gửi, kịch bản để xác định phân tích hoạt động của
      người dùng. Lưu ý rằng bạn có thể sử dụng các biểu thức và thuộc tính số
      học trong trường Giá trị.
    </div>

    <div class="script--body-tag-list">
      <div class="script--body-tag-edit-title d_flex">
        <span>Tên thẻ</span>
        <span>Giá trị</span>
      </div>
      <!--Add Attribute when click button add-->
      <div
        class="script--body-tag-item d_flex align_items_center position_relative mb_2"
        v-if="isShowAddAttribute == true"
      >
        <div class="tag--created">
          <div
            class="tag--created-item"
            name="text"
            placeholder="eg. Nhu cầu"
            contenteditable="true"
          >
            eg. Nhu cầu
          </div>
        </div>
        <div class="tag--created">
          <div
            class="tag--created-item"
            name="value"
            placeholder="Nhập giá trị"
            contenteditable="true"
          >
            Nhập giá trị
          </div>
        </div>
        <div
          class="tag--icon-delete d_flex align_items_center position_absolute"
        >
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <!--End add attribute-->
      <div
        class="script--body-tag-item d_flex align_items_center position_relative"
      >
        <div class="tag--created">
          <div
            class="tag--created-item"
            name="text"
            placeholder="eg. Nhu cầu"
            contenteditable="true"
          >
            eg. Nhu cầu
          </div>
        </div>
        <div class="tag--created">
          <div
            class="tag--created-item"
            name="value"
            placeholder="Nhập giá trị"
            contenteditable="true"
          >
            Nhập giá trị
          </div>
        </div>
        <div
          class="tag--icon-delete d_flex align_items_center position_absolute"
        >
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="script--body-tag-footer">
        <div
          class="script--body-tag-add"
          @click="isShowAddAttribute = !isShowAddAttribute"
        >
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus />
            </icon-base>
          </span>
          <span>Thêm thẻ</span>
        </div>
        <div class="script--subscribe-input" contenteditable="true"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowAddAttribute: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../main_script.style";
</style>
