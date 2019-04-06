import DeleteFriendsPopup from "../../../popup/delete-popup/delete-popup";
import AddtoGroupPopup from "../../../popup/addto-group-popup/addto-group-popup";
import AppTooltip from "./tooltip";
let typingTimer;
export default {
  props: ["groupSelected"],
  data() {
    return {
      showSequenceDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
      search: ""
    };
  },
  async created () {
    await this.$store.dispatch("getAccountsFB");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupInfo() {
      return this.$store.getters.groupInfo;
    },
    listAccountFacebook() {
      return this.$store.getters.accountsFB;
    },
    users() {
      return this.$store.getters.allFriends;
    },
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    }
  },
  methods: {
    closeSequenceDropdown() {
      this.showSequenceDropdown = false;
    },
    showDeleteFrPopup() {
      this.isShowDeleteFrPopup = true;
    },
    showAddtoGrPopup() {
      this.isShowAddtoGrPopup = true;
    },
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "groupfriend") {
        typingTimer = setTimeout(this.updateGroupFriend(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateGroupFriend(group) {
      const objSender = {
        gr_id: group._id,
        name: group.name
      };
      this.$store.dispatch("updateGroup", objSender);
    },
    updateSearch() {
      this.$emit("updateSearch", this.search);
    }
  },
  components: {
    DeleteFriendsPopup,
    AddtoGroupPopup,
    AppTooltip,
  }
};
