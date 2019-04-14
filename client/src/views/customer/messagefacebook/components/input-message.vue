<template>
  <div class="add--new" :data-theme="currentTheme">
    <form @submit.prevent="sendMessage">
      <div class="input-wrap d_flex justify_content_start align_items_end">
        <div class="add--text">
          <contenteditable
            placeholder="Nhập tin nhắn"
            tag="div"
            :contenteditable="true"
            v-model="messageTxt"
            @keydown="inputHandleMessage"
          />
        </div>
        <div
          class="add--icon text_right ic--image"
          @click.prevent="$refs.imageFile.click()"
        >
          <icon-base
            icon-name="image"
            width="26"
            height="26"
            viewBox="0 0 24 24"
          >
            <icon-image />
          </icon-base>
        </div>
        <div class="add--icon text_right ic--smile">
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
    <form
      id="formUploadImage"
      enctype="multipart/form-data"
      @submit.prevent="sendImage"
    >
      <input
        class="d_none"
        type="file"
        accept="image/*"
        ref="imageFile"
        @change="chooseImage"
      />
    </form>
  </div>
</template>

<script>
import MessageService from "@/services/modules/message.service";
export default {
  components: {},
  data() {
    return {
      messageTxt: "",
      fileImageUpload: ""
    };
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
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    inputHandleMessage(e) {
      if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        this.sendMessage();
      }
    },
    sendMessage() {
      this.$store.dispatch("removeInfoReceiverFirstTime");
      this.$store.dispatch("removeNewConversation");
      this.$emit("updateFriendNewConversation", "");

      let _ = this;
      const objectSender = {
        message: this.messageTxt,
        type: "text",
        _account: this.userInfo._id,
        _sender: localStorage.getItem("rid"),
        _receiver: this.receiverFBAccount._id
      };

      const objectContent = {
        reference: 2,
        timeStamp: new Date(),
        typeContent: "text",
        valueContent: this.messageTxt
      };

      // Check content message not null
      if (this.messageTxt !== "") {
        this.$store.dispatch("pushPreviewMessage", objectContent);
        console.log(objectSender)
        this.$socket.emit("sendMessage", objectSender, function(cb) {
          let newData = cb;
          _.$store.dispatch("updateMessage", newData.data);
        });
      }

      this.messageTxt = "";
    },
    chooseImage() {
      this.fileImageUpload = this.$refs.imageFile.files[0];
      this.sendImage();
    },
    async sendImage() {
      let _ = this;

      const formImageData = new FormData();
      formImageData.append("file", this.fileImageUpload);

      const resultUploadImage = await MessageService.uploadImage(formImageData);

      const objectSender = {
        message: resultUploadImage.data.data,
        type: "image",
        _account: this.userInfo._id,
        _sender: localStorage.getItem("rid"),
        _receiver: this.receiverFBAccount._id
      };

      const objectContent = {
        reference: 2,
        timeStamp: new Date(),
        typeContent: "image",
        valueContent: URL.createObjectURL(this.fileImageUpload)
      };

      this.$store.dispatch("pushPreviewMessage", objectContent);
      this.$socket.emit("sendMessage", objectSender, function(cb) {
        let newData = cb;
        _.$store.dispatch("updateMessage", newData.data);
      });
    }
  },
  async created() {}
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
  .ic--image {
    svg {
      vertical-align: middle;
    }
  }
  .ic--smile {
    svg {
      vertical-align: text-bottom;
    }
  }
}

/* ChangeColor */
// Light
.add--new[data-theme="light"] {
  color: #999;
  border-top: 1px solid #f7f7f7;
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
