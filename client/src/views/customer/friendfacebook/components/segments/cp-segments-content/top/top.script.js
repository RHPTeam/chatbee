import DeleteFriendsPopup from "../../../popup/delete-popup/delete-popup";
import AddtoGroupPopup from "../../../popup/addto-group-popup/addto-group-popup";
import AppTooltip from "./tooltip";
let typingTimer;
export default {
  props: ["groupSelected", "accountSelected"],
  data() {
    return {
      showSequenceDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
      statusNumberDisplayedDropdown: false,
      keySearch: ""
    };
  },
  async created() {
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
    closeNumberDisplayedDropdown() {
      this.statusNumberDisplayedDropdown = false;
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
    updateAccountSelected(id, name) {
      const objSender = {
        id: id,
        name: name
      };
      this.$emit("updateAccountSelected", objSender);
    },
    updateGroupFriend(group) {
      const objSender = {
        gr_id: group._id,
        name: group.name
      };
      this.$store.dispatch("updateGroup", objSender);
    },
    updateSearch() {
      this.$emit("updateSearch", this.keySearch);
    }
  },
  watch: {
    keySearch(value){
      const dataSender = {
        name: value,
        size: 20
      }
      this.$store.dispatch("searchFriendsByName", dataSender);
    }
  },
  components: {
    DeleteFriendsPopup,
    AddtoGroupPopup,
    AppTooltip
  }
};
