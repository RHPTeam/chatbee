<template>
  <div class="px_5 py_5 custom">
    <div class="btn--group text_right pb_3">
      <button class="btn btn_success" @click="calendarView = 'month'">Tháng</button>
      <button class="btn btn_success" @click="calendarView = 'week'">Tuần</button>
      <button class="btn btn_success" @click="calendarView = 'month'">Ngày</button>
      <button class="btn btn_success" @click="calendarView = 'month'">Danh sách</button>
    </div>
    <full-calendar
      :view = "calendarView"
    />
  </div>
</template>

<script>
import FullCalendar from "@/components/rfullcalendar";
export default {
  data() {
    return {
      calendarView: 'month',
    }
  },
  components: { 
    FullCalendar 
  }
};
</script>

<style>
  .custom {
    background-color: #f7f7f7;
  }
</style>

