<template>
  <div
    class="topbar text_center d_flex align_items_center justify_content_center position_relative"
    :data-theme="currentTheme"
  >
    <div class="friend">
      <div class="friend--name">Nguyễn Ánh</div>
      <div class="friend--history">Trả lời cách đây 10 phút</div>
    </div>
    <div
      class="toogle--rightsidebar position_absolute"
      @click="toogleSidebar"
      :class="{ deactive: hideChatSidebar }"
    >
      <icon-base
        icon-name="split"
        width="26"
        height="26"
        viewBox="0 0 20.07 20.07"
      >
        <icon-split />
      </icon-base>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconSplit from "@/components/icons/IconSplit";
export default {
  components: {
    IconBase,
    IconSplit
  },
  computed: {
    hideChatSidebar() {
      return this.$store.getters.hideChatSidebar;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      hideSidebar: false
    };
  },
  methods: {
    toogleSidebar() {
      this.hideSidebar = !this.hideSidebar;
      this.$store.dispatch("changeChatSidebar", this.hideSidebar);
    }
  }
};
</script>

<style scoped lang="scss">
.topbar {
  height: 70px;
  border-bottom: 1px solid;
  .friend {
    .friend--name {
      font-size: 14px;
      font-weight: 600;
    }
    .friend--history {
      font-size: 12px;
    }
  }
  .toogle--rightsidebar {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    height: 26px;
    cursor: pointer;
    color: #ffb94a;
    &.deactive {
      color: #999;
    }
  }
}

/* ChangeColor */
// Light
.topbar[data-theme="light"] {
  border-color: #e4e4e4;
  .friend--name {
    color: #444;
  }
  .friend--history {
    color: #999;
  }
}

//Dark
.topbar[data-theme="dark"] {
  border-color: #444;
  .friend--name {
    color: #f7f7f7;
  }
  .friend--history {
    color: #ccc;
  }
}
</style>
