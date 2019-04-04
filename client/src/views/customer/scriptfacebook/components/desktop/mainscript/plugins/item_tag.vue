<template>
  <div v-if="!attribute"></div>
  <div
    v-else
    class="script--body-tag-item d_flex align_items_center position_relative mb_2"
  >
    <div class="tag--created">
      <div class="name position_relative"></div>
      <div class="created position_absolute d_flex align_items_center p_2">
        <div class="sk left">{{</div>
        <div class="tag--created-item">
          <editable-attr
            :value="attribute[0].name"
            @input="attribute[0].name = $event"
            :target="item"
            :attribute="attribute"
            type="nameattribute"
            placeholder="Tên thuộc tính"
          ></editable-attr>
        </div>
        <div class="sk left">}}</div>
      </div>
    </div>
    <div class="tag--created">
      <div class="tag--created-value">
        <editable-attr
          :value="attribute[0].value"
          @input="attribute[0].value = $event"
          :target="item"
          :attribute="attribute"
          type="valueattribute"
          placeholder="Giá trị thuộc tính"
        ></editable-attr>
      </div>
    </div>
    <div
      class="tag--icon-delete d_flex align_items_center position_absolute"
      @click.prevent="deleteItemAttr(item)"
    >
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 18 18">
        <icon-remove />
      </icon-base>
    </div>
  </div>
</template>
<script>
import AttributeService from "@/services/modules/attributes.service";
import EditableAttr from "./editable_attribute";
export default {
  props: {
    item: String
  },
  data() {
    return {
      attribute: null
    };
  },
  async created() {
    const attr = await AttributeService.show(this.item);
    this.attribute = attr.data.data;
  },
  computed: {},
  methods: {
    deleteItemAttr(id) {
      this.$store.dispatch("deleteItemAttribute", id);
    }
  }, components: {
    EditableAttr
  }
};
</script>
<style lang="scss" scoped>
@import "../main_script.style";
.tag--created-item {
  .editable {
    overflow: hidden;
  }
}
</style>
