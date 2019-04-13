import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  data() {
    return {
      listScriptClose: [],
      showTooltip: false
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
  },
  filters: {
    filteredName(value) {
      let date = value.dateMonth.split("-")[2];
      let dateMonth = `Ngày ${value.dateMonth.split("-")[2]} tháng ${
        value.dateMonth.split("-")[1]
      }`;
      // Set case for name
      if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "khong"
      ) {
        return `${dateMonth} ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "hang ngay"
      ) {
        return `Hằng ngày ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "cuoi tuan"
      ) {
        return `Cuối tuần ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "hang thang"
      ) {
        return `Mỗi ngày ${date} của tháng ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "ngay lam viec"
      ) {
        return `Ngày làm việc ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "tuy chinh"
      ) {
        if (value.repeat.valueRepeat.split(",").sort().toString() === "0,6") {
          return `Cuối tuần ${value.hour}`;
        } else if (value.repeat.valueRepeat.split(",").sort().toString() === "1,2,3,4,5") {
          return `Ngày làm việc ${value.hour}`;
        } else if (value.repeat.valueRepeat.split(",").sort().toString() === "0,1,2,3,4,5,6") {
          return `Hằng ngày ${value.hour}`;
        } else {
          let arrDate = value.repeat.valueRepeat.split(",");
          let arrOther = [];
          arrDate.sort().map(item => {
            switch (item) {
              case "0":
                return arrOther.push("CN");
              case "1":
                return arrOther.push("T2");
              case "2":
                return arrOther.push("T3");
              case "3":
                return arrOther.push("T4");
              case "4":
                return arrOther.push("T5");
              case "5":
                return arrOther.push("T6");
              case "6":
                return arrOther.push("T7");
            }
          });
          return `${arrOther.toString()} ${value.hour}`;
        }
      }
    }
  }
};
