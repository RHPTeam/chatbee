let typingTimer;
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
    block() {
      return this.$store.getters.block;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupBlock() {
      return this.$store.getters.groups;
    },
    groupSequence() {
      return this.$store.getters.groupSqc;
    },
    status() {
      return this.$store.getters.statusBlocks;
    },
    curConversation() {
      return this.$store.getters.curConversation;
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
    showBlock(id) {
      this.$store.dispatch("getBlock", id);
    },
    showItemSqc(SqcId) {
      this.$store.dispatch("getItemSqc", SqcId);
    },
    createBlock(groupId) {
      this.$store.dispatch("createBlock", groupId);
    },
    createItemSqc(sequenceId) {
      this.$store.dispatch("createItemSequences", sequenceId);
    },
    createSequence() {
      this.$store.dispatch("createSequence");
    },
    createGroup() {
      this.$store.dispatch("createGroupBlock");
    },
    showActionGroupItem(index) {
      this.currentIndexGroupItemButton = index;
    },
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "namegroupblock") {
        typingTimer = setTimeout(this.updateNameGroupBlock(group), 800);
      } else if (type === "namegroupsequence") {
        typingTimer = setTimeout(this.updateNameSequence(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    //Update name group block
    updateNameGroupBlock(value) {
      const objSender = {
        gr_id: value._id,
        name: value.name
      };
      this.$store.dispatch("updateGroupBlock", objSender);
    },
    //Update nam sequence
    updateNameSequence(value) {
      const objSender = {
        sq_id: value._id,
        name: value.name
      };
      this.$store.dispatch("updateSequence", objSender);
    }
  },
  sockets: {
    async receiveMessage(value) {
      console.log(value);
      console.log(this.curConversation)
      let _ = this;
      if (
        this.curConversation._sender === undefined ||
        this.curConversation._receiver === undefined
      ) {
        if (localStorage.getItem("rid")) {
          await this.$store.dispatch(
            "getAllConversationsByAcc",
            localStorage.getItem("rid")
          );
        }
      } else if (
        value.message._sender._id === this.curConversation._sender._id &&
        value.message._receiver._id === this.curConversation._receiver._id
      ) {
        // Listen receive messages of current conversation
        this.$store.dispatch("updateMessage", value.message);
        // Play audio when client listen new message
        console.log(2);
        _.$refs.audioTone.play();
      }
    }
  }
};
