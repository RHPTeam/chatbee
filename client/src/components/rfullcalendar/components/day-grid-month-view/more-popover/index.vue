<template>
   <div class="rc--popover rc--more-popover " :style="{top: topVal + 'px', left: leftVal + 'px'}">
    <div class="rc--header rc--widget-header">
      <span class="rc--title">April 12, 2019</span>
      <span class="rc--close rc--icon rc--icon-x" @click="closeMorePopover"></span>
    </div>
    <div class="rc--body rc--widget-content">
      <div class="rc--event-container">
        <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-green">
          <div class="rc--content"> 
            <span class="rc--title">08:00 Conference</span>
          </div>
        </div>
        <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-blue">
          <div class="rc--content">
            <span class="rc--title">09:30 Meeting</span>
          </div>
        </div>
        <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-green">
          <div class="rc--content">
            <span class="rc--title">12:00 Lunch</span>
          </div>
        </div>
        <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-red">
          <div class="rc--content"> 
            <span class="rc--title">14:30 Meeting</span>
          </div>
        </div>
        <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-blue">
          <div class="rc--content">
            <span class="rc--title">16:00 Happy Hour</span>
          </div>
        </div>
        <div class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--bg-orange">
          <div class="rc--content"> 
            <span class="rc--title">20:00 Dinner</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topVal", "leftVal"],
  methods: {
    closeMorePopover() {
      this.$emit("closeMorePopover", false);
    }
  }
}
</script>

<style lang="scss">
@import "../../../style"
</style>


