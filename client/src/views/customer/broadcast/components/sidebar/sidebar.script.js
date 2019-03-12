import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";

export default {
  components: { IconBase, IconSortDown, IconPlus },
  data() {
    return {
      list_type_script: [
        {
          id: 1,
          title: "Thêm mới",
          list_script: [{ name: "Mua táo" }, { name: "Mua cam" }]
        },
        {
          id: 2,
          title: "Nhóm đã cài đặt",
          list_script: [
            { name: "07 Thg3 13:00" },
            { name: "07 Thg3 13:00" },
            { name: "07 Thg3 13:00" }
          ]
        }
      ],
      listScriptClose: []
    };
  },
  methods: {
    hideGroup(index) {
      if (this.list_type_script[index].list_script.length > 0) {
        this.list_type_script[index].list_script.map(item => {
          this.listScriptClose.push();
        });
        this.list_type_script[index].list_script.splice(
          0,
          this.list_type_script[index].list_script.length
        );
        console.log(this.listScriptClose);
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
