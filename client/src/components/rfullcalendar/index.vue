<template>
  <div id="rcalender" class="rc rc--ltr rc--unthemed">
    <div class="rc--toolbar rc--header-toolbar">
      <!-- Start: Month View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'month'">
        <button class="rc--btn-prev" @click="getActiveMonth(-1)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">{{ monthName[activeTime.getMonth()] + ', ' + activeTime.getFullYear() }}</div>
        <button class="rc--btn-next" @click="getActiveMonth(1)">
           <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Month View Toolbar -->

      <!-- Start: Week View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'week'">
        <button class="rc--btn-prev" @click="getActiveMonth(-1)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">{{ monthName[activeTime.getMonth()] + ', ' + activeTime.getFullYear() }}</div>
        <button class="rc--btn-next" @click="getActiveMonth(1)">
           <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Week View Toolbar -->
    </div>
    <div class="rc--view-container">
      <rc-month-view
        v-if="view === 'month'" 
        :days="days"
      />
      <rc-week-view
        v-if="view === 'week'" 
        :days="days"
        :timePoint="timePoint"
      />
    </div>
  </div>
</template>

<script>
import RcMonthView from "./components/month-view/index"
import RcWeekView from "./components/week-view/index"

export default {
  props: {
    view: {
      type: String,
      default: 'month'
    }
  },
  data() {
    return {
      activeTime: new Date(),
      timePoint: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30",
                  "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
                  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
      ],
      dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthName: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
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
        const now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
    getActiveMonth(flag){
      this.activeTime.setMonth(this.activeTime.getMonth() + flag, 1);
      this.activeTime = new Date(this.activeTime);
    }
  },
  components: {
    RcMonthView,
    RcWeekView
 }
};
</script>

<style lang="scss">
@import "./style"
</style>
