export default {
  data() {
    return {
      isDeletePopup: false
    };
  },
  methods: {
    async deleteSchedule(scheduleId) {
      await this.$store.dispatch("deleteSchedule", scheduleId);
      this.$router.push({ name: "f_broadcast" });
    }
  }
};
