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
        class=""
        :value="groupItem.name"
        @input="groupItem.name = $event"
        placeholder="Nhập tên..."
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
      >Thêm phân khúc
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
.segments--list {
  display: inline-block;

  .btn--clear {
    border: 1px solid;
    border-radius: 10px;
    display: inline-block;
    padding: 0.375rem 0.75rem;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      color: #fff !important;
      background-color: #ffb94a !important;
      border-color: #ffb94a !important;
    }
  }

  &-item {
    border: 1px solid;
    border-radius: 20px;
    display: inline-block;
    padding: 0.375rem 0.75rem;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      border: 1px solid #ffb94a !important;
      color: #ffb94a;
    }
    .editable {
      overflow: inherit;
    }
    &.active {
      border: 1px solid #ffb94a !important;
      color: #ffb94a;
    }
  }
}
/* ChangeColor */
// Light
.segments--list[data-theme="light"] {
  color: #444;
  .btn--clear {
    border-color: #e4e4e4;
    color: #999;
  }
  .segments--list-item {
    background-color: #ffffff;
    border-color: #e4e4e4;
  }
}

//Dark
.segments--list[data-theme="dark"] {
  color: #f7f7f7;
  .btn--clear {
    border-color: #666;
    color: #999;
  }
  .segments--list-item {
    background-color: #27292d;
    border-color: #666;
    .btn--add-segment {
      color: #f7f7f7;
    }
  }
}
</style>
