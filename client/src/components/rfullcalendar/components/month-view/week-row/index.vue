<template>
  <div class="rc--row rc--week rc--widget-content rc--rigid" style="height: 108px;">
    <div class="rc--bg">
      <table>
        <tbody>
          <tr>
            <td class="rc--day rc--widget-content rc--sun"
              v-for="(v, i) in 7" :key="i"
              :class="days[rowIndex * 7 + i] && days[rowIndex * 7 + i].status"
              :date="days[rowIndex * 7 + i] && days[rowIndex * 7 + i].time"
            >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rc--content-skeleton">
      <table>
        <thead>
          <tr>
            <td class="rc--day-top rc--sun"
                v-for="(v, i) in 7" :key="i"
                :class="days[rowIndex * 7 + i] && days[rowIndex * 7 + i].status"
                :date="days[rowIndex * 7 + i] && days[rowIndex * 7 + i].time"
            >
              <a class="rc--day-number">{{ days[rowIndex * 7 + i].text }}</a>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td class="rc--event-container">
              <a class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-red">
                <div class="rc--content"><span class="rc--title">08:00 Khởi động chiến dịch</span></div>
                <div class="rc--resizer rc--end-resizer"></div>
              </a>
              <a class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green">
                <div class="rc--content"><span class="rc--title">09:00 Khởi động chiến dịch</span></div>
                <div class="rc--resizer rc--end-resizer"></div>
              </a>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "days",
    "rowIndex"
  ],
}
</script>

<style lang="scss">
@import "../../../style"
</style>


