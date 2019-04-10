<template>
  <div class="script--body-text mt_3">
    <div class="script--body-delete" @click="isDeleteItemBlock = true">
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 15 15">
        <icon-remove />
      </icon-base>
    </div>
    <div class="script--body-move d_none">
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 64 64">
        <icon-move />
      </icon-base>
    </div>
    <div class="script--body-text-edit position_relative">
      <contenteditable
        class="script--header-title"
        tag="div"
        :contenteditable="true"
        v-model="item.valueText"
        @keyup="upTypingText('updateitem', item)"
        @keydown="clear"
        v-click-outside="closeSuggestAttributeInItem"
      />
      <div
        class="list--suggest position_absolute"
        v-if="showSuggestAttribute === true"
      >
        <VuePerfectScrollbar class="suggest">
          <div
            class="suggest--item"
            v-for="(list, index) in resultFilterAttr"
            :key="`l-${index}`"
            @click="attachValue(list, item)"
          >
            {{ list.name }}
          </div>
          <div
            class="suggest--item"
            v-for="(fixed, index) in dataFixed"
            :key="`f-${index}`"
            @click="attachValueFixed(fixed, item)"
          >
            {{ fixed.value }}
          </div>
        </VuePerfectScrollbar>
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
import AttributeService from "@/services/modules/attributes.service";

import VuePerfectScrollbar from "vue-perfect-scrollbar";

let typingTimer;

export default {
  props: ["item", "block"],
  data() {
    return {
      isDeleteItemBlock: false,
      showSuggestAttribute: false,
      listAttribute: null,
      resultFilterAttr: null,
      dataFixed: [
        { id: 0, value: "Danh xưng" },
        { id: 1, value: "Tên" },
        { id: 2, value: "Họ tên" }
      ]
    };
  },
  methods: {
    async upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "updateitem") {
        typingTimer = setTimeout(this.updateItem(group), 2000);
        if (group.valueText === "{{") {
          this.showSuggestAttribute = true;
          // Filter item have name # null
          const resultAttribute = await AttributeService.index();
          this.listAttribute = resultAttribute.data.data;
          this.resultFilterAttr = this.listAttribute.filter(
            item => item.name !== ""
          );
        }
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    // Update item in block
    updateItem(item) {
      const objSender = {
        itemId: item._id,
        valueText: item.valueText,
        block: this.$store.getters.block
      };
      this.$store.dispatch("updateItemBlock", objSender);
    },
    closeSuggestAttributeInItem() {
      this.showSuggestAttribute = false;
    },
    attachValue(list, item) {
      item.valueText = "{{" + list.name + "}}";
      // item.valueText += '{{' +list.name + '}}' + ' ';
      const dataSender = {
        itemId: item._id,
        valueText: item.valueText,
        block: this.block
      };
      console.log(dataSender);
      this.$store.dispatch("updateItemBlock", dataSender);
    },
    attachValueFixed(fixed, item) {
      item.valueText = fixed.value;
      const dataSender = {
        itemId: item._id,
        valueText: item.valueText,
        block: this.block
      };
      console.log(dataSender);
      this.$store.dispatch("updateItemBlock", dataSender);
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>
<style lang="scss" scoped>
@import "../main_script.style";
</style>
