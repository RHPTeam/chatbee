<template>
  <div class="footer--mobile" :data-theme="currentTheme">
    <div class="m_auto">
      <ul class="p_0 m_0 d_flex justify_content_center align_items_center">
        <li class="menu--active">
          <icon-base
            icon-name="icon-chat"
            width="24"
            height="24"
            viewBox="0 0 25 25"
          >
            <icon-chat />
          </icon-base>
        </li>
        <li>
          <icon-base
            icon-name="icon-time"
            width="24"
            height="24"
            viewBox="0 0 25 25"
          >
            <icon-time />
          </icon-base>
        </li>
        <li>
          <icon-base
            icon-name="icon-autoreply"
            width="24"
            height="24"
            viewBox="0 0 25 25"
          >
            <icon-auto-reply />
          </icon-base>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconChat from "@/components/icons/IconChat";
import IconTime from "@/components/icons/IconTimer";
import IconAutoReply from "@/components/icons/IconAutoReply";
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconChat,
    IconTime,
    IconAutoReply
  }
};
</script>
<style lang="scss" scoped>
.footer--mobile {
  max-height: 54px;
  ul {
    list-style: none;
    height: 54px;
    li {
      margin-right: 72px;
      padding-top: 2px;
      height: 24px;
      &:last-child {
        margin-right: 0;
      }
    }
    .menu--active {
      color: #ffb94a;
    }
  }
}
//Change Theme
//Light
.footer--mobile[data-theme="light"] {
  // border-top: solid 1px #e4e4e4;
}
//Dark
.footer--mobile[data-theme="dark"] {
  // border-top: solid 1px #444444;
}
</style>
