import IconRemove from "@/components/icons/IconRemove";
import IconBase from "@/components/icons/IconBase";
import IconCopy from "@/components/icons/IconCopy";
import IconLink from "@/components/icons/IconLink";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconSandClock from "@/components/icons/IconSandClock";
import IconTag from "@/components/icons/IconTag";

export default {
  data() {
    return {
      textValue: "",
      textList: []
    };
  },
  methods: {
    addText() {
      this.textList.push({ textValue: "" });
    },
    removeText(index){
      this.textList.pop(index)
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
    IconSandClock,
    IconTag
  }
};