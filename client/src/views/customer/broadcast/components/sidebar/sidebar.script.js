import IconBase from "@/components/icons/IconBase";
import IconSortDown from "@/components/icons/IconSortDown";
import IconPlus from "@/components/icons/IconPlus";
import StringFunction from "@/utils/string.util";

export default {
  components: { IconBase, IconSortDown, IconPlus },
  data() {
    return {
      listScriptClose: []
    };
  },
  methods: {
    addSchedule() {
      this.$store.dispatch("createSchedule");
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    schedules() {
      const dataArr = this.$store.getters.broadcasts;
      return dataArr.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
    }
  },
  filters: {
    formatDate(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = "0" + minutes;
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    }
  },
  async created() {
    await this.$store.dispatch("getAllBroadcasts");
  }
};
