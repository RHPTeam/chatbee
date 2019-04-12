<template>
  <div id="rcalender" class="rc rc--ltr rc--unthemed">
    <div class="rc--toolbar rc--header-toolbar">
      <div class="rc--toolbar-action">
        <button class="rc--btn-prev">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">Tháng 04, 2019</div>
        <button class="rc--btn-next">
           <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
    </div>
    <div class="rc--view-container">
      <rc-month-view 
        :days="days"
      />
    </div>
  </div>
</template>

<script>
import RcMonthView from "./components/month-view/index"

export default {
  data() {
    return {
      monthName: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      activeTime: new Date(),
    }
  },
  computed: {
    days() {
      let arr = [];
      let time = new Date(this.activeTime);
      time.setMonth(time.getMonth(), 1); // set the first day of this month
      let firstDayOfThisMonth = time.getDay();
      firstDayOfThisMonth === 0 && (firstDayOfThisMonth = 7);

      time.setDate(0); // set the last day of prev month
      let lastDayOfPrevMonth = time.getDate();
      for (let i = firstDayOfThisMonth; i > 0; i--) {
        arr.push({
          text: lastDayOfPrevMonth - i + 1,
          time: new Date(
            time.getFullYear(),
            time.getMonth(),
            lastDayOfPrevMonth - i + 1
          ),
          status: "rc--past"
        });
      }

      time.setMonth(time.getMonth() + 2, 0); // set the last day of this month
      let lastDayOfThisMonth = time.getDate(); // get the last day of this month
      time.setDate(1); // fix bug when month change
      for (let i = 0; i < lastDayOfThisMonth; i++) {
        let today = new Date(this.activeTime.getFullYear(), this.activeTime.getMonth(), this.activeTime.getDate());
        let tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
        let status = "";
        if (today.toDateString() === tmpTime.toDateString()) status = "rc--today"
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
          status: "rc--future"
        });
        j++;
      }
      return arr;
    },
  },
  methods: {
  },
  components: {
    RcMonthView,
 }
};
</script>

<style lang="scss">
@import "./style"
</style>
