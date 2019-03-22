<template>
  <div>
    {{broadcast}}
    <div class="body mt_4 pb_3">
      <!--Thêm văn bản-->
      <div>
        <div class="text d_flex align_items_center mb_2">
          <div class="text-edit">
            <div contenteditable="true"></div>
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
            <div class="icon--move">
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
      <div>
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
            <div class="icon--move mt_1 mb_1">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 64 64"
              >
                <icon-move />
              </icon-base>
            </div>
            <div class="icon--move">
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
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    addItemBroadcasts(type, id) {
      const dataSender = {
        value: "",
        type: type,
        id: id
      };
      this.$store.dispatch("createContentItemSchedule", dataSender);
    }
  },
  computed: {
    broadcast() {
      return this.$store.getters.broadcast;
    }
  },
  async created() {
    await this.$store.dispatch("getItemBroadcasts", this.$route.params.scheduleId);
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
