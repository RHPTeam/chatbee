<template>
  <div
    class="script--body-tag-item d_flex align_items_center position_relative mb_2"
  >
    <div class="tag--created">
      <div class="name position_relative">
      </div>
      <div class="created position_absolute d_flex align_items_center p_2">
        <div class="sk left">{{</div>
        <div class="tag--created-item">
          <editable
            :value="nameAttr"
            @input="nameAttr = $event"
            :target="item"
            type="nameattribute"
            placeholder="Tên thuộc tính"
          ></editable>
        </div>
        <div class="sk left">}}</div>
      </div>
    </div>
    <div class="tag--created">
      <div>
        <editable
          :value="valueAttr"
          @input="valueAttr = $event"
          :target="item"
          type="valueattribute"
          placeholder="Giá trị thuộc tính"
        ></editable>
      </div>
    </div>
    <div class="tag--icon-delete d_flex align_items_center position_absolute">
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 18 18">
        <icon-remove />
      </icon-base>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    arrValue: Array,
    item: String
  },
  data() {
    return {
      nameAttr: "",
      valueAttr: ""
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
