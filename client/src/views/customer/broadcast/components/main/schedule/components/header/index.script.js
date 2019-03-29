export default {
  data() {
    return {
      isDeletePopup: false
    };
  },
  methods: {
    async deleteSchedule(scheduleId) {
      this.$router.push({ name: "f_broadcast" });
      await this.$store.dispatch("deleteSchedule", scheduleId);
    }
  }
};
