import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";

export default {
  props: ["groupBlock"],
  components: { IconBase, IconSortDown, IconPlus },
  data() {
    return {
      listScriptClose: [],
      isShowGroup: true,
      currentSelectIndex: null,
      currentIndex: null
    };
  },
  methods: {
    showDatePopup(index) {
      this.currentIndex = index;
    },
    showSelectPopup(index) {
      this.currentSelectIndex = index;
    },
    senDataBlock(block){
      this.$emit("dataBlock",block);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
