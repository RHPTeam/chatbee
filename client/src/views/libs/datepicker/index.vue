<style>
.demo > * {
  margin-right: 10px;
}
</style>

<template>
  <div class="demo">
    <datepicker
      :readonly="true"
      format="YYYY-MM-DD"
      name="date1"
      placeholder="Select Date"
      v-model="date"
    ></datepicker>
    <datepicker
      value="YYYY-M-D"
      format="YYYY-M-D"
      name="date2"
      placeholder="Select Date"
    ></datepicker>
    <datepicker
      :readonly="true"
      format="MMM/D/YYYY"
      name="date3"
      placeholder="Select Date"
    ></datepicker>
    <p>{{ date }}</p>
  </div>
</template>

<script>
import datepicker from "@/components/shared/datepicker";

export default {
  data() {
    return {
      date: ""
    };
  },
  components: {
    datepicker
  }
};
</script>
