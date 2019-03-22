<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="mt_2">Xóa bạn bè khỏi nhóm {{ groupInfo.name }}</div>
          <div class="desc mt_3">Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div class="modal--body mt_3">
          
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-submit" @click="deleteSelected(selectedUIDs)">
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
  props: ["isShowPronounPopup"],

  data() {
    return {
    };
  },

  computed: {
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    },
    groupInfo() {
      return this.$store.getters.groupInfo;
    },
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    deleteSelected(data) {
      const dataSender = {
        gr_id: this.groupInfo._id,
        friends: data
      }
      this.$store.dispatch("deleteFriendsFromGroup", dataSender);
      this.$emit("closeAddPopup", false);
      this.$store.dispatch("selectedUIDs", []);
    }
  },

  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
@import "../popup";
@import "./delete-friends-popup";
</style>
