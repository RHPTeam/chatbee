import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";

export default {
  props: ["groupBlock"],
  components: { IconBase, IconSortDown, IconPlus },
  data() {
    return {
      list_type_script: [
        {
          id: 1,
          title: "Nhóm kịch bản 1",
          type: "group",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
            { name: "Mua lê" },
          ]
        },
        {
          id: 2,
          title: "Nhóm kịch bản 2",
          type: "sequence",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
          ]
        },
      ],
      list_type_script_sequence: [
        {
          id: 1,
          title: "Nhóm kịch bản 1",
          type: "sequence",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
          ]
        }
      ],
      listScriptClose: [],
      isShowGroup: true,
      currentSelectIndex: null,
      currentIndex: null
    };
  },
  methods: {
    hideGroup(index) {
      // if (this.list_type_script[index].list_script.length > 0) {
      //   this.list_type_script[index].list_script.map(item => {
      //     this.listScriptClose.push();
      //   });
      //   this.list_type_script[index].list_script.splice(
      //     0,
      //     this.list_type_script[index].list_script.length
      //   );
      // }
    },
    showDatePopup(index) {
      this.currentIndex = index;
    },
    showSelectPopup(index) {
      this.currentSelectIndex = index;
    },
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
