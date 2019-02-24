<template>
  <div class="footer--mobile position_fixed" :data-theme="currentTheme">
    <div class="m_auto">
      <ul class="p_0 m_0">
        <li>
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
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f7f7f7;
  ul {
    list-style: none;
    li {
      display: inline-block;
      padding: 12px 0;
      &:nth-child(2) {
        margin: 0 72px;
      }
    }
  }
}
//Change Theme
//Light
.footer--mobile[data-theme="light"] {
  background: #f7f7f7;
}
//Dark
.footer--mobile[data-theme="dark"] {
  background: #2f3136;
}
</style>
