import PronounPopup from "../../../popup/pronoun-popup/pronoun-popup";
import ConvertUnicode from "@/utils/string.util.js";

export default {
  props: ["groupSelected"],
  data() {
    return {
      selectedArr: [],
      isShowPronounPopup: false,
      userID: "",
      isSort: [
        {
          name: "fullName",
          asc: false,
          desc: false
        },
        {
          name: "gender",
          asc: false,
          desc: false
        },
        {
          name: "vocate",
          asc: false,
          desc: false
        },
        {
          name: "updated_at",
          asc: false,
          desc: false
        },
        {
          name: "attribute",
          asc: false,
          desc: false
        },
        {
          name: "status",
          asc: false,
          desc: false
        }
      ],
      currentPage: 1,
      totalCount: null,
      perPage: 20
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    selectAll: {
      get() {
        if (this.groupSelected === false) {
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
        if (this.groupSelected === false) {
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
    },
    totalPage() {
      const total = this.users.length;
      console.log(total);
      const totalPages =
        Math.floor(total / this.perPage) + (total % this.perPage > 0 ? 1 : 0);
      console.log(totalPages);
      return totalPages;
    }
  },
  methods: {
    showGender(gender) {
      if (gender === "male_singular") {
        return "Nam";
      } else {
        if (gender === "female_singular") {
          return "Nữ";
        } else {
          return "Chưa xác định";
        }
      }
    },
    showPronounPopup(uid) {
      this.isShowPronounPopup = true;
      this.userID = uid;
    },
    sortUsersByProperty(data, index) {
      const attr = data.name;
      // Sort Asecending
      if (data.asc === false) {
        if (this.groupSelected === false) {
          this.users.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
        } else {
          this.usersOfGroup.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
        }
        this.activeCurrentSort(index, "asc");
      } // Sort Descending
      else if (data.desc === false) {
        if (this.groupSelected === false) {
          this.users.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA > valB) {
              return -1;
            }
            if (valA < valB) {
              return 1;
            }
            return 0;
          });
        } else {
          this.usersOfGroup.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA > valB) {
              return -1;
            }
            if (valA < valB) {
              return 1;
            }
            return 0;
          });
        }
        this.activeCurrentSort(index, "desc");
      }
    },
    activeCurrentSort(i, type) {
      this.isSort.forEach((item, index) => {
        if (index === i) {
          if (type === "asc") {
            item.asc = true;
            item.desc = false;
          } else {
            item.asc = false;
            item.desc = true;
          }
        } else {
          item.asc = false;
          item.desc = false;
        }
      });
    },
    onPageChange(page) {
      this.currentPage = page;
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
    },
    upperCaseFirstLetter(str) {
      return str[0].toUpperCase() + str.slice(1);
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
