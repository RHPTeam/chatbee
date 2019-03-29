<template>
  <div>
    <div v-if="!allConversationsAcc">
      Bạn chưa kết nối tài khoản facebook hoặc bạn không có bạn bè trên facebook
    </div>
    <!-- <loading-component
      class="text_center"
      v-if="this.$store.getters.friendsStatus === 'loading'"
    /> -->
    <div
      v-else
      class="user d_flex justify_content_between align_items_center"
      :data-theme="currentTheme"
      v-for="(conversation, index) in allConversationsAcc"
      :key="index"
      @click.prevent="getUserReceiver(conversation._receiver._id)"
    >
      <div class="user--img">
        <img :src="conversation._receiver.profilePicture" width="40" alt="User Avatar" />
      </div>
      <div class="user--send">
        <div class="user--send-name">{{ conversation._receiver.fullName }}</div>
        <div class="user--send-message">
          {{ lastestMessage(conversation.contents).valueContent}}
        </div>
      </div>
      <div class="time--send">
        {{ timeFormat(lastestMessage(conversation.contents).timeStamp) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    search: String,
    accountSelectedID: String
  },
  computed: {
    allConversationsAcc() {
      return this.$store.getters.allConversationsAcc;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    filteredUsers() {
      return this.users.filter(user => {
        return user.fullName
          .toLowerCase()
          .includes(this.search.toString().toLowerCase());
      });
    },
    receiverFBAccount() {
      return this.$store.getters.receiverFBAccount;
    },
    users() {
      return this.$store.getters.allFriends;
    }
  },
  methods: {
    getUserReceiver(id) {
      this.$store.dispatch("getFacebookInfo", id);
    },
    lastestMessage(arr) {
      const len = arr.length;
      return arr[len - 1];
    },
    timeFormat(str) {
      const time = new Date(str);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      if (hours > 10) {
        if (minutes > 10) {
          return hours + ':' + minutes;
        }
        else {
          return hours + ':' + '0' + minutes;
        }
      }
      else {
        if (minutes > 10) {
          return '0' + hours + ':' +  minutes;
        }
        else {
          return '0' + hours + ':' + '0' + minutes;
        }
      }
    }
  },
  async created() {
    // Set default reply fb account
    await this.$store.dispatch("getAccountsFB");
    const accountsFBArr = await this.$store.getters.accountsFB;
    await this.$store.dispatch("replyFBAccount", accountsFBArr[0]);
    const replyAccount = await this.$store.getters.replyFBAccount;

    //Set default all conversations
    const replyAccountId = replyAccount._id;
    await this.$store.dispatch("getAllConversationsByAcc", replyAccountId);

    // Set default current conversation
    const allConversationsArr = await this.$store.getters.allConversationsAcc;
    const length = allConversationsArr.length;
    const conversation = allConversationsArr[length - 1];
    const conversationID = conversation._id;
    await this.$store.dispatch("getCurConversation", conversationID);

    //Set default reciever fb account
    if(typeof allConversationsArr === null) {
      const friendsArr = await this.$store.getters.allFriends;
      const receiverFBId = friendsArr[0]._id;
      await this.$store.dispatch("receiverFBAccount", receiverFBId);
    }
    else {
      const fb_id = conversation._receiver._id;
      await this.$store.dispatch("receiverFBAccount", fb_id);
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
    img {
      border-radius: 50%;
    }
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
  border-left: 1px solid #fff;
  .user--send {
    color: #999999;
    .user--send-name {
      color: #444;
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
  border-left: 1px solid #27292d;
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
