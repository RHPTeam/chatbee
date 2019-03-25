
export default {
  data() {
    return {
      listScriptClose: []
    };
  },
  async created() {
    await this.$store.dispatch("getSchedules");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    schedules() {
      return this.$store.getters.schedules;
    }
  },
  methods: {
    addSchedule() {
      this.$store.dispatch("createSchedule");
    }
  }
};
