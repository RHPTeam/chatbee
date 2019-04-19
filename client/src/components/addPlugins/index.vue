<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content p_4">
        <div
          class="modal--header d_flex align_items_center justify_content_between"
        >
          <div class="modal-header-title">BeeChat Plugins</div>
          <div class="plugins--close" @click="closePopupPlugin">
            <icon-base
              icon-name="close"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-close />
            </icon-base>
          </div>
        </div>
        <div class="modal--body">
          <div class="plugins--title text_left mt_4">Most used :</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listMostUsed"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div class="plugin--item-tooltip" v-if="plugin.isActive == false">
                <app-tooltip />
              </div>
            </div>
          </div>
          <!--Start: Plugins Sequences-->
          <div class="plugins--title text_left mt_4">Sequences</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <!--Start: Subcrible-->
            <div
              class="plugins--item d_flex align_items_center active m_2 position_relative"
              @click="openSubcriblePlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="srcSubcrible" alt class="position_absolute" />
                </div>
                Đăng ký trình tự
                <div
                  class="plugins--item-help position_absolute"
                  v-if="hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
            </div>
            <!--End: Subcrible-->
            <!--Start: Unsubcrible-->
            <div
              class="plugins--item d_flex align_items_center active m_2 position_relative"
              @click="openUnSubcriblePlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="srcSubcrible" alt class="position_absolute" />
                </div>
                Hủy đăng ký trình tự
                <div
                  class="plugins--item-help position_absolute"
                  v-if="hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
            </div>
            <!--End: Unsubcrible-->
          </div>
          <!--End: Plugins Sequences-->
          <div class="plugins--title text_left mt_4">
            Plugins with Subscriptions:
          </div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listSubscriptions"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div class="plugin--item-tooltip" v-if="plugin.isActive == false">
                <app-tooltip />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTooltip from "./tooltip_plugin";

import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  props: {
    showPopupPlugins: Boolean,
    showSubcrible: Boolean,
    showUnSubcrible: Boolean,
    schedule: String
  },
  data() {
    return {
      srcSubcrible: require("@/assets/images/plugins/subscribe.svg"),
      srcUnSubcrible: require("@/assets/images/plugins/unsubscribe.svg"),
      hasInfo: false,
      listMostUsed: [
        {
          name: "Danh Sách",
          src: require("@/assets/images/plugins/list.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Gửi âm thanh",
          src: require("@/assets/images/plugins/audio.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Gửi video",
          src: require("@/assets/images/plugins/video.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Bình luận",
          src: require("@/assets/images/plugins/comment.svg"),
          hasInfo: false,
          isActive: false
        }
      ],
      listSubscriptions: [
        {
          name: "Danh sách đăng ký",
          src: require("@/assets/images/plugins/subscriptions-list.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Phân loại",
          src: require("@/assets/images/plugins/digest.png"),
          hasInfo: false,
          isActive: false
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    schedules() {
      return this.$store.getters.schedules;
    }
  },
  methods: {
    closePopupPlugin() {
      this.$emit("closePopupPlugin", false);
    },
    openModalPlugins() {
      this.$emit("showAddAttribute", true);
      this.$emit("closePopupPluginClick", false);
    },
    async getSchedules() {
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      return result[0];
    },
    async openSubcriblePlugins() {
      this.$emit("showSubcrible", true);
      this.$emit("closePopupPluginClick", false);
      const schedules = await this.getSchedules();
      const dataSender = {
        scheduleId: schedules._id,
        type: "subscribe",
        itemId: this.schedule
      };
      this.$store.dispatch("createItemSchedule", dataSender);
    },
    async openUnSubcriblePlugins() {
      this.$emit("showUnSubcrible", true);
      this.$emit("closePopupPluginClick", false);
      const schedules = await this.getSchedules();
      const dataSender = {
        scheduleId: schedules._id,
        type: "unsubscribe",
        itemId: this.schedule
      };
      this.$store.dispatch("createItemSchedule", dataSender);
    }
  },
  components: {
    AppTooltip
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style.scss";
</style>
