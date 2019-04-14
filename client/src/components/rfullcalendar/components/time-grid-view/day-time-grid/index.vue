<template>
  <div class="rc--scroller rc--time-grid-container" style="overflow: hidden scroll; height: 607px;">
    <div class="rc--time-grid">
      <div class="rc--bg">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis rc--widget-content" style="width: 42px;"></td>
              <td class="rc--day rc--widget-content"
                :data="activeDay"
                :class="[isToday(new Date(activeDay)) ? 'rc--today' : '']"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rc--slats">
        <table>
          <tbody>
            <tr v-for="(time, index) in timePoint" 
                :key="index"
                :data-time="time"
                :class="[index % 2 != 0 ? 'rc--minor' : '']"
            >
              <!-- Even Hours -->
              <td v-if="index % 2 === 0" class="rc--axis rc--time rc--widget-content" style="width: 42px; height: 28px; font-size: .85rem;">
                <span>{{ time }}</span>
              </td>
              <td v-if="index % 2 === 0" class="rc--widget-content"></td>

              <!-- Odd hours -->
              <td v-if="index % 2 != 0" class="rc--axis rc--time rc--widget-content" style="width: 42px; height: 28px; font-size: .85rem;"></td>
              <td v-if="index % 2 != 0" class="rc--widget-content"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="rc--divider rc--widget-header" style="display:none">
      <div class="rc--content-skeleton">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis" style="width: 42px;"></td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green" style="top: 464px; bottom: -493px;">
                      <div class="rc--content">
                        <div class="rc--title">08:00 Khởi động chiến dịch</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-red" style="top: 493px; bottom: -522px;">
                      <div class="rc--content">
                        <div class="rc--title">08:30 Happy Hour</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                  </div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["timePoint", "activeDay"],
  methods: {
    isToday(day) {
      const now = new Date(); // now date time
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // now date at 00:00:00
      if (day.toDateString() === today.toDateString()) {
        return true;
      }
      else return false;
    },
  }
}
</script>

<style lang="scss">
@import "../../../style"
</style>

