<template>
  <div class="main">
    <app-sortable
      :data="data"
      :currentSort="currentSort"
      :currentSortDir="currentSortDir"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :enablePagination="enablePagination"
      :enableSort="enableSort"
      @currentSort="currentSort = $event"
      @currentSortDir="currentSortDir = $event"
      @currentPage="currentPage = $event"
      @enablePagination="enablePagination = $event"
      @enableSort="enableSort = $event"
    />
    <div class="demo">
      <app-date-picker
        :readonly="true"
        format="YYYY-MM-DD"
        name="date1"
        placeholder="Select Date"
        v-model="date"
      ></app-date-picker>
      <app-date-picker
        value="YYYY-M-D"
        format="YYYY-M-D"
        name="date2"
        placeholder="Select Date"
      ></app-date-picker>
      <app-date-picker
        :readonly="true"
        format="MMM/D/YYYY"
        name="date3"
        placeholder="Select Date"
      ></app-date-picker>
      <p>{{ date }}</p>
    </div>
  </div>
</template>

<script>
import AppSortable from "@/components/shared/sortable_library";
import AppDatePicker from "@/components/shared/datepicker_library";
export default {
  components: {
    AppSortable,
    AppDatePicker
  },
  data() {
    return {
      date: "",
      data: [
        { name: "Alpha", age: 2, breed: "Calico", gender: "male" },
        { name: "Beta", age: 1, breed: "Siamese", gender: "female" },
        { name: "Gamma", age: 6, breed: "Calico", gender: "female" },
        { name: "Delta", age: 5, breed: "Bengal", gender: "male" },
        { name: "Epsilon", age: 2, breed: "Calico", gender: "female" },
        { name: "Fenris", age: 10, breed: "Bengal", gender: "male" },
        { name: "Gorf", age: 4, breed: "Calico", gender: "female" },
        { name: "Hary", age: 6, breed: "Siamese", gender: "male" },
        { name: "Irdis", age: 1, breed: "Siamese", gender: "female" },
        { name: "Joker", age: 7, breed: "Calico", gender: "female" }
      ],
      currentSort: "age",
      currentSortDir: "asc",
      pageSize: 5,
      currentPage: 1,
      enablePagination: true,
      enableSort: true
    };
  }
};
</script>

<style scoped></style>
