<template>
  <div>
    <div v-if="schedules.length === 0"></div>
    <div v-else>
      <div
        class="body mt_4 pb_3"
        v-for="(item, index) in schedule.content"
        :key="index"
      >
        <!--Start: Text item component-->
        <div v-if="item.typeContent === 'text'">
          <add-text :item="item" :schedule="schedule" />
        </div>
        <!--        End: Text item component-->
        <!--Start: Image item component-->
        <div v-if="item.typeContent === 'image'">
          <add-image :item="item" :schedule="schedule" />
        </div>
        <!--        End: Image item component-->
        <!--        Start: Time item component-->
        <slider-schedule :item="item" :schedule="schedule" />
        <!--        End: Time item component-->
        <!--        Start: subcribe item component-->
        <div v-if="item.typeContent === 'subscribe'">
          <subcribe
            :item="item"
            :schedule="schedule"
            @updateItemFromMiddleComponent="schedule.content[index] = $event"
          />
        </div>
        <!--        End: subcribe item component-->
        <!--        Start: Unsubcribe item component-->
        <div v-if="item.typeContent === 'unsubscribe'">
          <un-subscribe
            :item="item"
            :schedule="schedule"
            @updateItemFromMiddleComponent="schedule.content[index] = $event"
          />
        </div>
        <!--        End: Unsubcribe item component-->
      </div>
    </div>
    <div class="footer mt_3">
      <div class="title text_left">Thêm phần tử</div>
      <div class="group d_flex align_items_center">
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addItemSchedule('text', $route.params.scheduleId)"
        >
          <icon-base
            class="icon-text"
            width="20"
            height="20"
            viewBox="0 0 13.53 20.11"
          >
            <icon-text />
          </icon-base>
          Văn bản
        </div>

        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="addItemSchedule('image', $route.params.scheduleId)"
        >
          <icon-base
            class="icon-image"
            width="20"
            height="20"
            viewBox="0 0 26 26"
          >
            <icon-image />
          </icon-base>
          Hình ảnh
        </div>
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="addItemSchedule('time', $route.params.scheduleId)"
        >
          <icon-base
            class="icon-sand-clock"
            width="20"
            height="20"
            viewBox="0 0 14.41 20.14"
          >
            <icon-sand-clock />
          </icon-base>
          Thời gian
        </div>
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="showPopupPlugins = true"
        >
          <icon-base
            class="icon-plus"
            width="20"
            height="20"
            viewBox="0 0 68 68"
          >
            <icon-plus />
          </icon-base>
          Thêm mới
        </div>
      </div>
    </div>
    <!-- Popup add plugins -->
    <transition name="popup">
      <add-plugins
        v-if="showPopupPlugins === true"
        :schedule="schedule._id"
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
        @showSubcrible="showSubcrible = $event"
        @showUnSubcrible="showUnSubcrible = $event"
      />
    </transition>
  </div>
</template>
<script>
import AddText from "./plugins/add_text";
import AddImage from "./plugins/add_images";
import Subcribe from "./plugins/subcribe";
import UnSubscribe from "./plugins/unsubscribe";

import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

export default {
  data() {
    return {
      showPopupPlugins: false,
      showAddAttribute: false,
      showSubcrible: false,
      showUnSubcrible: false
    };
  },
  computed: {
    schedules() {
      return this.$store.getters.schedules;
    },
    schedule() {
      return this.$store.getters.schedule;
    }
  },
  methods: {
    async addItemSchedule(type, id) {
      const schedules = await this.getSchedules();
      const dataSender = {
        type: type,
        itemId: id,
        scheduleId: schedules._id
      };
      this.$store.dispatch("createItemSchedule", dataSender);
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
    }
  },
  components: {
    AddText,
    AddImage,
    Subcribe,
    UnSubscribe
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
