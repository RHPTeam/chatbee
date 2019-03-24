<template>
  <!-- Segments List-->
  <div class="segments--list" :data-theme="currentTheme">
    <div class="btn--seeall mr_3 mb_2"
        :class="[groupSelected === false ? 'btn--seall-active' : '']"
        @click="seeAllUsers"
    >Xem tất cả</div>

    <div
      class="segments--list-item mr_2 mb_2"
      :class="[currentIndex === index ? 'active' : '']"
      v-for="(groupItem, index) in groupFriend"
      :key="index"
      @click="getGroupByID(groupItem._id, index)"
    >
      <editable
        :value="groupItem.name"
        @input="groupItem.name = $event"
        placeholder="Nhập tên..."
        :target="groupItem._id"
        type="groupFriend"
      ></editable>
      <div class="btn--delete" @click="showDeletePopup(groupItem._id)">
        <icon-base
          class="icon--add mr_1"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 26 26"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>

    <div class="segments--list-item btn--add-segment mb_2" @click="createGroup">
      <icon-base
        class="icon--add mr_2"
        icon-name="plus"
        width="14"
        height="14"
        viewBox="0 0 60 60"
      >
        <icon-plus /> </icon-base
      >Tạo nhóm mới
    </div>

    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-group-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        title="Xoá nhóm"
        :isShowDeletePopup="isShowDeletePopup"
        @closeAddPopup="isShowDeletePopup = $event"
        :groupID="deleteGroupID"
        type="group"
      />
    </transition>
  </div>
  <!-- End Segments List -->
</template>

<script>
import DeleteGroupPopup from "../../popup/delete-popup/delete-popup";
export default {
  props: ["groupSelected"],
  data() {
    return {
      currentIndex: null,
      isShowDeletePopup: false,
      deleteGroupID: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupFriend() {
      return this.$store.getters.groupFriend;
    }
  },
  methods: {
    getGroupByID(group_id, index) {
      this.currentIndex = index;
      this.$store.dispatch("getGroupByID", group_id);
      this.$store.dispatch("selectedUIDs", []);
      this.$emit("groupSelected", true);
    },
    createGroup() {
      this.$store.dispatch("createGroup");
    },
    showDeletePopup(id) {
      this.deleteGroupID = id;
      this.isShowDeletePopup = true;
    },
    seeAllUsers() {
      this.$emit("groupSelected", false);
      this.currentIndex = null;
    }
  },
  async created() {
    await this.$store.dispatch("getGroupFriend");
  },
  components: {
    DeleteGroupPopup
  }
};
</script>

<style lang="scss" scoped>
@import "./segments-list";
</style>
