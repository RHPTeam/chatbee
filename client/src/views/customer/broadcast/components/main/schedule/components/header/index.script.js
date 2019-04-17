import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  data() {
    return {
      isDeletePopup: false
    };
  },
  computed: {
    schedule() {
      return this.$store.getters.schedule;
    }
  },
  methods: {
    async deleteSchedule(scheduleId) {
      this.$router.push({ name: "f_broadcast" });
      await this.$store.dispatch("deleteSchedule", scheduleId);
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
    async changeStatusBroadcast() {
      const schedules = await this.getSchedules();
      const objectSender = {
        broadId: schedules._id,
        blockId: this.schedule._id
      };
      await this.$store.dispatch("changeStatusBroadcast", objectSender);
      if (this.schedule.status === true) {
        let schedule = this.schedule;
        let account = { accountId: schedules._account};
        const objSend = Object.assign({}, schedule, account);
        this.$socket.emit("activeCronBroadcast", objSend, function(callback) {
          console.log(callback);
        });
      } else {
        let schedule = this.schedule;
        let account = { accountId: schedules._account};
        const objSend = Object.assign({}, schedule, account);
        this.$socket.emit("removeCronBroadcast", objSend, function(callback) {
          console.log(callback);
        });
      }
    }
  }
};
