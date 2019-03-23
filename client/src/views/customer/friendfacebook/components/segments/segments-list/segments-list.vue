<template>
  <!-- Segments List-->
  <div class="segments--list" :data-theme="currentTheme">
    <div class="btn--clear mr_3 mb_2">Xóa vùng chọn</div>

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
    </div>

    <div class="segments--list-item btn--add-segment mb_2" @click="createGroup">
      <icon-base
        class="icon--add mr_1"
        icon-name="plus"
        width="14"
        height="14"
        viewBox="0 0 60 60"
      >
        <icon-plus /> </icon-base
      >Tạo nhóm mới
    </div>
  </div>
  <!-- End Segments List -->
</template>

<script>
export default {
  data() {
    return {
      currentIndex: null
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
    }
  },
  async created() {
    await this.$store.dispatch("getGroupFriend");
  }
};
</script>

<style lang="scss" scoped>
@import "./segments-list"
</style>
