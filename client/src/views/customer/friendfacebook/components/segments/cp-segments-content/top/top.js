import DeleteFriendsPopup from "../../../popup/delete-popup/delete-popup";
import AddtoGroupPopup from "../../../popup/addto-group-popup/addto-group-popup";
export default {
  props: ["groupSelected"],
  components: {
    DeleteFriendsPopup,
    AddtoGroupPopup,
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupInfo() {
      return this.$store.getters.groupInfo;
    },
    users() {
      return this.$store.getters.allFriends;
    },
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    }
  },
  data() {
    return {
      showSequenceDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
    };
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
    }
  }
};