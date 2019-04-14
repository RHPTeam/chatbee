<template>
  <div class="rc--scroller rc--time-grid-container" style="overflow: hidden scroll; height: 607px;">
    <div class="rc--time-grid">
      <div class="rc--bg">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis rc--widget-content" style="width: 42px;"></td>
              <td class="rc--day rc--widget-content"
                v-for="(day, i) in weekDays" :key="i"
                :data="day.time"
                :class="day.status"
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
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
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
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-orange" style="top: 464px; bottom: -493px;">
                      <div class="rc--content">
                        <div class="rc--title">08:00 Khởi động chiến dịch</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-blue" style="top: 493px; bottom: -522px;">
                      <div class="rc--content">
                        <div class="rc--title">08:30 Happy Hour</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green" style="top: 696px; bottom: -754px;">
                      <div class="rc--content">
                        <div class="rc--title">20:00 Dinner</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                  </div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container"></div>
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
  props: ["timePoint", "weekDays"],
}
</script>

<style lang="scss">
@import "../../../style"
</style>

