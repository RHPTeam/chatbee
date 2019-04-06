<template>
  <div v-if="!attribute"></div>
  <div
    v-else
    class="script--body-tag-item d_flex align_items_center position_relative mb_2"
  >
    <div
      class="tag--created position_relative"

    >
      <div class="name position_relative"></div>
      <div class="created d_flex align_items_center p_2">
        <div class="sk left">{{</div>
        <div class="tag--created-item">
          <contenteditable
            class="editable"
            placeholder="Tên thuộc tính"
            tag="div"
            :contenteditable="true"
            v-model="attribute[0].name"
            @keyup="upTypingText('nameattribute', attribute)"
            @keydown="clear"
            @click="showSuggestNameAttribute"
            v-click-outside="closeSuggestNameAttribute"
          />
        </div>
        <div class="sk left">}}</div>
      </div>
      <div
        class="list--attribute position_absolute"
        v-if="suggestNameAttribute === true"
      >
        <VuePerfectScrollbar class="scroll--list">
          <div
            class="list--item d_flex align_items_center justify_content_between"
            v-for="(item, index) in resultFilterName"
            :key="`n-${index}`"
            @click="attachNameAttribute(item, attribute)"
          >
            <div class="name">{{ item.name }}</div>
            <div class="total">{{ item._friends.length }} bạn bè</div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
    <div
      class="tag--created position_relative"
    >
      <div class="tag--created-value">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="Giá trị thuộc tính"
          :contenteditable="true"
          v-model="attribute[0].value"
          @keyup="upTypingText('valueattribute', attribute)"
          @keydown="clear"
          @click="showSuggestValueAttribute"
          v-click-outside="closeSuggestValueAttribute"
        />
      </div>
      <div
        class="list--attribute position_absolute"
        v-if="suggestValueAttribute === true"
      >
        <VuePerfectScrollbar class="scroll--list">
          <div
            class="list--item d_flex align_items_center justify_content_between"
            v-for="(item, index) in resultFilterValue"
            :key="`v-${index}`"
            @click="attachValueAttribute(item, attribute)"
          >
            <div class="name">{{ item.value }}</div>
            <div class="total">{{ item._friends.length }} bạn bè</div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
    <div
      class="tag--icon-delete d_flex align_items_center position_absolute"
      @click.prevent="deleteItemAttr"
    >
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 18 18">
        <icon-remove />
      </icon-base>
    </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AttributeService from "@/services/modules/attributes.service";
let typingTimer;
export default {
  props: {
    block: Object,
    content: Object,
    item: String
  },
  data() {
    return {
      attribute: null,
      listAttr: null,
      resultFilterName: null,
      resultSuggestName: null,
      resultFilterValue: null,
      suggestNameAttribute: false,
      suggestValueAttribute: false
    };
  },
  async created() {
    const attr = await AttributeService.show(this.item);
    this.attribute = attr.data.data;
  },
  computed: {},
  methods: {
    deleteItemAttr() {
      const dataSender = {
        blockId: this.block._id,
        itemId: this.content._id,
        valueText: this.item
      };
      this.$store.dispatch("deleteItemAttrInBlock", dataSender);
    },
    closeSuggestNameAttribute() {
      this.suggestNameAttribute = false;
    },
    closeSuggestValueAttribute() {
      this.suggestValueAttribute = false;
    },
    async showSuggestNameAttribute() {
      this.suggestNameAttribute = true;
      // Filter item have name # null
      const listAttribute = await AttributeService.index();
      this.listAttr = listAttribute.data.data;
      this.resultFilterName = this.listAttr.filter(item => item.name !== "");
      // Suggest name atribute when create
      this.resultSuggestName = this.resultFilterName.filter(item => {
        item.name.toLowerCase().includes(this.attribute[0].name.toLowerCase());
        // console.log(this.attribute[0].name);
      });
    },
    async showSuggestValueAttribute() {
      this.suggestValueAttribute = true;
      const listAttribute = await AttributeService.index();
      this.listAttr = listAttribute.data.data;
      this.resultFilterValue = this.listAttr.filter(item => item.value !== "");
    },
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "nameattribute") {
        typingTimer = setTimeout(this.updateNameAttribute(group), 800);
      } else if (type === "valueattribute") {
        typingTimer = setTimeout(this.updateValueAttribute(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateNameAttribute() {
      this.$store.dispatch("updateAttribute", this.attribute[0]);
    },
    updateValueAttribute() {
      this.$store.dispatch("updateAttribute", this.attribute[0]);
    },
    attachNameAttribute (item, attribute) {
      attribute[0].name = item.name;
      console.log(this.attribute);
      console.log(item);
      this.$store.dispatch("updateAttribute", attribute[0]);
    },
    attachValueAttribute (item, attribute) {
      attribute[0].value = item.value;
      console.log(23)
      console.log(this.attribute[0]);
      this.$store.dispatch("updateAttribute", attribute[0]);
    }
  },
  components: {
    VuePerfectScrollbar
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
