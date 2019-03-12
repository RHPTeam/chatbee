import AppLoginVideo from "@/components/customer/login-video";
import IconBase from "@/components/icons/IconBase";
import IconLogo from "@/components/icons/IconLogo";
import IconEnvelope from "@/components/icons/IconEnvelope";
import IconLock from "@/components/icons/IconLock";
import AppAlert from "@/components/shared/alert";

import CookieFunction from "@/utils/cookie.util";
import SecureFunction from "@/utils/secure.util";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      statusFinishForm: false,
      errorText: {
        email: "",
        password: ""
      },
      statusClassError: {
        email: false,
        password: false
      },
      statusClassPassed: {
        email: false,
        password: false
      }
    };
  },

  methods: {
    async signIn() {
      await this.$store.dispatch("signIn", this.user);
      if (
        parseInt(
          SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
        ) === 0
      ) {
        this.$router.push("/");
      } else if (
        parseInt(
          SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
        ) === 1 ||
        parseInt(
          SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
        ) === 2
      ) {
        this.$router.push("/admin");
      }
    }
  },
  watch: {
    "user.email"(value) {
      const regexEmail = new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );
      this.errorText.email = "Email không khả dụng cho định dạng!";
      this.statusClassError.email = true;
      this.statusClassPassed.email = false;
      if (regexEmail.test(value.toLowerCase())) {
        this.errorText.email = "";
        this.statusClassError.email = false;
        this.statusClassPassed.email = true;
      } else if (value.length === 0) {
        this.errorText.email = "";
        this.statusClassError.email = false;
        this.statusClassPassed.email = false;
      }
    },
    "user.password"(value) {
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
    }
  },
  components: {
    AppLoginVideo,
    IconBase,
    IconLogo,
    IconEnvelope,
    IconLock,
    AppAlert
  }
};
