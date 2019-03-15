<template>
  <div
    class="info d_flex justify_content_start align_items_center"
    :data-theme="currentTheme"
  >
    <div class="info-img">
      <img
        src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
        width="50"
        alt="User Avatar"
      />
    </div>
    <div class="info--detail">
      <div class="info--detail-name">Nguyễn Ánh</div>
      <div class="info--detail-status">Trả lời cách đây 10 phút</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.info {
  padding: 20px;
  border-bottom: 1px solid;
  .info--detail {
    line-height: normal;
    margin-left: 15px;
    .info--detail-name {
      font-size: 14px;
    }
    .info--detail-status {
      font-size: 12px;
    }
  }
}
/* ChangeColor */
// Light
.info[data-theme="light"] {
  border-color: #e4e4e4;
  .info--detail-name {
    color: #444;
  }
  .info--detail-status {
    color: #999;
  }
}

//Dark
.info[data-theme="dark"] {
  border-color: #444;
  .info--detail-name {
    color: #f7f7f7;
  }
  .info--detail-status {
    color: #ccc;
  }
}
</style>
