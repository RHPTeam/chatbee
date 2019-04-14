<template>
  <div class="rc--row rc--week rc--widget-content rc--rigid" style="height: 124px;">
    <div class="rc--bg">
      <table>
        <tbody>
          <tr>
            <td class="rc--day rc--widget-content rc--sun"
              v-for="(v, i) in 7" :key="i"
              :class="monthDays[rowIndex * 7 + i] && monthDays[rowIndex * 7 + i].status"
              :date="monthDays[rowIndex * 7 + i] && monthDays[rowIndex * 7 + i].time"
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
                :class="monthDays[rowIndex * 7 + i] && monthDays[rowIndex * 7 + i].status"
                :date="monthDays[rowIndex * 7 + i] && monthDays[rowIndex * 7 + i].time"
            >
              <a class="rc--day-number">{{ monthDays[rowIndex * 7 + i].text }}</a>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="rc--event-container">
              <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-orange">
                <div class="rc--content"> 
                  <span class="rc--title">09:00 Long Event</span>
                </div>
                <div class="rc--resizer rc--end-resizer"></div>
              </div>
            </td>
            <td rowspan="1"></td>
            <td class="rc--event-container">
              <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-violet">
                <div class="rc--content"> 
                  <span class="rc--title">08:00 Conference</span>
                </div>
                <div class="rc--resizer rc--end-resizer"></div>
              </div>
            </td>
            <td class="rc--event-container">
              <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-blue">
                <div class="rc--content">
                  <span class="rc--title">18:00 Birthday Party</span>
                </div>
              </div>
            </td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
          </tr>
          <tr>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td class="rc--event-container">
              <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-green">
                <div class="rc--content">
                  <span class="rc--title">12:00 Repeating Event</span>
                </div>
              </div>
            </td>
            <td rowspan="1"></td>
            <td class="rc--event-container">
              <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-red">
                <div class="rc--content">
                  <span class="rc--title">09:00 Meeting</span>
                </div>
              </div>
            </td>
            <td rowspan="1"></td>
          </tr>
          <tr>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td class="rc--event-container">
              <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-blue">
                <div class="rc--content">
                  <span class="rc--title">12:00 Lunch</span>
                </div>
              </div>
            </td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
          </tr>
          <tr>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td class="rc--more-cell" rowspan="1">
              <div class="rc--more" @click="showMorePopover(3)">
                +2 hoạt động
              </div>
            </td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "monthDays",
    "rowIndex",
  ],
  methods: {
    showMorePopover(colIndex) {
      // set top and left popover style
      let topVal = 32 + this.rowIndex*124 + 1;
      if(this.rowIndex != 0 ) topVal = topVal + 1;
      let leftVal = 181*colIndex;
      if(colIndex != 0 ) leftVal = leftVal + 1;

      // emit data
      this.$emit("showMorePopover", true);
      this.$emit("setTopVal", topVal);
      this.$emit("setLeftVal", leftVal);
    }
  }
}
</script>

<style lang="scss">
@import "../../../style"
</style>


