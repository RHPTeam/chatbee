<template>
  <div>
    <!--    Start: Input search -->
    <div
      v-if="isNewConversation === true"
      class="topbar new d_flex align_items_center position_relative p_3"
      :data-theme="currentTheme"
    >
      <span class="mr_2">Đến:</span>
      <span class="input--user-choice mr_2">{{
        cbFriendChoice.length > 0
          ? friendChoice
          : (friendChoice = cbFriendChoice)
      }}</span>
      <div class="input--search-user">
        <input
          type="text"
          placeholder="Nhập tên của một người..."
          v-model="search"
          @keyup.delete="removeUserNewConversation"
        />
        <div class="results ab" v-show="isResultSearch === true">
          <vue-perfect-scrollbar>
            <ul>
              <li class="d_flex" v-if="filteredFriends.length === 0">
                <span>Không có bạn bè nào phù hợp.</span>
              </li>
              <li
                class="d_flex align_items_center py_1"
                v-for="(friend, index) in filteredFriends"
                :key="`f-${index}`"
                @click.prevent="choiceUserForNewConversation(friend)"
              >
                <img
                  :src="friend.profilePicture"
                  width="40"
                  height="40"
                  alt="User avatar"
                />
                <span class="ml_2">{{ friend.fullName }}</span>
              </li>
            </ul>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
    <!--    End: Input search-->

    <!--    Start: Header user when conversation active-->
    <div
      v-else-if="isNewConversation === false"
      class="topbar text_center d_flex align_items_center justify_content_center position_relative"
      :data-theme="currentTheme"
    >
      <div class="friend">
        <div class="friend--name">{{ receiverFBAccount.fullName }}</div>
        <div class="friend--history">
          <span
            class="position_relative"
            >Trả lời với tư cách là <b>{{ curConversation._sender.userInfo.name }} </b>
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
    <!--    End: Header user when conversation active-->
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: {
    cbFriendChoice: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chooseAccountReply: false,
      hideSidebar: false,
      isSelectAccount: false,
      search: "",
      isResultSearch: false,
      friendChoice: ""
    };
  },
  computed: {
    allConversationsAcc() {
      return this.$store.getters.allConversationsAcc;
    },
    accountFacebooklist() {
      return this.$store.getters.accountsFB;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    filteredFriends() {
      if (this.friends === undefined) return false;
      if (this.search === "") {
        return this.friends;
      } else {
        return this.friends.filter(friend => {
          return friend.fullName
            .toString()
            .toLowerCase()
            .includes(this.search.toString().toLowerCase());
        });
      }
    },
    friends() {
      return this.$store.getters.allFriends;
    },
    hideChatSidebar() {
      return this.$store.getters.hideChatSidebar;
    },
    isNewConversation() {
      return this.$store.getters.isNewConversation;
    },
    receiverFBAccount() {
      return this.$store.getters.receiverFBAccount;
    },
    replyFBAccount() {
      return this.$store.getters.replyFBAccount;
    }
  },
  async created() {},
  methods: {
    async chooseReplyAccount(acc) {
      window.localStorage.setItem("rid", acc._id);
      await this.$store.dispatch("replyFBAccount", acc);

      //Update list of conversation
      const accID = acc._id;
      await this.$store.dispatch("getAllConversationsByAcc", accID);

      //Update current conversation
      const allConves = await this.$store.getters.allConversationsAcc;
      if (allConves.length === 0) {
        await this.$store.dispatch("emptyCurConversation");
      } else {
        const recvID = this.receiverFBAccount._id;
        allConves.forEach(item => {
          if (item._receiver._id === recvID) {
            console.log(item._id);
            this.$store.dispatch("getCurConversation", item._id);
          }
        });
      }
    },
    choiceUserForNewConversation(user) {
      this.friendChoice = `${user.fullName},`;
      this.$emit("updateFriendNewConversation", user.fullName);
      this.getConversation(user);
      this.search = "";
    },
    closeAccount() {
      this.isSelectAccount = false;
    },
    async getConversation(user) {
      let isConversation = false;
      await this.allConversationsAcc.forEach(item => {
        if (item._receiver._id === user._id) {
          this.$store.dispatch("getCurConversation", item._id);
          this.$store.dispatch("receiverFBAccount", user._id);
          isConversation = true;
          return false;
        }
      });
      if (isConversation === false) {
        this.$store.dispatch("pushPreviewConversation");
        this.$store.dispatch("pushInfoReceiverFirstTime", user);
        this.$store.dispatch("receiverFBAccount", user._id);
      }
    },
    removeUserNewConversation() {
      if (this.search.length === 0) {
        this.friendChoice = "";
        this.$emit("updateFriendNewConversation", "");
        this.$store.dispatch("removeInfoReceiverFirstTime");
      }
    },
    toogleSidebar() {
      this.hideSidebar = !this.hideSidebar;
      this.$store.dispatch("changeChatSidebar", this.hideSidebar);
    }
  },
  watch: {
    search(value) {
      if (value.length > 0) {
        this.isResultSearch = true;
      } else {
        this.isResultSearch = false;
      }
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style scoped lang="scss">
.topbar {
  height: 70px;
  border-bottom: 1px solid;
  &.new {
    border-bottom-color: #e4e4e4;
  }
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
    border-radius: 0.5rem;
    border: 0;
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
          border-radius: 0.5rem 0.5rem 0 0;
        }
      }
      &:last-child {
        border-bottom: 0;
        &:hover {
          border-radius: 0 0 0.5rem 0.5rem;
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

.input--user-choice {
  color: #ffb94a;
}

.input--search-user {
  height: 100%;
  input {
    border: none;
    height: 100%;
    outline: none;
    min-width: 200px;
  }
}

.topbar.new {
  .results {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    padding: 0.75rem 0;
    width: 320px;
    &.ab {
      position: absolute;
      top: 60px;
      z-index: 99;
    }
    ul,
    ol {
      margin: 0;
      padding: 0;
      max-height: 300px;
      list-style: none;
    }
    ul > li {
      cursor: pointer;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    ul > li:hover {
      background-color: #f7f7f7;
    }
    img {
      border-radius: 50%;
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
    .dp {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
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
    .dp {
      background-color: #27292d;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    .icon--dropdown {
      color: #999;
    }
  }

  .input--search-user {
    input {
      background-color: #27292d;
      color: #ccc;
    }
  }

  .results {
    background-color: #27292d;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    ul > li:hover {
      background-color: #ffb94a;
      color: #ffff;
    }
    img {
      border-radius: 50%;
    }
  }
}
</style>
