<template>
  <div>
    <div v-if="schedules.length === 0"></div>
    <div v-else>
      <div
        class="body mt_4 pb_3"
        v-for="(item, key) in schedule.content"
        :key="key"
      >
        <!--Start: Text item component-->
        <div v-if="item.typeContent === 'text'">
          <div class="text d_flex align_items_center mb_2">
            <div class="text-edit">
              <contenteditable
                class="editable"
                tag="div"
                placeholder="Nhập văn bản..."
                :contenteditable="true"
                v-model="item.valueText"
                @keyup="upTypingText('itembroadcasts', item)"
                @keydown="clear"
              />
            </div>
            <div class="body--icon ml_2">
              <div
                class="icon--delete mb_1"
                @click="isDeleteItemSchedule = true"
              >
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                >
                  <icon-remove />
                </icon-base>
              </div>
              <div class="icon--move d_none">
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                >
                  <icon-move />
                </icon-base>
              </div>
            </div>
          </div>
        </div>
        <!--        End: Text item component-->
        <!--Start: Image item component-->
        <div v-if="item.typeContent === 'image'">
          <div class="images d_flex align_items_center position_relative mb_2">
            <div class="image--link">
              <img :src="item.valueText" width="280px" height="207px" />
            </div>
            <div class="body--icon ml_2">
              <div class="icon--delete" @click="isDeleteItemSchedule = true">
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                >
                  <icon-remove />
                </icon-base>
              </div>
              <div class="icon--move d_none mt_1 mb_1">
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                >
                  <icon-move />
                </icon-base>
              </div>
              <div class="icon--plus d_none">
                <icon-base
                  icon-name="plus"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                >
                  <icon-plus />
                </icon-base>
              </div>
            </div>
            <div class="upload--image position_absolute">
              <form enctype="multipart/form-data" @submit.prevent="sendFile">
                <input
                  type="file"
                  ref="file"
                  @change="selectFile(item._id)"
                  id="upload_image"
                />
              </form>
              <div class="image--icon">
                <div class="icon-image">
                  <icon-base
                    class="icon-image"
                    width="32"
                    height="32"
                    viewBox="0 0 26 26"
                    name="upload-image"
                  >
                    <icon-upload-image />
                  </icon-base>
                </div>
                <span>Tải ảnh lên</span>
              </div>
            </div>
          </div>
        </div>
        <!--        End: Image item component-->
        <!--        Start: Time item component-->
        <slider-schedule :item="item" :schedule="schedule" />
        <!--        End: Time item component-->

        <!--Start:Delete Item Popup-->
        <delete-item
          v-if="isDeleteItemSchedule === true"
          desc="Bạn có thực sự muốn xóa nội dung này trong chiến dịch không?"
          :block="schedule._id"
          :content="item._id"
          target="itemschedule"
          @close="isDeleteItemSchedule = $event"
        />
        <!--End: Delete Item Popup-->
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
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
      />
    </transition>
  </div>
</template>
<script>
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
let typingTimer;
export default {
  data() {
    return {
      showPopupPlugins: false,
      showAddAttribute: false,
      isDeleteItemSchedule: false
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
    // async deleteItemSchedule(id) {
    //   const schedules = await this.getSchedules();
    //   const objSender = {
    //     bcId: schedules._id,
    //     blockId: this.schedule._id,
    //     contentId: id
    //   };
    //   this.$store.dispatch("deleteItemSchedule", objSender);
    // },
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
    selectFile(id) {
      let indexImage;
      let arrCurrentSchedule = this.schedule;
      arrCurrentSchedule.content
        .filter(item => item.typeContent === "image")
        .map((item, index) => {
          if (item._id === id) {
            indexImage = index;
          }
        });
      this.file = this.$refs.file[indexImage].files[0];
      this.sendFile(id);
    },
    async sendFile(id) {
      const formData = new FormData();
      formData.append("file", this.file);
      const schedules = await this.getSchedules();
      const objSender = {
        bcId: schedules._id,
        blockId: this.schedule._id,
        contentId: id,
        value: formData
      };
      this.$store.dispatch("updateItemImageSchedule", objSender);
    },
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "itembroadcasts") {
        typingTimer = setTimeout(this.updateSchedule(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    async updateSchedule(group) {
      let result = await BroadcastService.index();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      const objSender = {
        bcId: result[0]._id,
        blockId: this.$store.getters.schedule._id,
        contentId: group._id,
        value: group.valueText
      };
      this.$store.dispatch("updateItemSchedule", objSender);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
