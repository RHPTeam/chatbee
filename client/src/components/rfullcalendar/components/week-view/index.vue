<template>
  <div class="rc--view rc--timeGridWeek-view rc--timeGrid-view">
    <table>
      <thead class="rc--head">
        <tr>
          <td class="rc--head-container rc--widget-header">
            <div class="rc--row rc--widget-header" style="border-right-width: 1px; margin-right: 16px;">
              <table>
                <thead>
                  <tr>
                    <th class="rc--axis rc--widget-header" style="width: 42px;"></th>
                    <th class="rc--day-header rc--widget-header" 
                        v-for="(day, i) in weekDays" :key="i"
                        :data="day.time"
                    >{{ day.text }}</th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="rc--body">
        <tr>
          <td class="fc-widget-content">
            <rc-week-time-grid
              :timePoint="timePoint"
              :weekDays="weekDays"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RcWeekTimeGrid from "./week-time-grid/index"
export default {
  props: ["timePoint", "weekDays"],
  components: {
    RcWeekTimeGrid,
  }
}
</script>

<style lang="scss">
@import "../../style"
</style>
