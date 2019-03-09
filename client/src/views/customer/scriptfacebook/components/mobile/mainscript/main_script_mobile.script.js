import IconRemove from "@/components/icons/IconRemove";
import IconBase from "@/components/icons/IconBase";
import IconCopy from "@/components/icons/IconCopy";
import IconLink from "@/components/icons/IconLink";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconPlus from "@/components/icons/IconPlus";
import IconCancel from "@/components/icons/IconCancel";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconSandClock from "@/components/icons/IconSandClock";
import IconTag from "@/components/icons/IconTag";
import IconMove from "@/components/icons/IconMove";
import IconUploadImage from "@/components/icons/IconUploadImage";

import AppAttr from "./cp_attribute";

export default {
  props: ["ishowPopupMainScript"],
  data() {
    return {
      textValue: "",
      textList: [],
      imageList: [],
      timerList: [],
      ishowAddPopup: false
    };
  },
  methods: {
    addElm(type) {
      if (type === "text") {
        this.textList.push({textValue: ""});
      } else if (type === "image") {
        this.imageList.push({imageValue: ""});
      } else if (type === "timer") {
        this.timerList.push({timerValue: ""});
      }
    },
    removeText(index) {
      this.textList.pop(index);
    },
    close() {
      this.$emit("close", false);
    },
    closeAddPopup() {
      this.$emit("ishowAddPopup", false);
      console.log('13432');
    },
    openSetAttr() {
      console.log('13432');
      this.ishowAddPopup = true;
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconCopy,
    IconLink,
    IconRemove,
    IconImage,
    IconText,
    IconCancel,
    IconSandClock,
    IconTag,
    IconMove,
    IconUploadImage,
    IconPlus,
    IconArrowLeft,
    AppAttr
  }
};
