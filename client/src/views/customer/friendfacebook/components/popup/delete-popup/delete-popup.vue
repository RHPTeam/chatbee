<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">{{ title }} {{ groupTarget.name }}</div>
          <div class="desc mt_3">Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-submit" @click="deleteSelected">
            XÓA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: [
    "isShowDeletePopup",
    "title",
    "groupTarget",
    "type"
  ],

  data() {
    return {
    };
  },

  computed: {
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    },
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    deleteSelected() {
      if (this.type === 'friends') {
        const dataSender = {
          gr_id: this.groupTarget._id,
          friends: this.selectedUIDs
        }
        this.$store.dispatch("deleteFriendsFromGroup", dataSender);
        this.$emit("closeAddPopup", false);
        this.$store.dispatch("selectedUIDs", []);
      }
      else if (this.type === 'group') {
        const gr_id = this.groupTarget._id;
        this.$store.dispatch("deleteGroupFriends", gr_id);
        this.$emit("closeAddPopup", false);
      }
    }
  },

  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
@import "../popup";
@import "./delete-popup";
</style>
