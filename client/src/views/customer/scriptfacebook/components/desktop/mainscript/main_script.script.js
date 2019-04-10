import PopupPlugins from "../popup/popup_add_plugins.vue";
import AddTimer from "@/components/slider/index";
import Subcrible from "./plugins/subcrible";
import UnSubcrible from "./plugins/unsubcrible";
import AddTag from "./plugins/add-tag";
import AddText from "./plugins/add_text";
import AddImage from "./plugins/add_images";

import BlockService from "@/services/modules/block.service";

let typingTimer;

export default {
  data() {
    return {
      textValue: "",
      showPopupPlugins: false,
      showAddAttribute: false,
      showOptionTablet: false,
      isDeletePopup: false,
      showSubcrible: false,
      showUnSubcrible: false,
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
    async upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "nameblock") {
        typingTimer = setTimeout(this.updateNameBlock(group), 2000);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    //Update name block
    updateNameBlock() {
      this.$store.dispatch("updateBlock", this.$store.getters.block);
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
    AddText,
    AddImage,
  }
};
