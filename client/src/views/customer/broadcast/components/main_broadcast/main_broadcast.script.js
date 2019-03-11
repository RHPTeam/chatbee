import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
import IconCopy from "@/components/icons/IconCopy";
import IconLink from "@/components/icons/IconLink";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconPlus from "@/components/icons/IconPlus";
import IconCancel from "@/components/icons/IconCancel";
import IconSandClock from "@/components/icons/IconSandClock";
import IconTag from "@/components/icons/IconTag";
import IconMove from "@/components/icons/IconMove";
import IconUploadImage from "@/components/icons/IconUploadImage";
import IconDropDown from "@/components/icons/IconDropDown";
import IconPlayButton from "@/components/icons/IconPlaysButton";
import DatePicker from "@/components/shared/datepicker_library";
import OptionTimes from "./option_time_broadcast";
import AddElement from "./add_element";
import PopupDelete from "@/components/popupDelete/popup_delete";
export default {
  data() {
    return {
      showOptionAttribute: false,
      showOptionWith: false,
      showFilter: false,
      showModal: false
    };
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
    IconDropDown,
    IconPlayButton,
    DatePicker,
    OptionTimes,
    AddElement,
    PopupDelete
  }
};
