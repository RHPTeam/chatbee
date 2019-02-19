import IconBase from "@/components/icons/IconBase";
import IconPadlock from "@/components/icons/IconPadlock";
import IconCheckPadlock from "@/components/icons/IconCheckPadlock";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      reset: {
        password: "",
        confirmPassword: ""
      },
      errorText: {
        password: "",
        confirmPassword: ""
      },
      statusClassError: {
        password: false,
        confirmPassword: false
      },
      statusClassPassed: {
        password: false,
        confirmPassword: false
      }
    };
  },
  components: {
    IconBase,
    IconCheckPadlock,
    IconPadlock
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async sendPassword() {
      await this.$store.dispatch("newPassword", this.reset.password);
      this.$router.push("/signin");
    }
  },
  watch: {
    "reset.password"(value) {
      this.errorText.password = "Mật khẩu nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.password = true;
      this.statusClassPassed.password = false;
      if (value.length > 5 && value.length < 20) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = true;
      } else if (value.length === 0) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = false;
      }
    },
    "reset.confirmPassword"(value) {
      this.errorText.confirmPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmPassword = true;
      this.statusClassPassed.confirmPassword = false;
      if (value === this.reset.password) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = true;
      } else if (value.length === 0) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = false;
      }
    }
  }
};
