import PopupPlugins from "../popup/popup_add_plugins";
import AddTimer from "@/components/slider/index";

import BlockService from "@/services/modules/block.service";
// import SequenceService from "@/services/modules/sequence.service";
export default {
  data() {
    return {
      textValue: "",
      showPopupPlugins: false,
      showAddAttribute: false,
      isShowAddAttribute: false,
      showOptionTablet: false,
      isDeletePopup: false
    };
  },
  methods: {
    // Close option in screen tablet
    closeOptionTablet() {
      this.showOptionTablet = false;
    },
    /*Delete Block
    deleteBlock(blockId) {
      this.$store.dispatch("deleteBlock", blockId);
    },*/
    // Add Text Value in block
    addItemBlock(type, blockId) {
      const dataSender = {
        value: "",
        type: type,
        id: blockId
      };
      this.$store.dispatch("createItemBlock", dataSender);
    },
    deleteItemBlock(block, id) {
      const dataSender = {
        blockId: block._id,
        itemId: id
      };
      this.$store.dispatch("deleteItemBlock", dataSender);
      this.$router.push({ name: "f_script" });
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
  },
  components: {
    PopupPlugins,
    AddTimer
  }
};
