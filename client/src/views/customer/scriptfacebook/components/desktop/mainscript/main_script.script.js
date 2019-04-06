import PopupPlugins from "../popup/popup_add_plugins.vue";
import AddTimer from "@/components/slider/index";
import Subcrible from "./plugins/subcrible";
import UnSubcrible from "./plugins/unsubcrible";
import AddTag from "./plugins/add-tag";

import BlockService from "@/services/modules/block.service";
import AttributeService from "@/services/modules/attributes.service";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

let typingTimer;

export default {
  data() {
    return {
      textValue: "",
      showPopupPlugins: false,
      showAddAttribute: false,
      showOptionTablet: false,
      isDeletePopup: false,
      isDeleteItemBlock: false,
      showSubcrible: false,
      showUnSubcrible: false,
      file: "",
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
    // Close option in screen tablet
    closeOptionTablet() {
      this.showOptionTablet = false;
    },
    // Add Text Value in block
    addItemBlock(type, blockId) {
      const dataSender = {
        value: "",
        type: type,
        id: blockId
      };
      this.$store.dispatch("createItemBlock", dataSender);
    },
    selectFile(id) {
      let indexImage;
      let arrCurrentBlock = this.block;
      arrCurrentBlock.contents
        .filter(item => item.typeContent === "image")
        .map((item, index) => {
          if (item._id === id) {
            indexImage = index;
          }
        });
      this.file = this.$refs.file[indexImage].files[0];
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
    },
    async upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "nameblock") {
        typingTimer = setTimeout(this.updateNameBlock(group), 800);
      } else if (type === "updateitem") {
        typingTimer = setTimeout(this.updateItem(group), 800);
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
    //Update name block
    updateNameBlock() {
      this.$store.dispatch("updateBlock", this.$store.getters.block);
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
    //Suggest name attribute when create charecter {{ on text item
    // async showSuggestAttributeInText(value) {
    //   console.log(value);
    //   if (value === '{{') {
    //     this.showSuggestAttribute = true;
    //     // Filter item have name # null
    //     const resultAttribute = await AttributeService.index();
    //     this.listAttribute = resultAttribute.data.data;
    //     this.resultFilterAttr = this.listAttr.filter(item => item.name !== "");
    //     console.log(this.resultFilterAttr);
    //   }
    // },
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
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    block() {
      return this.$store.getters.block;
    },
    sequence() {
      return this.$store.getters.itemSqc;
    }
  },
  async created() {
    const blocks = await BlockService.index();
    const firstBlockId = blocks.data.data[0]._id;
    this.$store.dispatch("getBlock", firstBlockId);
    this.$store.dispatch("getBlocks");
  },
  components: {
    AddTimer,
    PopupPlugins,
    Subcrible,
    UnSubcrible,
    AddTag,
    VuePerfectScrollbar
  }
};
