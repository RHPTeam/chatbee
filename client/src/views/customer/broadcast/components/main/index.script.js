import DatePicker from "@/components/shared/datepicker_library";
import OptionTimes from "./option_time_broadcast";
import AddElement from "./add_element";
import PopupDelete from "@/components/popupDelete/popup_delete";

import AppHeader from "./components/header";
import AppDesc from "./components/desc";
import AppBody from "./components/body";
import AppFooter from "./components/footer";

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
    DatePicker,
    OptionTimes,
    AddElement,
    PopupDelete,
    AppHeader,
    AppDesc,
    AppBody,
    AppFooter
  }
};
