<template>
  <div class="add--new" :data-theme="currentTheme">
    <form @submit.prevent="sendMessage">
      <div class="input-wrap d_flex justify_content_start align_items_end">
        <div class="add--text">
          <!--<textarea-->
          <!--id="contentMessageField"-->
          <!--placeholder="Nhập tin nhắn"-->
          <!--&gt;</textarea>-->
          <input
            id="contentMessageField"
            placeholder="Nhập tin nhắn"
            autocomplete="off"
            @keyup.enter="sendMess()"
            v-model="messageTxt"
          >
        </div>
        <div class="add--icon text_right">
          <icon-base
            icon-name="image"
            width="26"
            height="26"
            viewBox="0 0 26 26"
          >
            <icon-image />
          </icon-base>
        </div>
        <div class="add--icon text_right">
          <icon-base
            icon-name="smile"
            width="26"
            height="26"
            viewBox="0 0 26 26"
          >
            <icon-smile />
          </icon-base>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";
import MessageService from "@/services/modules/message.service";
export default {
  components: {
  },
  data() {
    return {
      messageTxt: '',
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    replyFBAccount() {
      return this.$store.getters.replyFBAccount;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    },
    receiverFBAccount() {
      return this.$store.getters.receiverFBAccount;
    },
  },
  methods: {
    async sendMess() {
      const data = {
        content: this.messageTxt,
        id: this.receiverFBAccount._id
      }
      console.log(this.messageTxt);

      const socket = io.connect('http://localhost:8888', {reconnect: true});
      socket.emit('send', data);
      this.messageTxt = '';
      const messageID = this.curConversation._id;
      await this.$store.dispatch("getCurConversation", messageID);

      socket.on('listen-send', data => {console.log(data)});
      await this.$store.dispatch("getCurConversation", messageID);
    },

  },
  async created() {
    // // Set default reply fb account
    // const accountsFBArr = await this.$store.getters.accountsFB;
    // await this.$store.dispatch("replyFBAccount", accountsFBArr[0]);

    // const replyAccount = await this.$store.getters.replyFBAccount;
    // const fb_id = replyAccount._id;
    // MessageService.create(fb_id);
  }
};
</script>

<style scoped lang="scss">
.add--new {
  padding: 15px 20px;
  .add--text {
    width: calc(100% - 80px);
    input {
      background-color: transparent;
      border: 0;
      color: #444;
      &:focus,
      &:active {
        outline: 0;
      }

    }
  }
  .add--icon {
    width: 40px;
    svg {
      cursor: pointer;
    }
  }
  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #999;
    display: block; /* For Firefox */
  }
  div[contenteditable="true"] {
    width: 100%;
    border-radius: 10px;
    border: 0;
    margin-bottom: -6px;
    outline: 0;
    padding: 10px 15px;
  }
}

/* ChangeColor */
// Light
.add--new[data-theme="light"] {
  color: #999;
  .add--text {
    input {
      color: #444;
    }
  }
  div[contenteditable="true"] {
    background-color: #f7f7f7;
  }
}

//Dark
.add--new[data-theme="dark"] {
  color: #ccc;
  .add--text {
    input {
      color: #f7f7f7;
    }
  }
  div[contenteditable="true"] {
    background-color: #2f3136;
  }
}
</style>
