import IconBase from "@/components/icons/IconBase";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconChat from "@/components/icons/IconChat";

export default {
  components: {
    IconBase,
    IconArrowDown,
    IconChat
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Yến Đặng",
          updatedDate: "1 giờ trước",
          createdDate: "20/02/2019",
          source: "Checkbox Plugin",
          attributes: 8,
          status: "reachable"
        },
        {
          id: 2,
          name: "Hoàng Nam",
          updatedDate: "1 tháng trước",
          createdDate: "26/02/2019",
          source: "Customer Chat Plugin",
          attributes: 10,
          status: "reachable"
        },
        {
          id: 3,
          name: "Lê Thảo",
          updatedDate: "1 ngày trước",
          createdDate: "06/03/2019",
          source: "Customer Chat Plugin",
          attributes: 7,
          status: "reachable"
        }
      ],
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
          ? this.selectedArr.length == this.users.length
          : false;
      },
      set: function(value) {
        var selected = [];

        if (value) {
          this.users.forEach(function(user) {
            selected.push(user.id);
          });
        }

        this.selectedArr = selected;
      }
    }
  }
};
