import ConvertUnicode from "@/utils/string.util";
export default {
  props: {
    bcId: String,
    blockId: String
  },
  data() {
    return {
      showFilterAttribute: false,
      showFilterOption: false,
      listAttr: [{ key: 1, value: "Thuộc tính" }, { key: 1, value: "Nhóm" }],
      listCondition: [
        { key: 1, value: "là" },
        { key: 1, value: "không phải là" }
      ],
      getAttribute: "Thuộc tính",
      getCondition: "là",
      control: true,
      showResultListFilter: false,
      showValueListFilter: false,
      resultFilter: "",
      valueFilter: ""
    };
  },
  async created() {
    await this.$store.dispatch("listFilterAttribute");
    // this.$emit("openDone", true);
  },
  methods: {
    closeFilterAttribute() {
      this.showFilterAttribute = false;
    },
    closeFilterOption() {
      this.showFilterOption = false;
    },
    closeResultListFilter() {
      this.showResultListFilter = false;
    },
    closeValueListFilter() {
      this.showValueListFilter = false;
    },
    showResultFilterDefault() {
      this.showResultListFilter = true;
    },
    showListAttribute(value) {
      this.getAttribute = value;
      if (
        ConvertUnicode.convertUnicode(value.toString().toLowerCase()) === "nhom"
      ) {
        this.$store.dispatch("listFilterGroup");
        this.control = false;
        this.valueFilter = "";
        this.resultFilter = "";
        this.$emit("showSegment", true);
      } else {
        this.$store.dispatch("listFilterAttribute");
        this.control = true;
        this.valueFilter = "";
        this.resultFilter = "";
        this.$emit("showAttribute", true);
      }
    },
    showInfoGroupFriend(item) {
      this.resultFilter = item.name;
      if (item.value === undefined) {
        // dispatch show group friend when choose option segments
        const dataSender = {
          itemId: item._id,
          bcId: this.bcId,
          blockId: this.blockId
        };
        this.$store.dispatch("getInfoGroupFriend", dataSender);
      } else {
        // dispatch show friend when choose option attribute
        const dataSender = {
          item: item,
          bcId: this.bcId,
          blockId: this.blockId
        };
        this.$store.dispatch("getInfoFriendWithNameAttribute", dataSender);
        this.$emit("default", true);
      }
    },
    showInfoFriendAttribute(list) {
      this.valueFilter = list.value;
      if (this.resultFilter !== list.name) {
        // check attribute name, if different use condition is not.
        const dataSender = {
          name: this.resultFilter,
          item: list,
          bcId: this.bcId,
          blockId: this.blockId
        };
        this.$store.dispatch("getInfoFriendWithConditionIsNot", dataSender);
      } else {
        // check attribute name, if the same use condition is.
        const dataSender = {
          name: this.resultFilter,
          item: list,
          bcId: this.bcId,
          blockId: this.blockId
        };
        this.$store.dispatch("getInfoFriendWithConditionIs", dataSender);
      }
    },
    showOptionFilterAttr() {
      this.showFilterAttribute = true;
      this.$emit("openDone", true);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    listFilter() {
      return this.$store.getters.listFilter;
    }
  }
};
