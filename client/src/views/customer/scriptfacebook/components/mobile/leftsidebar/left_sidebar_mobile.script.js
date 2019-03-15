import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import AppPopupMainScript from "../mainscript/main_script-mobile";
import AppPopupDelete from "../popup/popup_delete";
import AppPopupMoveDelete from "../popup/popup_move_delete";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  props:["groupBlock"],
  components: {
    IconBase,
    IconSortDown,
    IconPlus,
    IconRemove,
    AppPopupMainScript,
    AppPopupDelete,
    AppPopupMoveDelete,
    VuePerfectScrollbar
  },
  data() {
    return {
      listScriptClose: [],
      ishowPopupMainScript: false,
      ishowPopupDelele: false,
      ishowPopupMoveDelele: false,
      isShowGroup: true,
      currentSelectIndex: null,
      currentIndex: null
    };
  },
  methods: {
    //Function Hide/Show Type Script
    showDatePopup(index) {
      this.currentIndex = index;
    },
    showSelectPopup(index) {
      this.currentSelectIndex = index;
    },
    showBlock(id) {
      this.$store.dispatch("getBlock", id);
    },
    createBlock(groupId) {
      this.$store.dispatch("createBlock", groupId);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
