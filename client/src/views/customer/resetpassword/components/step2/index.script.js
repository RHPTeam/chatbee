import IconBase from "@/components/icons/IconBase";
import IconSecurity from "@/components/icons/IconSecurity";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      code: "",
      errorText: "",
      statusClassError: false,
      statusClassPassed: false
    };
  },
  components: {
    IconBase,
    IconSecurity
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async sendCode() {
      await this.$store.dispatch("checkCode", this.code);
      this.$router.push({ name: "step3" });
    }
  },
  watch: {
    code(value) {
      this.errorText = "Code gửi đến cho bạn gồm 6 ký tự";
      this.statusClassError = true;
      this.statusClassPassed = false;
      if (value.length === 6) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = true;
      } else if (value.length === 0) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = false;
      }
    }
  }
};
