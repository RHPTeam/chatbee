<template>
  <div class="rc--view rc--listWeek-view rc--list-view rc--widget-content">
    <div class="rc--scroller" style="overflow: hidden auto; height: 672px;">
      <table class="rc--list-table ">
        <tbody>
          <!-- Sunday -->
          <tr class="rc--list-heading" :date="weekDays[0].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[0].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[0].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-green"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>

          <!-- Monday -->
          <tr class="rc--list-heading" :date="weekDays[1].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[1].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[1].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-green"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">09:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-blue"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">20:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-orange"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khuyến mại khủng nhân dịp sinh nhật</a></td>
          </tr>

          <!-- Tuesday -->
          <tr class="rc--list-heading" :date="weekDays[2].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[2].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[2].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-red"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>

          <!-- Wednesday -->
          <tr class="rc--list-heading" :date="weekDays[3].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[3].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[3].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-green"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>

          <!-- Thursday -->
          <tr class="rc--list-heading" :date="weekDays[4].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[4].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[4].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-violet"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>

          <!-- Friday -->
          <tr class="rc--list-heading" :date="weekDays[5].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[5].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[5].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-blue"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>

          <!-- Saturday -->
          <tr class="rc--list-heading" :date="weekDays[6].time">
            <td class="rc--widget-header" colspan="3">
              <div class="rc--list-heading-main">{{ dayFullName[new Date(weekDays[6].time).getDay()] }}</div>
              <div class="rc--list-heading-alt">
                {{ formatDate(weekDays[6].time) }}
              </div>
            </td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-orange"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>
          <tr class="rc--list-item">
            <td class="rc--list-item-time rc--widget-content">08:00</td>
            <td class="rc--list-item-marker rc--widget-content">
              <span class="rc--event-dot rc--bg-green"></span>
            </td>
            <td class="rc--list-item-title rc--widget-content"><a>Khởi động chiến dịch</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dayFullName" ,"monthName", "weekDays"],
  methods: {
    formatDate(d) {
      const time = new Date(d);
      return String(time.getDate()).padStart(2, "0") + ' ' +
                    this.monthName[time.getMonth()] + ', ' + 
                    time.getFullYear()
    }
  }
}
</script>

<style lang="scss">
@import "../../style"
</style>

