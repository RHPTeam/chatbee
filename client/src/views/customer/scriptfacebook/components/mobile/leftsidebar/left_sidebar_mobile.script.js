
import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import AppPopupMainScript from "../mainscript/main_script-mobile";
import AppPopupDelete from "../popup/popup_delete";
import AppPopupMoveDelete from "../popup/popup_move_delete";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
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
      list_type_script: [
        {
          id: 1,
          title: "Nhóm kịch bản 1",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
            { name: "Mua lê" },
            { name: "Mua dưa" },
            { name: "Mua nho" },
            { name: "Mua quýt" }
          ]
        },
        {
          id: 2,
          title: "Nhóm kịch bản 2",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
            { name: "Mua nho" },
            { name: "Mua quýt" }
          ]
        },
        {
          id: 3,
          title: "Nhóm kịch bản 3",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
            { name: "Mua lê" },
            { name: "Mua dưa" },
            { name: "Mua quýt" }
          ]
        },
        {
          id: 4,
          title: "Nhóm kịch bản 4",
          list_script: [
            { name: "Mua táo" },
            { name: "Mua cam" },
            { name: "Mua lê" },
            { name: "Mua dưa" },
            { name: "Mua nho" },
            { name: "Mua quýt" }
          ]
        }
      ],
      listScriptClose: [],
      ishowPopupMainScript: false,
      ishowPopupDelele: false,
      ishowPopupMoveDelele: false
    };
  },
  methods: {
    //Function Hide/Show Type Script
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
