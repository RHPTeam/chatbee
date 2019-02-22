import Loading from "@/components/shared/loading";
import AppHeader from "@/components/dashboard/header";
import AppSidebar from "@/components/dashboard/sidebar";
import HeaderMobile from "@/components/layouts/mobile/header";
import FooterMobile from "@/components/layouts/mobile/footer";
export default {
  data() {
    return {
      timer: ""
    };
  },
  async created() {
    this.startUpdateTimer();
    await this.$store.dispatch("getUserInfo");
  },
  beforeDestroy() {
    this.stopUpdateTimer();
  },
  computed: {
    status() {
      return this.$store.getters.authStatus;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    setTimer() {
      this.timer = new Date(Date.now());
    },
    startUpdateTimer() {
      this.timer = setInterval(this.setTimer, 500);
    },
    stopUpdateTimer() {
      clearInterval(this.timer);
    }
  },
  watch: {
    timer(value) {
      if (!value) return;
      if (typeof value === "number") return;
      if (parseInt(value.getHours()) > 5 && parseInt(value.getHours()) < 18) {
        this.$store.dispatch("changeThemeName", "light");
      } else if (
        (parseInt(value.getHours()) >= 18 &&
          parseInt(value.getHours()) <= 23) ||
        (parseInt(value.getHours()) >= 0 && parseInt(value.getHours()) <= 5)
      ) {
        this.$store.dispatch("changeThemeName", "dark");
      }
    }
  },
  components: {
    Loading,
    AppHeader,
    AppSidebar,
    HeaderMobile,
    FooterMobile
  }
};