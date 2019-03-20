export default {
  props: ["groupSelected"],
  data() {
    return {
      selectedArr: [],
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    selectAll: {
      get: function() {
        if(this.groupSelected == false) {
          return this.users
          ? this.selectedArr.length === this.users.length
          : false;
        }
        else {
          return this.usersOfGroup
          ? this.selectedArr.length === this.usersOfGroup.length
          : false;
        }
      },
      set: function(value) {
        let selected = [];
        console.log('value');
        if(this.groupSelected == false) {
          if (value) {
            this.users.forEach(function(user) {
              selected.push(user._id);
            });
          }
        }
        else {
          if (value) {
            this.usersOfGroup.forEach(function(user) {
              selected.push(user._id);
            });
          }
        }

        this.selectedArr = selected;
        this.$store.dispatch("selectedUIDs", this.selectedArr);
      }
    },
    users() {
      return this.$store.getters.allFriends;
    },
    usersOfGroup() {
      return this.$store.getters.groupInfo._friends;
    },
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    },
  },
  filters: {
    covertDateUpdatedAt(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = minutes + "0";
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    }
  },
  async created() {
    await this.$store.dispatch("getAllFriends");
  }
};
