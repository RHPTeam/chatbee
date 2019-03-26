import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: ["isShowAddtoGrPopup"],
  
  data() {
    return {
      selectedGroups: [],
      isShowCreateGroup: false,
      isShowBtnCreate: true,
      newGroup: '',
    };
  },

  computed: {
    groupFriend() {
      return this.$store.getters.groupFriend;
    },
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    }
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    showCreateGroupTrue() {
      this.isShowCreateGroup = true;
    },
    async showCreateGroup() {
      await this.showCreateGroupTrue();
      this.isShowBtnCreate = false;
      this.$refs.newGroup.focus();
    },
    cancelCreateGroup() {
      this.isShowCreateGroup = false;
      this.isShowBtnCreate = true;
    },
    async createGroup() {
      const name = this.newGroup;
      await this.$store.dispatch("createGroupByName", name);
      this.newGroup = '';
      const newGroupItem = this.groupFriend[this.groupFriend.length - 1];
      this.selectedGroups.push(newGroupItem._id);
      this.scrollToEnd();
    },
    addFriendsToGroup() {
      this.selectedGroups.forEach(gr_id => {
        const dataSender = {
          gr_id: gr_id,
          friends: this.selectedUIDs
        }
        this.$store.dispatch("addFriendsToGroup", dataSender);
      });
      this.$store.dispatch("selectedUIDs", []);
      this.$emit("closeAddPopup", false);
    },
    scrollToEnd() {    	
      var scroll = this.$el.querySelector("#groupListScroll");
      scroll.scrollTop = scroll.scrollHeight;
    },
  },

  async created() {
    await this.$store.dispatch("getGroupFriend");
  },

  components: {
    VuePerfectScrollbar
  }
};