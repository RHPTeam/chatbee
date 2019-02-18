import AppLoginVideo from "@/components/customer/login-video";
import IconBase from "@/components/icons/IconBase";
import IconLogo from "@/components/icons/IconLogo";
import IconEnvelope from "@/components/icons/IconEnvelope";
import IconLock from "@/components/icons/IconLock";
import IconUser from "@/components/icons/IconUser";
import IconPhone from "@/components/icons/IconPhone";
import IconLockCheck from "@/components/icons/IconLockCheck";
export default {
  data() {
    return {
      confirmPassword: "",
      user: {
        name: "",
        email: "",
        password: "",
        phone: ""
      }
    };
  },
  components: {
    AppLoginVideo,
    IconBase,
    IconLogo,
    IconEnvelope,
    IconLock,
    IconUser,
    IconPhone,
    IconLockCheck
  },
  methods: {
    async submit() {
      await this.$store.dispatch("signUp", this.user);
      this.$router.push("/");
    }
  }
};
