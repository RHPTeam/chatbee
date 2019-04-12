<template>
  <div class="px_5 py_5 custom">
    <full-calendar></full-calendar>
  </div>
</template>

<script>
import FullCalendar from "@/components/rfullcalendar";
export default {
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

