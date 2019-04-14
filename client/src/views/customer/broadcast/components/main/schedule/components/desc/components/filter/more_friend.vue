<template>
  <div class="more position_fixed">
    <div class="wrapper m_auto p_4">
      <div class="header">
        <input type="text" class="search" placeholder="Tìm kiếm bạn bè ..." />
      </div>
      <div class="body">
        <div
          class="item d_flex align_items_center p_2"
          v-for="(item, index) in infoGroupFilter"
          :key="index"
        >
          <div class="left">
            <div class="avatar image" v-if="item.profilePicture === ''">
              {{ item.fullName }}
            </div>
            <div
              class="avatar default"
              v-else
              :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
            ></div>
          </div>
          <div class="right">{{ item.fullName }}</div>
        </div>
      </div>
      <div class="footer d_flex justify_content_end">
        <button class="btn bg_info">Đóng</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoGroupFilter: Object
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.more {
  background-color: rgba(153, 153, 153, 0.4);
  font-family: "Open Sans", sans-serif;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .wrapper {
    width: 440px;
    border-radius: 10px;
    .header {
    }
    .body {
      .item {
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
