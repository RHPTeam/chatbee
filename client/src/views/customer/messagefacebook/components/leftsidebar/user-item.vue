<template>
  <div class="user d_flex justify_content_between align_items_center" :data-theme="currentTheme">
    <div class="user--img">
      <img
        src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
        width="50"
        alt="User Avatar"
      />
    </div>
    <div class="user--send">
      <div class="user--send-name">Nguyễn Huyền</div>
      <div class="user--send-message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
        ullamcorper mi. Donec suscipit sem vel faucibus maximus. Quisque in elit
        arcu. Ut eu justo diam.
      </div>
    </div>
    <div class="time--send">10:28</div>
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
.user {
  padding: 8px 20px;
  cursor: pointer;
  .user--img {
    margin-right: 12px;
  }
  .user--send {
    width: calc(100% - 120px);
    margin-right: 28px;
    line-height: normal;
    .user--send-name {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .user--send-message {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .time--send {
    font-size: 12px;
    width: 30px;
  }
  &.not--seen {
    .user--send-name {
      font-weight: 600;
    }
   
  }
}

/* ChangeColor */
// Light
.user[data-theme="light"] {
  .user--send {
    color: #999999;
    .user--send-name {
      color: #444
    }
  }
  &.select,
  &:hover {
    background-color: #f7f7f7;
  }
  &.not--seen {
    .user--send-message {
      color: #444;
    }
  }
}

//Dark
.user[data-theme="dark"] {
  .user--send {
    color: #ccc;
    .user--send-name {
      color: #f7f7f7;
    }
  }
  &.select,
  &:hover {
    background-color: #2f3136;
  }
  &.not--seen {
    .user--send-message {
      color: #f7f7f7;
    }
  }
}


/* Responsive */

// Extra large devices (large desktops, 1200px and up)
@media (max-width: 1025px) {
  .user {
    .user--send {
      display: none;
    }
    .user--img {
      margin-right: 0px;
    }
    .time--send {
      display: none;
    }
  }
}
</style>
