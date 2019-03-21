

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
    closeAddPopup() {
      this.$emit("ishowAddPopup", false);
      console.log('13432');
    },
    openSetAttr() {
      console.log("Hello ngao!");
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppAttr
  }
};
