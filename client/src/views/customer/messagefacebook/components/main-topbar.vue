<template>
  <div
    class="topbar text_center d_flex align_items_center justify_content_center position_relative"
    :data-theme="currentTheme"
  >
    <div class="friend">
      <div class="friend--name">{{ receiverFBAccount.fullName }}</div>
      <div class="friend--history">
        <span
          @click="isSelectAccount = !isSelectAccount"
          v-click-outside="closeAccount"
          class="position_relative"
          >Trả lời với tư cách là 
            <span v-if="replyFBAccount === undefined || replyFBAccount.userInfo === undefined">
            </span>
            <span v-else>
              {{ replyFBAccount.userInfo.name }}
            </span>
          <icon-base
            class="icon--dropdown"
            icon-name="dropdown"
            width="12"
            height="12"
            viewBox="0 20 300 400"
          >
            <icon-drop-down />
          </icon-base>
          <div class="dp" v-if="isSelectAccount === true">
            <div
              class="dp--item d_flex justify_content_between"
              v-for="(account, index) in accountFacebooklist"
              :key="index"
              @click.prevent="chooseReplyAccount(account)"
            >
              <span>{{ account.userInfo.name }}</span>
              <icon-base
                v-if="account.userInfo.id == replyFBAccount.userInfo.id"
                class="icon--check"
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
export default {
  data() {
    return {
      isSelectAccount: false,
      hideSidebar: false,
      chooseAccountReply: false,
    };
  },
  computed: {
    accountFacebooklist() {
      return this.$store.getters.accountsFB;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    hideChatSidebar() {
      return this.$store.getters.hideChatSidebar;
    },
    receiverFBAccount() {
      return this.$store.getters.receiverFBAccount;
    },
    replyFBAccount() {
      return this.$store.getters.replyFBAccount;
    }
  },
  async created() {
  },
  methods: {
    chooseReplyAccount(acc) {
      this.$store.dispatch("replyFBAccount", acc);
    },
    closeAccount() {
      this.isSelectAccount = false;
    },
    toogleSidebar() {
      this.hideSidebar = !this.hideSidebar;
      this.$store.dispatch("changeChatSidebar", this.hideSidebar);
    },
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
      font-size: 13px;
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
    border-radius: 0.5rem;
    border: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    position: absolute;
    text-align: left;
    top: 1.5rem;
    width: 100%;
    z-index: 99;
    &--item {
      cursor: pointer;
      font-weight: normal;
      font-size: 14px;
      padding: 0.5rem 1rem;
      transition: 0.125s ease-in;
      &:first-child {
        &:hover {
          border-radius:.5rem .5rem 0 0;
        }
      }
      &:last-child {
        border-bottom: 0;
        &:hover {
          border-radius: 0 0 .5rem .5rem;
        }
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
    .icon--dropdown {
      color: #ccc;
    }
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
    .icon--dropdown {
      color: #999;
    }
  }
}
</style>
