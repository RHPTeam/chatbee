<template>
  <div id="rcalender" class="rc rc--ltr rc--unthemed">
    <div class="rc--toolbar rc--header-toolbar">
      <!-- Start: Month View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'month'">
        <button class="rc--btn-prev" @click="getActiveMonth(-1)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">{{ monthName[activeMonth.getMonth()] + ', ' + activeMonth.getFullYear() }}</div>
        <button class="rc--btn-next" @click="getActiveMonth(1)">
           <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Month View Toolbar -->

      <!-- Start: Week View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'week'">
        <button class="rc--btn-prev" @click="getActiveWeek(-7)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">{{ activeWeekInfo }}</div>
        <button class="rc--btn-next" @click="getActiveWeek(7)">
           <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Week View Toolbar -->

      <!-- Start: Day View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'day'">
        <button class="rc--btn-prev" @click="getActiveDay(-1)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">
          {{ String(activeDay.getDate()).padStart(2, "0") + ' ' +
              monthName[activeDay.getMonth()] + ', ' + activeDay.getFullYear() 
          }}
        </div>
        <button class="rc--btn-next" @click="getActiveDay(1)">
           <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Day View Toolbar -->
    </div>
    <div class="rc--view-container">
      <rc-day-grid-month-view
        v-if="view === 'month'" 
        :monthDays="monthDays"
      />
      <rc-time-grid-view
        v-if="view === 'week' || view === 'day'"
        :activeDay="activeDay"
        :dayFullName="dayFullName"
        :timePoint="timePoint"
        :view="view"
        :weekDays="weekDays"
      />
    </div>
  </div>
</template>

<script>
import RcDayGridMonthView from "./components/day-grid-month-view/index"
import RcTimeGridView from "./components/time-grid-view/index"

export default {
  props: {
    view: {
      type: String,
      default: 'month'
    }
  },
  data() {
    return {
      activeDay: new Date(),
      activeMonth: new Date(),
      activeWeek: new Date(),
      timePoint: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30",
                  "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
                  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
      ],
      dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dayFullName: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
      monthName: ["Tháng 01", "Tháng 02", "Tháng 03", "Tháng 04", "Tháng 05", "Tháng 06", 
                  "Tháng 07", "Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"],
    }
  },
  computed: {
    activeWeekInfo() {
      let firstDay = new Date(this.weekDays[0].time);
      let lastDay = new Date(this.weekDays[6].time);
      if (firstDay.getFullYear() === lastDay.getFullYear()) {
        return  String(firstDay.getDate()).padStart(2, "0") + '/' +
                String(firstDay.getMonth() + 1).padStart(2, "0") + ' - ' +
                String(lastDay.getDate()).padStart(2, "0") + '/' +
                String(lastDay.getMonth() + 1).padStart(2, "0") + ', ' +
                firstDay.getFullYear();
      }
      else {
        return  String(firstDay.getDate()).padStart(2, "0") + '/' +
                String(firstDay.getMonth() + 1).padStart(2, "0") + '/' +
                firstDay.getFullYear() + ' - ' +
                String(lastDay.getDate()).padStart(2, "0") + '/' +
                String(lastDay.getMonth() + 1).padStart(2, "0") + '/' +
                lastDay.getFullYear();
      }
    },
    monthDays() { // set days in active month
      let arr = [];
      let time = new Date(this.activeMonth);
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
        let tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
        let status = "";
        if (this.isToday(tmpTime)) status = "rc--today"
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
    weekDays() { //set days in active week
      let arr = [];
      let time = new Date(this.activeWeek);// get active week
      let first = time.getDate() - time.getDay(); // First day is the day of the month - the day of the week
      let firstday = new Date(time.setDate(first)); // Set first day
      
      for (let i = 0; i < 7; i++) {
        let dayNum;
        let status = '';
        if (i === 0) {
          dayNum = firstday.getDate();
        }
        else {
          dayNum = new Date(arr[i-1].time).getDate() + 1;
        }
        let day = new Date(firstday.setDate(dayNum));
        let text = this.dayName[day.getDay()] + ' ' + 
                    String(day.getDate()).padStart(2, "0") + '/' + 
                    String((day.getMonth() + 1)).padStart(2, "0");
        if (this.isToday(day)) status = "rc--today"
        arr.push({
          text: text,
          time: day,
          status: status
        });
      }
      return arr;
    }
  },
  methods: {
    isToday(day) {
      const now = new Date(); // now date time
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // now date at 00:00:00
      if (day.toDateString() === today.toDateString()) {
        return true;
      }
      else return false;
    },
    getActiveDay(flag){
      this.activeDay.setDate(this.activeDay.getDate() + flag);
      this.activeDay = new Date(this.activeDay);
    },
    getActiveMonth(flag){
      this.activeMonth.setMonth(this.activeMonth.getMonth() + flag, 1);
      this.activeMonth = new Date(this.activeMonth);
    },
    getActiveWeek(flag){
      this.activeWeek.setDate(this.activeWeek.getDate() + flag);
      this.activeWeek = new Date(this.activeWeek);
    }
  },
  components: {
    RcDayGridMonthView,
    RcTimeGridView
 }
};
</script>

<style lang="scss">
@import "./style"
</style>
