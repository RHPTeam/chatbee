<template>
  <div>
    <!--      Start: New message when choose user never chat-->
    <div
      class="user new d_flex align_items_center justify_content_between"
      v-if="isNewConversation === true"
    >
      <div class="user--img">
        <img :src="defaultImage" width="40" height="40" alt="User Avatar" />
      </div>
      <div class="user--send">
        <div class="user--send-name">
          <b>Tin nhắn mới {{ friendChoice.length > 0 ? `đến ${friendChoice}` : '' }}</b>
        </div>
      </div>
      <div class="close" @click="removeNewConversation">
        <icon-base>
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <!--      Start: New message when choose user never chat-->
    <div
      v-if="
        allConversationsAcc === undefined || allConversationsAcc.length === 0
      "
    >
      <div class="conversation--empty px_4 pt_2 text_left">
        Không có cuộc trò chuyện nào
      </div>
    </div>
    <div v-else>
      <div
        class="user d_flex justify_content_between align_items_center"
        :data-theme="currentTheme"
        v-for="(conversation, index) in allConversationsAcc"
        :key="index"
        @click.prevent="
          getConversation(conversation._receiver._id, conversation._id)
        "
        :class="[
          receiverFBAccount === undefined ||
          conversation._receiver._id === receiverFBAccount._id
            ? 'active'
            : ''
        ]"
      >
        <div class="user--img">
          <img
            :src="conversation._receiver.profilePicture"
            width="40"
            alt="User Avatar"
          />
        </div>
        <div class="user--send">
          <div class="user--send-name">
            {{ conversation._receiver.fullName }}
          </div>
          <div class="user--send-message">
            <div v-if="lastestMessage(conversation.contents).reference === 1">
              <div
                v-if="
                  lastestMessage(conversation.contents).typeContent === 'text'
                "
              >
                {{
                  conversation._receiver.firstName +
                    ": " +
                    lastestMessage(conversation.contents).valueContent
                }}
              </div>
              <div
                v-if="
                  lastestMessage(conversation.contents).typeContent === 'image'
                "
              >
                {{ conversation._receiver.firstName + " đã gửi 1 ảnh" }}
              </div>
              <div
                v-if="
                  lastestMessage(conversation.contents).typeContent ===
                    'sticker'
                "
              >
                <span>{{
                  conversation._receiver.firstName + " đã gửi một nhãn dán"
                }}</span>
              </div>
            </div>
            <div v-if="lastestMessage(conversation.contents).reference === 2">
              <div
                v-if="
                  lastestMessage(conversation.contents).typeContent === 'text'
                "
              >
                {{
                  "Bạn" +
                    ": " +
                    lastestMessage(conversation.contents).valueContent
                }}
              </div>
              <div
                v-if="
                  lastestMessage(conversation.contents).typeContent === 'image'
                "
              >
                Bạn đã gửi một ảnh
              </div>
              <div
                v-if="
                  lastestMessage(conversation.contents).typeContent ===
                    'sticker'
                "
              >
                <span>Bạn đã gửi một nhãn dán</span>
              </div>
            </div>
          </div>
        </div>
        <div class="time--send">
          {{ showTime(lastestMessage(conversation.contents).timeStamp) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    search: String,
    accountSelectedID: String,
    friendChoice: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultImage: require("@/assets/images/message/default-facebook.jpg")
    };
  },
  async created() {
    if (localStorage.getItem("rid")) {
      await this.$store.dispatch(
        "getAllConversationsByAcc",
        localStorage.getItem("rid")
      );
    }
  },
  computed: {
    allConversationsAcc() {
      return this.$store.getters.allConversationsAcc;
    },
    curConversation() {
      return this.$store.getters.curConversation;
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
    },
    isNewConversation() {
      return this.$store.getters.isNewConversation;
    }
  },
  methods: {
    formatDate(date) {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    },
    getConversation(recv_id, conv_id) {
      this.$store.dispatch("receiverFBAccount", recv_id);
      this.$store.dispatch("getCurConversation", conv_id);
    },
    lastestMessage(arr) {
      const len = arr.length;
      return arr[len - 1];
    },
    removeNewConversation() {
      this.$store.dispatch("createNewConversation", false);
    },
    showTime(str) {
      // Input Time
      const dateTime = new Date(str);
      const date = this.formatDate(dateTime);
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");

      //Today
      const today = this.formatDate(new Date());

      //Five Days Ago
      var fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      fiveDaysAgo = this.formatDate(fiveDaysAgo);

      if (date === today) {
        return hours + ":" + minutes;
      } else return date;
    }
  }
};
</script>

<style scoped lang="scss">
.conversation--empty {
  color: #999;
  font-size: 13px;
}
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
    width: calc(100% - 100px);
    margin-right: 16px;
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
  &.new {
    &:hover .close svg {
      opacity: 1;
      visibility: visible;
    }
    .close svg {
      transition: 0.3s ease-in;
      opacity: 0;
      visibility: hidden;
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
.active[data-theme="light"] {
  background-color: #f7f7f7;
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
.active[data-theme="dark"] {
  background-color: #2f3136;
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
