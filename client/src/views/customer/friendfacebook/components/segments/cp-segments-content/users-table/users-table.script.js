import IconBase from "@/components/icons/IconBase";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconChat from "@/components/icons/IconChat";

export default {
  props: ["groupSelected"],
  components: {
    IconBase,
    IconArrowDown,
    IconChat
  },
  data() {
    return {
      selectedArr: []
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    selectAll: {
      get: function() {
        return this.users
          ? this.selectedArr.length === this.users.length
          : false;
      },
      set: function(value) {
        let selected = [];
        if (value) {
          this.users.forEach(function(user) {
            selected.push(user.id);
          });
        }
        this.selectedArr = selected;
      }
    },
    users() {
      return this.$store.getters.allFriends;
    },
    groupInfo() {
      return this.$store.getters.groupInfo;
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
