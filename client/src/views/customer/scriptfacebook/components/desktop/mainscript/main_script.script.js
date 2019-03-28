import PopupPlugins from "../popup/popup_add_plugins.vue";
import AddTimer from "@/components/slider/index";
import Subcrible from "./plugins/subcrible";
import UnSubcrible from "./plugins/unsubcrible";
import AddTag from "./plugins/add-tag";

import BlockService from "@/services/modules/block.service";
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
      showUnSubcrible: false
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
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.sendFile();
    },
    sendFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      this.$store.dispatch("sendFile", formData);
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
    AddTimer,
    PopupPlugins,
    Subcrible,
    UnSubcrible,
    AddTag
  }
};
