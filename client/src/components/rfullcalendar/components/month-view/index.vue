<template>
	<div class="rc--view rc--dayGridMonth-view rc--dayGrid-view">
		<table class="">
      <!-- Start: Month View Head -->
			<thead class="rc--head">
        <tr>
          <td class="rc--head-container rc--widget-header">
            <div class="rc--row rc--widget-header">
              <table>
                <thead>
                  <tr>
                    <th class="rc--day-header rc--widget-header rc--sun"><span>CN</span></th>
                    <th class="rc--day-header rc--widget-header rc--mon"><span>T2</span></th>
                    <th class="rc--day-header rc--widget-header rc--tue"><span>T3</span></th>
                    <th class="rc--day-header rc--widget-header rc--wed"><span>T4</span></th>
                    <th class="rc--day-header rc--widget-header rc--thu"><span>T5</span></th>
                    <th class="rc--day-header rc--widget-header rc--fri"><span>T6</span></th>
                    <th class="rc--day-header rc--widget-header rc--sat"><span>T7</span></th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
        </tr>
      </thead>
      <!-- End: Month View Head -->

      <!-- Start: Month View Body -->
      <tbody class="rc--body">
        <tr>
          <td class="rc--widget-content">
            <div class="rc--scroller rc--day-grid-container" style="overflow: hidden; height: auto;">
              <div class="rc--day-grid">
                <!-- Start: A week row -->
                <rc-week-row 
                  v-for="(v, i) in 6" :key="i"
                  :days="days"
                  :rowIndex="i"
                  @setTopVal="topVal = $event"
                  @setLeftVal="leftVal = $event"
                  @showMorePopover="showMorePopover = $event"
                />
                <!-- End: A week row -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <!-- End: Month View Body -->
		</table>
    <!-- Popover -->
    <rc-more-popover
      v-if="showMorePopover"
      @closeMorePopover="showMorePopover = $event"
      :topVal="topVal"
      :leftVal="leftVal"
    />
	</div>
</template>

<script>
import RcWeekRow from "./week-row/index"
import RcMorePopover from "./more-popover/index"
export default {
  props: [
    "days"
  ],
  data() {
    return {
      showMorePopover: false,
      topVal: 0,
      leftVal: 0
    }
  },
  components: {
    RcWeekRow,
    RcMorePopover
  }
}
</script>

<style lang="scss">
@import "../../style"
</style>

