import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
import IconCopy from "@/components/icons/IconCopy";
import IconLink from "@/components/icons/IconLink";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconPlus from "@/components/icons/IconPlus";
import IconCancel from "@/components/icons/IconCancel";
import IconSandClock from "@/components/icons/IconSandClock";
import IconTag from "@/components/icons/IconTag";
import IconMove from "@/components/icons/IconMove";
import IconUploadImage from "@/components/icons/IconUploadImage";
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
  watch: {
    "block.name"(value) {
      const blockId = this.$store.getters.block._id;
      if (blockId == undefined) return false;
      const dataSender = {
        name: value,
        id: blockId
      };
      this.$store.dispatch("updateBlock", dataSender);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    block() {
      return this.$store.getters.block;
    },
    status() {
      return this.$store.getters.status;
    }
  },
  async created() {
    const blocks = await BlockService.index();
    const firstBlockId = blocks.data.data[0]._id;
    this.$store.dispatch("getBlock", firstBlockId);
  },
  components: {
    IconBase,
    IconCopy,
    IconLink,
    IconRemove,
    IconImage,
    IconText,
    IconCancel,
    IconSandClock,
    IconTag,
    IconMove,
    IconUploadImage,
    IconPlus,
    PopupPlugins
  }
};
