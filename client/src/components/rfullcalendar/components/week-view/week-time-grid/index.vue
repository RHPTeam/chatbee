<template>
  <div class="rc--scroller rc--time-grid-container" style="overflow: hidden scroll; height: 607px;">
    <div class="rc--time-grid">
      <div class="rc--bg">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis rc--widget-content" style="width: 42px;"></td>
              <td class="rc--day rc--widget-content rc--sun rc--past" data-date="2019-04-07"></td>
              <td class="rc--day rc--widget-content rc--mon rc--past" data-date="2019-04-08"></td>
              <td class="rc--day rc--widget-content rc--tue rc--past" data-date="2019-04-09"></td>
              <td class="rc--day rc--widget-content rc--wed rc--past" data-date="2019-04-10"></td>
              <td class="rc--day rc--widget-content rc--thu rc--past" data-date="2019-04-11"></td>
              <td class="rc--day rc--widget-content rc--fri rc--today" data-date="2019-04-12"></td>
              <td class="rc--day rc--widget-content rc--sat rc--future" data-date="2019-04-13"></td>
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
                    <!-- <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable" style="top: 461px; bottom: -549px; z-index: 1; left: 0%; right: 0%; margin-right: 20px;">
                      <div class="rc--content">
                        <div class="rc--time" data-start="10:30" data-full="10:30 AM - 12:30 PM">
                          <span>10:30 - 12:30</span>
                        </div>
                        <div class="rc--title">Meeting</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--time-grid-event-inset" style="top: 527px; bottom: -571px; z-index: 2; left: 50%; right: 0%;">
                      <div class="rc--content">
                        <div class="rc--time" data-start="12:00" data-full="12:00 PM">
                          <span>12:00</span>
                        </div>
                        <div class="rc--title">Lunch</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div> -->
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-orange" style="top: 464px; bottom: -522px; z-index: 1; left: 0%; right: 0%;">
                      <div class="rc--content">
                        <div class="rc--time" data-start="2:30" data-full="2:30 PM">
                          <span>8:00</span>
                        </div>
                        <div class="rc--title">Meeting</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-blue" style="top: 609px; bottom: -667px; z-index: 1; left: 0%; right: 0%;">
                      <div class="rc--content">
                        <div class="rc--time" data-start="5:30" data-full="5:30 PM">
                          <span>10:30</span>
                        </div>
                        <div class="rc--title">Happy Hour</div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                    <div class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable rc--bg-green" style="top: 696px; bottom: -754px; z-index: 1; left: 0%; right: 0%;">
                      <div class="rc--content">
                        <div class="rc--time" data-start="8:00" data-full="8:00 PM">
                          <span>12:00</span>
                        </div>
                        <div class="rc--title">Dinner</div>
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
  props: ["timePoint"]
}
</script>

<style lang="scss">
@import "../../../style"
</style>

