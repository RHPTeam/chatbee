<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">Xóa cuộc trò chuyện</div>
          <div class="desc mt_3">Toàn bộ nội dung cuộc trò chuyện này sẽ bị xóa và không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-submit" @click="closeAddPopup">HỦY</button>
          <button class="btn-skip" @click="deleteConversation">
            XÓA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "isShowDeletePopup",
  ],

  data() {
    return {
    };
  },

  computed: {
    curConversation() {
      return this.$store.getters.curConversation;
    },
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    deleteConversation() {
      const conveID = this.curConversation._id;
      this.$store.dispatch("deleteConversation", conveID);
      this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../popup";
@import "./delete-popup";
</style>
