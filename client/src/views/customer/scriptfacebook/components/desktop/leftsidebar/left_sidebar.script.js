export default {
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
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupBlock() {
      return this.$store.getters.groups;
    },
    groupSequence() {
      return this.$store.getters.groupSqc;
    }
  },
  async created() {
    await this.$store.dispatch("getGroupBlock");
    await this.$store.dispatch("getSequence"); 
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
    deleteSequence(sequenceId){
      console.log(sequenceId);
      this.$store.dispatch("deteleSequence", sequenceId);
    },
    openActionItemDropdown(e) {
      // this.currentIndexActionItemDropdown === index
      //   ? (this.currentIndexActionItemDropdown = null)
      //   : (this.currentIndexActionItemDropdown = index);
      console.log(e);

    },
    showActionGroupItem(index) {
      this.currentIndexGroupItemButton = index;
    }
  }
};
