<template>
  <div>
    <div v-if="schedules.length === 0"></div>
    <div
      v-else
      v-for="(items, index) in schedules[0].blocks[0].blockId.contents"
      :key="index"
    >
      <div class="body mt_4 pb_3" v-for="(item, key) in items" :key="key">
        <!--Thêm văn bản-->
        <div v-if="item.typeContent === 'text'">
          <div class="text d_flex align_items_center mb_2">
            <div class="text-edit">
              <editable
                :value="item.valueText"
                @input="item.valueText = $event"
                :target="item._id"
                type="itemBroadcasts"
                placeholder="Nhập văn bản..."
              ></editable>
            </div>
            <div class="body--icon ml_2">
              <div class="icon--delete mb_1">
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
        <!--Thêm ảnh mới-->
        <div v-if="item.typeContent === 'image'">
          <div class="images d_flex align_items_center position_relative mb_2">
            <div class="image--link">
              <img
                src="http://pipsum.com/280x207.jpg"
                alt="demo scripts facebook"
              />
            </div>
            <div class="body--icon ml_2">
              <div class="icon--delete">
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
              <input type="file" name="upload_image" id="upload_image" />
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
      </div>
    </div>
    <div class="footer mt_3">
      <div class="title text_left">Thêm phần tử</div>
      <div class="group d_flex align_items_center">
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="addItemBroadcasts('text', $route.params.scheduleId)"
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
          @click="addItemBroadcasts('image', $route.params.scheduleId)"
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
          @click="addItemBroadcasts('time', $route.params.scheduleId)"
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
        v-if="showPopupPlugins == true"
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
export default {
  data() {
    return {
      showPopupPlugins: false,
      showAddAttribute: false
    };
  },
  methods: {
    addItemBroadcasts(type, id) {
      const dataSender = {
        value: "",
        type: type,
        itemId: id,
        scheduleId: this.schedules[0]._id
      };
      this.$store.dispatch("createContentItemSchedule", dataSender);
    }
  },
  computed: {
    schedules() {
      const dataArr = this.$store.getters.itemBroadcasts;
      return dataArr.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
