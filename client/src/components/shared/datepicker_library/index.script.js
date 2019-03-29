import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
export default {
  props: {
    readonly: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    value: { type: String, default: "" },
    format: { type: String, default: "YYYY-MM-DD" },
    name: { type: String, default: "" },
    inputStyle: [Object, Array],
    inputClass: [Object, Array],
    placeholder: String
  },
  data() {
    return {
      show: false,
      days: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      date: [],
      now: new Date(),
      pickedValue: ""
    };
  },
  watch: {
    now() {
      this.update();
    },
    show() {
      this.update();
    }
  },
  methods: {
    close() {
      if (this.autofocus == false) {
        this.show = false;
      }
    },
    update() {
      let arr = [];
      let time = new Date(this.now);
      time.setMonth(time.getMonth(), 1); // the first day
      let curFirstDay = time.getDay();
      curFirstDay === 0 && (curFirstDay = 7);
      time.setDate(0); // the last day
      let lastDayCount = time.getDate();
      for (let i = curFirstDay; i > 0; i--) {
        arr.push({
          text: lastDayCount - i + 1,
          time: new Date(
            time.getFullYear(),
            time.getMonth(),
            lastDayCount - i + 1
          ),
          status: "date-pass"
        });
      }
      time.setMonth(time.getMonth() + 2, 0); // the last day of this month
      let curDayCount = time.getDate();
      time.setDate(1); // fix bug when month change
      let value = this.pickedValue || this.stringify(new Date());
      for (let i = 0; i < curDayCount; i++) {
        let tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
        let status = "";
        this.stringify(tmpTime) === value && (status = "date-active");
        arr.push({
          text: i + 1,
          time: tmpTime,
          status: status
        });
      }
      let j = 1;
      while (arr.length < 42) {
        arr.push({
          text: j,
          time: new Date(time.getFullYear(), time.getMonth() + 1, j),
          status: "date-future"
        });
        j++;
      }
      this.date = arr;
    },
    yearClick(flag) {
      this.now.setFullYear(this.now.getFullYear() + flag);
      this.now = new Date(this.now);
    },
    monthClick(flag) {
      this.now.setMonth(this.now.getMonth() + flag, 1);
      this.now = new Date(this.now);
    },
    async getSchedules() {
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      return result[0];
    },
    async pickDate(index) {
      if (this.autofocus == false) {
        this.show = false;
      }
      this.now = new Date(this.date[index].time);
      this.pickedValue = this.stringify();
      this.$emit("input", this.pickedValue);
      const schedules = await this.getSchedules();
      const objSender = {
        bcId: schedules._id,
        blockId: this.$store.getters.schedule._id,
        value: this.$store.getters.schedule.timeSetting.dateMonth
      };
      this.$store.dispatch("updateDateSchedule", objSender);
    },
    parse(str) {
      var time = new Date(str);
      return isNaN(time.getTime()) ? null : time;
    },
    stringify(time = this.now, format = this.format) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var monthName = this.months[time.getMonth()];
      var map = {
        YYYY: year,
        MMM: monthName,
        MM: ("0" + month).slice(-2),
        M: month,
        DD: ("0" + date).slice(-2),
        D: date
      };
      return format.replace(/Y+|M+|D+/g, function(str) {
        return map[str];
      });
    },
    leave(e) {
      if (!this.$el.contains(e.target)) {
        this.close();
      }
    }
  },
  mounted() {
    this.pickedValue = this.value;
    this.$nextTick(() => {
      this.now = this.parse(this.pickedValue) || new Date();
      document.addEventListener("click", this.leave, false);
    });

    if (this.autofocus === true) {
      this.show = true;
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.leave, false);
  }
};
