import DeleteFriendsPopup from "../../../popup/delete-popup/delete-popup";
import AddtoGroupPopup from "../../../popup/addto-group-popup/addto-group-popup";
import AppTooltip from "./tooltip"
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