<template>
  <div class="user--info" :data-theme="currentTheme">
    <div class="user--info-avatar text_center">
      <img
        src="http://123cunghoctin.com/uploads/freecontent/user-flat-icon-png-3.png"
        width="100"
        alt="avatar-user"
      />
    </div>
    <div class="user--info-name">Le Khang</div>
    <span class="user--info-status">Trả lời cách đây 10 phút</span>
  </div>
</template>
<script>
export default {
  props: ["currentTheme"]
};
</script>
<style lang="scss" scoped>
.user--info {
  padding: 16px 0;
  .user--info-name {
    font-size: 24px;
    margin-top: 5px;
    font-weight: 600;
  }
  .user--info-status {
    font-size: 14px;
  }
}
//Change Theme
.user--info[data-theme="light"] {
  .user--info-status {
    color: #999;
  }
}

.user--info[data-theme="dark"] {
  .user--info-status {
    color: #ccc;
  }
}
</style>
