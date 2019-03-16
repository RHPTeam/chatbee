import PopupPlugins from "../popup/popup_add_plugins";

import BlockService from "@/services/modules/block.service";
export default {
  data() {
    return {
      textValue: "",
      showPopupPlugins: false,
      showAddAttribute: false,
      isShowAddAttribute: false,
      showOptionTablet: false
    };
  },
  methods: {
    // Close option in screen tablet
    closeOptionTablet() {
      this.showOptionTablet = false;
    },
    // Delete Block
    deleteBlock() {
      const blockId = this.$store.getters.block._id;
      this.$store.dispatch("deleteBlock", blockId);
    },
    // Add Text Value in block
    addItemBlock(type, blockId) {
      const dataSender = {
        value: "",
        type: type,
        id: blockId
      };
      this.$store.dispatch("createItemBlock", dataSender);
    }
  },
  // watch: {
  //   "block.name"(value) {
  //     // dispatch change name block
  //     const blockId = this.$store.getters.block._id;
  //     if (blockId == undefined) return false;
  //     const dataSender = {
  //       name: value,
  //       id: blockId
  //     };
  //     this.$store.dispatch("updateBlock", dataSender);
  //
  //     //dispatch change name sequence
  //     // const sequenceId = this.$store.getters.sequence._id;
  //     // if (sequenceId == undefined) return false;
  //     // const dataSequence = {
  //     //   name: value,
  //     //   id: sequenceId
  //     // }
  //     // this.$store.dispatch("updateSequence", dataSequence);
  //   }
  // },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    block() {
      return this.$store.getters.block;
    },
    status() {
      return this.$store.getters.statusBlocks;
    }
  },
  async created() {
    const blocks = await BlockService.index();
    const firstBlockId = blocks.data.data[0]._id;
    this.$store.dispatch("getBlock", firstBlockId);
  },
  components: {
    PopupPlugins
  }
};
