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
                    <th class="rc--day-header rc--widget-header rc--sun rc--past" data-date="2019-04-07">CN 4/7</th>
                    <th class="rc--day-header rc--widget-header rc--mon rc--past" data-date="2019-04-08">T2 4/8</th>
                    <th class="rc--day-header rc--widget-header rc--tue rc--past" data-date="2019-04-09">T3 4/9</th>
                    <th class="rc--day-header rc--widget-header rc--wed rc--past" data-date="2019-04-10">T4 4/10</th>
                    <th class="rc--day-header rc--widget-header rc--thu rc--past" data-date="2019-04-11">T5 4/11</th>
                    <th class="rc--day-header rc--widget-header rc--fri rc--today" data-date="2019-04-12">T6 4/12</th>
                    <th class="rc--day-header rc--widget-header rc--sat rc--future" data-date="2019-04-13">T7 4/13</th>
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
  props: ["timePoint"],
  components: {
    RcWeekTimeGrid,
  }
}
</script>

<style lang="scss">
@import "../../style"
</style>
