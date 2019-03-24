<template>
  <div
    class="topbar text_center d_flex align_items_center justify_content_center position_relative"
    :data-theme="currentTheme"
  >
    <div class="friend">
      <div class="friend--name">{{ facebookInfo.fullName }}</div>
      <div class="friend--history">
        <span
          @click="isSelectAccount = !isSelectAccount"
          v-click-outside="closeAccount"
          class="position_relative"
          >Trả lời với tư cách là Trần Toản
          <icon-base
            class="icon--dropdown"
            icon-name="dropdown"
            width="14"
            height="14"
            viewBox="0 20 300 400"
          >
            <icon-drop-down />
          </icon-base>
          <div class="dp" v-if="isSelectAccount === true">
            <div
              class="dp--item d_flex justify_content_between"
              v-for="(account, index) in accountFacebooklist"
              :key="index"
            >
              <span>{{ account.userInfo.name }}</span>
              <icon-base
                class="icon--dropdown"
                icon-name="dropdown"
                width="16"
                height="16"
                viewBox="0 20 500 400"
              >
                <icon-check />
              </icon-base>
            </div>
          </div>
        </span>
      </div>
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
  import FriendsFacebookService from "@/services/modules/friendsFacebook.service";
export default {
  data() {
    return {
      isSelectAccount: false,
      hideSidebar: false
    };
  },
  computed: {
    hideChatSidebar() {
      return this.$store.getters.hideChatSidebar;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    facebookInfo() {
      return this.$store.getters.facebookInfo;
    },
    accountFacebooklist() {
      return this.$store.getters.accountsFB;
    }
  },
  async created() {
    const facebookInfo = await FriendsFacebookService.index();
    const facebookInfoId = facebookInfo.data.data[0]._id;
    this.$store.dispatch("getFacebookInfo", facebookInfoId);
  },
  methods: {
    closeAccount() {
      this.isSelectAccount = false;
    },
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

.friend--history {
  cursor: pointer;
  .dp {
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 16px 40px 0 rgba(0, 0, 0, 0.08);
    position: absolute;
    text-align: left;
    top: 1.5rem;
    width: 150px;
    z-index: 99;
    &--item {
      border-bottom: 1px solid #f2f1f1;
      cursor: pointer;
      font-weight: 700;
      padding: 0.75rem 1.25rem;
      transition: 0.125s ease-in;
      &:last-child {
        border-bottom: 0;
      }
      &:hover,
      &:active,
      &:focus {
        background-color: #ffb94a;
        color: #ffffff;
      }
      svg {
        color: #5fcf80;
        fill: #5fcf80;
      }
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
