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
import PopupPlugins from "./cp_attribute/add_plugins_mobile";
import AddAttribute from "./cp_attribute/add_attribute_mobile";
import  AddValue from "./cp_attribute/add_value_mobile";

import BlockService from "@/services/modules/block.service";
export default {
  props: ["ishowPopupMainScript"],
  data() {
    return {
      textValue: "",
      textList: [],
      imageList: [],
      timerList: [],
      ishowAddPopup: false,
      showPopupPlugins: false,
      showAddAttribute: false,
      isShowAddAttribute: false,
      showModalAttribute: false,
      showModalValue: false
    };
  },
  methods: {
    addElm(type) {
      if (type === "text") {
        this.textList.push({ textValue: "" });
      } else if (type === "image") {
        this.imageList.push({ imageValue: "" });
      } else if (type === "timer") {
        this.timerList.push({ timerValue: "" });
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
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    block() {
      return this.$store.getters.block;
    },
    status() {
      return this.$store.getters.status;
    }
  },
  async created() {
    const blocks = await BlockService.index();
    const firstBlockId = blocks.data.data[0]._id;
    this.$store.dispatch("getBlock", firstBlockId);
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
    AddAttribute,
    PopupPlugins,
    AddValue
  }
};
