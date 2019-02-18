import AppLoginVideo from "@/components/customer/login-video";
import IconBase from "@/components/icons/IconBase";
import IconLogo from "@/components/icons/IconLogo";
import IconEnvelope from "@/components/icons/IconEnvelope";
import IconLock from "@/components/icons/IconLock";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    AppLoginVideo,
    IconBase,
    IconLogo,
    IconEnvelope,
    IconLock
  },
  methods: {
    async signIn() {
      await this.$store.dispatch("signIn", this.user);
      this.$router.push("/");
    }
  }
};
