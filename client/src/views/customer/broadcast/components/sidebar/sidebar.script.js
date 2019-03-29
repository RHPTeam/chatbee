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
  },
  filters: {
    filteredName(value) {
      // Set case for name
      if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "khong"
      ) {
        return `${value.dateMonth} ${value.hour}`;
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
        return `Mỗi ${value.dateMonth} của tháng ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "ngay lam viec"
      ) {
        return `Ngày làm việc ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "tuy chinh"
      ) {
        if (value.repeat.valueRepeat === "0,6") {
          return `Cuối tuần ${value.hour}`;
        } else if (value.repeat.valueRepeat === "1,2,3,4,5") {
          return `Ngày làm việc ${value.hour}`;
        } else if (value.repeat.valueRepeat === "0,1,2,3,4,5,6") {
          return `Hằng ngày ${value.hour}`
        } else {
          let arrDate = value.repeat.valueRepeat.split(",");
          arrDate.map(item => {
            switch (item) {
              case 0:
                return (item = "CN");
              case 1:
                return (item = "T2");
              case 2:
                return (item = "T3");
              case 3:
                return (item = "T4");
              case 4:
                return (item = "T5");
              case 5:
                return (item = "T6");
              case 6:
                return (item = "T7");
            }
          });
          return `${arrDate.toString()} ${value.hour}`;
        }
      }
    }
  }
};
