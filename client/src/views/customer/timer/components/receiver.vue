<template>
  <div class="receiver text_left" :data-theme="currentTheme">
    <div class="receiver--desc">Người nhận</div>
    <div class="d_flex justify_content_between align_items_center">
      <div class="receiver--content">
        <span class="receiver--content-null">Không có người nhận nào</span>
      </div>
      <div class="receiver--add">
        <icon-base icon-name="add-user" width="26" height="26" viewBox="0 0 26 26">
          <icon-add-user/>
        </icon-base>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconAddUser from "@/components/icons/IconAddUser";
export default {
  components: {
    IconBase,
    IconAddUser
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.receiver {
  border-radius: 10px;
  border: 0;
  padding: 24px;
  margin-bottom: 18px;
  .receiver--desc {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 13px;
  }
  .receiver--content {
    min-height: 32px;
    .receiver--content-null {
      font-size: 14px;
    }
  }
  .receiver--add {
    height: 26px;
    width: 26px;
    cursor: pointer;
    svg {
      transition: all 0.4s ease;
    }
    &:hover {
      svg {
        color: #ffb94a;
      }
    }
  }
}

/* ChangeColor */
// Light
.receiver[data-theme="light"] {
  color: #444;
  background-color: #ffffff;
  .receiver--add,
  .receiver--content {
    color: #999;
  }
}

//Dark
.receiver[data-theme="dark"] {
  color: #f7f7f7;
  background-color: #27292d;
  .receiver--add,
  .receiver--content {
    color: #ccc;
  }
}
</style>