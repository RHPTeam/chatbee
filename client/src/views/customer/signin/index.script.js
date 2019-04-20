import AppLoginVideo from "@/components/customer/login-video";
import IconBase from "@/components/icons/IconBase";
import IconLogo from "@/components/icons/IconLogo";
import IconEnvelope from "@/components/icons/IconEnvelope";
import IconLock from "@/components/icons/IconLock";
import AppAlert from "@/components/shared/alert";

import CookieFunction from "@/utils/cookie.util";
import SecureFunction from "@/utils/secure.util";

import axios from 'axios';

export default {
  data() {
    return {
      infoIP: null,
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
      },
      srcDefaultLogin: require("@/assets/images/message/images-login.jpg")
    };
  },

  async created() {
    axios
      .get('http://ip-api.com/json')
      .then(response => {
        this.infoIP = response.data;
      })
      .catch(error => {
        this.infoIP = null;
      })
  },

  methods: {
    async signIn() {
      const dataSender = {
        email: this.user.email,
        password: this.user.password,
        ip: this.infoIP
      }
      console.log(dataSender);
      await this.$store.dispatch("signIn", dataSender);
      if (
        parseInt(
          SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
        ) === 0
      ) {
        if (
          this.$store.getters.authStatus === "401" ||
          this.$store.getters.authStatus === "405"
        )
          return;
        this.$router.go("/");
      } else if (
        parseInt(
          SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
        ) === 1 ||
        parseInt(
          SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
        ) === 2
      ) {
        this.$router.go("/admin");
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
