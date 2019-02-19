import IconBase from "@/components/icons/IconBase";
import IconEnvelop from "@/components/icons/IconEnvelop";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      email: "",
      errorText: "",
      statusClassError: false,
      statusClassPassed: false
    };
  },
  components: {
    IconBase,
    IconEnvelop
  },
  methods: {
    async sendMail() {
      await this.$store.dispatch("resetPassword", this.email);
      this.$router.push({ name: "step2" });
    }
  },
  watch: {
    email(value) {
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.errorText = "Email không khả dụng cho định dạng!";
      this.statusClassError = true;
      this.statusClassPassed = false;
      if (regexEmail.test(value.toLowerCase())) {
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
