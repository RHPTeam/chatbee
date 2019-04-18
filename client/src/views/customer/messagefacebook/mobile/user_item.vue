<template>
  <div class="list--user-mobile">
    <transition name="popup">
      <modal-delete
        v-if="ishowModalDelete == true"
        :data-theme="currentTheme"
        :modalDelete="ishowModalDelete"
        :list.sync="list"
        :index="index"
        @closeModal="ishowModalDelete = $event"
      />
    </transition>
    <transition name="popup">
      <message-mobile
        v-if="ishowMessage == true"
        :data-theme="currentTheme"
        :popupMessage="ishowMessage"
        @closeMessage="ishowMessage = $event"
      />
    </transition>
    <div
      class="user"
      :data-theme="currentTheme"
      :class="{ 'not--seen': isnewMessage }"
    >
      <div
        v-if="
          allConversationsAcc === undefined || allConversationsAcc.length === 0
        "
      >
        <div class="conversation--empty px_4 pt_2 text_left">
          Không có cuộc trò chuyện nào
        </div>
      </div>
      <div
        v-else
        class="user--info d_flex justify_content_between align_items_center text_left position_relative"
        :class="{ delete: deleteItem }"
        @touchstart="start"
        @touchend="stop"
        @touchcancel="stop"
        v-for="(conversation, index) in allConversationsAcc"
        :key="index"
        @click.prevent="
          getConversation(conversation._receiver._id, conversation._id)
        "
      >
        <div class="user--send" @click="deleteItem = false">
          <div class="user--send-name">
            {{ conversation._receiver.fullName }}
          </div>
          <div
            class="send--detail d_flex justify_content_start align_items_center"
          >
            <div class="send--detail-message">
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
                    lastestMessage(conversation.contents).typeContent ===
                      'image'
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
                    lastestMessage(conversation.contents).typeContent ===
                      'image'
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
            <div class="send--detail-time text_right">
              {{ showTime(lastestMessage(conversation.contents).timeStamp) }}
            </div>
          </div>
        </div>
        <div class="icon--status"></div>
        <div
          class="icon--delete position_absolute"
          @click.stop="ishowModalDelete = true"
        >
          <icon-base
            icon-name="icon-delete"
            width="36"
            height="36"
            viewBox="0 0 40 40"
          >
            <icon-delete />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageMobile from "./message_mobile";
import ModalDelete from "./delete-message/index";
export default {
  props: ["isNewMessage", "list", "index"],
  data() {
    return {
      ishowMessage: false,
      ishowModalDelete: false,
      interval: false,
      count: 0,
      deleteItem: false,
      isnewMessage: false
    };
  },
  created() {
    this.isnewMessage = this.isNewMessage;
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allConversationsAcc() {
      return this.$store.getters.allConversationsAcc;
    }
  },
  methods: {
    getConversation(recv_id, conv_id) {
      this.ishowMessage = true;
      this.$store.dispatch("receiverFBAccount", recv_id);
      this.$store.dispatch("getCurConversation", conv_id);
    },
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => this.count++, 500);
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = false;
      if (this.deleteItem != true) {
        this.ishowMessage = true;
      }
    },
    showMessage() {
      this.$emit("showMessage", true);
    },
    formatDate(date) {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    },
    lastestMessage(arr) {
      const len = arr.length;
      return arr[len - 1];
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
    },
    removeNewConversation() {
      this.ishowModalDelete = true;
      this.$store.dispatch("createNewConversation", false);
      this.$store.dispatch("removePreviewConversation", false);
    }
  },
  watch: {
    count() {
      if (this.count >= 1) {
        this.deleteItem = true;
        this.ishowMessage = false;
      } else if (this.count == 0) {
        // this.deleteItem = false;
      }
    },
    ishowModalDelete() {
      if (this.ishowModalDelete == false) {
        this.deleteItem = false;
      }
    },
    ishowMessage() {
      this.isnewMessage = false;
    }
  },
  components: {
    ModalDelete,
    MessageMobile
  }
};
</script>

<style scoped lang="scss">
.list--user-mobile {
  overflow-x: hidden;
}
.user {
  transition: all 0.4s ease;
  .user--info {
    cursor: pointer;
    padding: 12px 20px;
    &.delete {
      transform: translateX(-50px);
      .icon--delete {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
    }
  }
  .user--img {
    margin-right: 10px;
  }
  .user--send {
    line-height: normal;
    width: calc(100% - 84px);
    .user--send-name {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .send--detail {
    font-size: 12px;
    .send--detail-message {
      max-width: calc(100% - 55px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .send--detail-time {
      margin-left: 25px;
      width: 30px;
    }
  }

  .icon--status {
    background-color: #ffb94a;
    border-radius: 50%;
    height: 14px;
    margin-left: 20px;
    opacity: 0;
    visibility: hidden;
    width: 14px;
  }
  .icon--delete {
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    right: -34px;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    z-index: 100;
  }
  &.not--seen {
    .user--send-name {
      font-weight: bold;
    }
    .icon--status {
      opacity: 1;
      visibility: visible;
    }
  }
}

/* ChangeColor */
// Light
.user[data-theme="light"] {
  color: #444;
  .send--detail {
    color: #999;
  }
  &.not--seen {
    background-color: #f7f7f7;
    .send--detail {
      color: #444;
    }
  }
}

//Dark
.user[data-theme="dark"] {
  color: #f7f7f7;
  .send--detail {
    color: #ccc;
  }

  &.not--seen {
    background-color: #27292d;
    .send--detail {
      color: #f7f7f7;
    }
  }
}
</style>
