import PronounPopup from "../../../popup/pronoun-popup/pronoun-popup";
export default {
  props: ["groupSelected"],
  data() {
    return {
      selectedArr: [],
      isShowPronounPopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    selectAll: {
      get() {
        if (this.groupSelected == false) {
          return this.users
            ? this.selectedUIDs.length === this.users.length
            : false;
        } else {
          return this.usersOfGroup
            ? this.selectedUIDs.length === this.usersOfGroup.length
            : false;
        }
      },
      set(value) {
        let selected = [];
        console.log("value");
        if (this.groupSelected == false) {
          if (value) {
            this.users.forEach(function(user) {
              selected.push(user._id);
            });
          }
        } else {
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
    selectedUIDs: {
      get() {
        return this.$store.getters.selectedUIDs;
      },
      set(value) {
        this.$store.dispatch("selectedUIDs", value);
      }
    }
  },
  methods: {
    showGender(gender) {
      if (gender == "male_singular") {
        return "Nam";
      } else {
        if (gender == "female_singular") {
          return "Nữ";
        } else {
          return "Chưa xác định";
        }
      }
    },
    showPronounPopup() {
      this.isShowPronounPopup = true;
    }
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
    await this.$store.dispatch("selectedUIDs", []);
  },
  components: {
    PronounPopup
  }
};
