export default {
  props: ["groupBlock", "getSequence"],
  components: {},
  data() {
    return {
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
    showItemSequence(id) {
      this.$store.dispatch("getItemSequence", id);
    },
    createBlock(groupId) {
      this.$store.dispatch("createBlock", groupId);
    },
    createItemSequence(sequenceId) {
      console.log("click here");
      console.log(sequenceId);
      // this.$store.dispatch("createItemSequence", sequenceId);
    },
    createSequence() {
      this.$store.dispatch("createSequence");
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
