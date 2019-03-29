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
          <div class="name position_relative">
            {{ attributeName }}
          </div>
          <div class="created position_absolute d_flex align_items_center p_2">
            <div class="sk left">{{</div>
            <div
              class="tag--created-item"
              name="text"
              placeholder="Tên thuộc tính"
              contenteditable="true"
            ></div>
            <div class="sk left">}}</div>
          </div>
        </div>
        <div class="tag--created">
          <input type="text" placeholder="Nhập giá trị" class="form_control" />
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
          <div class="name position_relative">
            {{ attributeName }}
          </div>
          <div class="created position_absolute d_flex align_items_center p_2">
            <div class="sk left">{{</div>
            <div
              class="tag--created-item"
              name="text"
              placeholder="Tên thuộc tính"
              contenteditable="true"
            ></div>
            <div class="sk left">}}</div>
          </div>
        </div>
        <div class="tag--created">
          <input type="text" placeholder="Nhập giá trị" class="form_control" />
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    arrValue: Array
  },
  data() {
    return {
      isShowAddAttribute: false,
      attributeName: "Tên thuộc tính",
      attributeNameItem: ""
    };
  },
  methods: {
    async addItem() {
      await this.arrValue.push(this.attributeNameItem);
      this.attributeNameItem = "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../main_script.style";
</style>
