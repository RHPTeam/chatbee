export default {
  props: ["popupData"],
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async redirectScript() {
      this.$router.push("/f-script");
      await this.$emit("closePopup", false);
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  }
};
