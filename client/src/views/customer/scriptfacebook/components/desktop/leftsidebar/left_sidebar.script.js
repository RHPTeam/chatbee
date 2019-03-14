import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";

export default {
  props: ["groupBlock"],
  components: { IconBase, IconSortDown, IconPlus },
  data() {
    return {
      listScriptClose: [],
      currentSelectIndex: null,
      currentIndex: null,
      isAddTypeDropdown: false,
      isActionItemDropdown: false,
      currentIndexActionItemDropdown: null,
      currentIndexGroupItemButton: null
    };
  },
  methods: {
    showDatePopup(index) {
      this.currentIndex = index;
    },
    showSelectPopup(index) {
      this.currentSelectIndex = index;
    },
    closeAddTypeDropdown() {
      this.isAddTypeDropdown = false;
    },
    showBlock(id) {
      this.$store.dispatch("getBlock", id);
    },
    createBlock(groupId) {
      this.$store.dispatch("createBlock", groupId);
    },
    createSequence() {
      console.log("Seuqence here...");
    },
    createGroup() {
      this.$store.dispatch("createGroupBlock");
    },
    deleteGroup() {
      console.log("Delete here...");
    },
    openActionItemDropdown(index) {
      this.currentIndexActionItemDropdown === index ? this.currentIndexActionItemDropdown = null : this.currentIndexActionItemDropdown = index
    },
    showActionGroupItem(index) {
      this.currentIndexGroupItemButton = index
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
