import AppHeader from "./components/header";
import AppDesc from "./components/desc";
import AppBody from "./components/body";

import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    schedule() {
      return this.$store.getters.schedule;
    },
    compareTimeSetting(){
      const results = this.schedule.timeSetting;
      // const dateNow = Date.now();
      const scheduleCron = results.dateMonth+' '+results.hour
      const dateUpdated = new Date(scheduleCron.replace(/-/g,'/'));
      return dateUpdated
    }
  },
  async created() {
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    const objSender = {
      broadId: result[0]._id,
      blockId: this.$route.params.scheduleId
    };
    this.$store.dispatch("getSchedule", objSender);
  },
  components: {
    AppHeader,
    AppDesc,
    AppBody
  }
};
