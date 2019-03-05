<template>
  <div class="setting text_left" :data-theme="currentTheme">
    <div class="setting--desc">Cài đặt thời gian</div>
    <div class="setting--label">Thời gian gửi</div>
    <div class="ct_f p_0">
      <div class="r">
        <div class="c c_md_12 c_lg_5">
          <div
            class="hour--display d_flex justify_content_between align_items_center m_auto"
          >
            <input
              type="number"
              class="hour--display-block text_center"
              :value="hour"
              v-on:input="changeHour($event)"
            />
            <div
              class="hour--display-center d_flex justify_content_center align_items_center"
            >
              :
            </div>
            <input
              type="number"
              class="hour--display-block text_center"
              :value="minute"
              v-on:input="changeMinute($event)"
            />
          </div>
          <div class="hour--adjust">
            <div class="hour--adjust-name">Giờ</div>
            <input type="range" min="0" max="24" :value="hour" :style="{ 'background-size': percentHour+'% 100%'}" v-on:input="changeHour($event)"/>
            <div class="hour--adjust-name">Phút</div>
            <input type="range" min="0" max="60" :value="minute" :style="{ 'background-size': percentMinute+'% 100%'}" v-on:input="changeMinute($event)"/>
          </div>
        </div>
        <div class="c c_md_12 c_lg_7 text_center mt_3 mt_lg_0">
          <datepicker
            :readonly="true"
            format="YYYY-MM-DD"
            name="date-setting"
            v-model="date"
            autofocus
          ></datepicker>
        </div>
        <div class="r">
          <div class="c">
            <div
              class="waiting--time d_flex justify_content_start align_items_center"
            >
              <div class="waiting--time-desc">
                Thời gian chờ giữa các lần gửi
              </div>
              <div
                class="waiting--setup d_flex justify_content_start align_items_center"
              >
                <input type="number" value="00" />
                <div class="select--wrapper position_relative">
                  <select>
                    <option>giây</option>
                    <option>phút</option>
                    <option>giờ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "@/components/shared/datepicker_library";
export default {
  components: {
    Datepicker
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      date: "",
      hour: '00',
      minute: '00',
      percentHour: 0,
      percentMinute: 0
    };
  },
  methods: {
    changeHour (e) {
      if(e.target.value < 10) {
        this.hour = '0'+ e.target.value
      }
      else {
        this.hour = e.target.value;
      }
    },
    changeMinute (e) {
      if(e.target.value < 10) {
        this.minute = '0'+ e.target.value
      }
      this.minute = e.target.value;
    },
  },
  watch: {
    hour(){
      this.percentHour = (parseInt(this.hour)*100)/24;
    },
    minute() {      
      this.percentMinute = (parseInt(this.minute)*100)/60;
    }
  },
};
</script>

<style scoped lang="scss">
@import "./setting";
</style>

<style lang="scss">
@import "./custom-datepicker";
</style>
