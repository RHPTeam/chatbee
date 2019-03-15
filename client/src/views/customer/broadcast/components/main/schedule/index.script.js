import DatePicker from "@/components/shared/datepicker_library";
import PopupDelete from "@/components/popupDelete/popup_delete";

import AppHeader from "../components/header";
import AppDesc from "../components/desc";
import AppBody from "../components/body";
import AppFooter from "../components/footer";

export default {
  data() {
    return {
      addText: false,
      addImages: false,
      listText: []
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    DatePicker,
    PopupDelete,
    AppHeader,
    AppDesc,
    AppBody,
    AppFooter
  }
};
