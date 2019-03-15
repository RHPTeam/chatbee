export default {
  props: ["groupBlock", "getSequence"],
  components: {},
  data() {
    return {
      listScriptClose: [],
      currentSelectIndex: null,
      currentIndex: null,
      isAddTypeDropdown: false,
      isActionItemDropdown: false,
      currentIndexActionItemDropdown: null,
      currentIndexGroupItemButton: null,
      showItemAction: false,
      showActionSequence: false,
      showOptionSequence: false
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
    closeActionSequence() {
      this.showActionSequence = false;
    },
    closeOptionSequence() {
      this.showOptionSequence = false;
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
    deleteGroup(groupId) {
      this.$store.dispatch("deleteGroup", groupId);
    },
    openActionItemDropdown(index) {
      this.currentIndexActionItemDropdown === index
        ? (this.currentIndexActionItemDropdown = null)
        : (this.currentIndexActionItemDropdown = index);
    },
    showActionGroupItem(index) {
      this.currentIndexGroupItemButton = index;
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    // Update name group block
  }
};
