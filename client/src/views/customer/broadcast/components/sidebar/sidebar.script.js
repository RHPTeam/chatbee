import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

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
    },
    async showSchedule(scheduleId) {
      this.$router.push({
        name: "f_broadcast_schedule",
        params: { scheduleId: scheduleId }
      });
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      const objSender = {
        broadId: result[0]._id,
        blockId: scheduleId
      };
      this.$store.dispatch("getSchedule", objSender);
    }
  }
};
