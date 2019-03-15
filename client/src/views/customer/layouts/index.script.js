import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Loading from "@/components/shared/loading";
import MobileLoading from "@/components/shared/mobile_loading";
import AppHeader from "@/components/layouts/header";
import AppSidebar from "@/components/layouts/sidebar";
import HeaderMobile from "@/components/layouts/mobile/header";
import SearchMobile from "@/components/layouts/mobile/search";
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
    VuePerfectScrollbar,
    Loading,
    MobileLoading,
    AppHeader,
    AppSidebar,
    HeaderMobile,
    SearchMobile,
    FooterMobile
  }
};
