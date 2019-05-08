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
      if(Object.entries(this.schedule).length === 0 && this.schedule.constructor === Object) return;
      const results = this.schedule.timeSetting;
      let dateUpdated = new Date(results.dateMonth);
      dateUpdated.setHours(parseInt(results.hour.split(':')[0]));
      dateUpdated.setMinutes(parseInt(results.hour.split(':')[1]));
      return dateUpdated;
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

