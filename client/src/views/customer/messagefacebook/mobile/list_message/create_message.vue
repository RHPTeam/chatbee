<template>
  <div class="message--footer">
    <form class="d_flex align_items_center justify_content_between">
      <!--Icons options-->
      <div class="icons--left d_flex align_items_top justify_content_start">
        <div
          :class="isShowIconNext === true ? 'd_block' : 'd_none'"
          @click="changeDefault"
        >
          <div class="icon icon-change-account">
            <icon-base
              icon-name="icon-change-account"
              width="28"
              height="23"
              viewBox="0 0 125 125"
            >
              <icon-next />
            </icon-base>
          </div>
        </div>
        <div :class="isShowIconOptionMessage === true ? 'd_flex' : 'd_none'">
          <div class="icon icon-change-account">
            <icon-base
              icon-name="icon-grid"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-grid />
            </icon-base>
          </div>
          <div class="icon icon-camera">
            <icon-base
              icon-name="icon-camera"
              width="24"
              height="24"
              viewBox="0 0 24 26"
            >
              <icon-camera />
            </icon-base>
          </div>
          <div class="icon icon-image">
            <icon-base
              icon-name="icon-image"
              width="21"
              height="21"
              viewBox="0 0 21 21"
            >
              <icon-image />
            </icon-base>
          </div>
        </div>
      </div>
      <!--Input create message-->
      <div class="input--message">
        <div class="form_group m_0">
          <input
            @click="changeIconOption"
            type="text"
            placeholder="Aa"
            class="form_control"
            v-model="messageTxt"
          />
        </div>
      </div>
      <!--Icon smile and send when focus-->
      <div class="icon--right">
        <div class="icon--smile" v-if="isShowIconEmoji === true">
          <div class="icons">
            <icon-base
              icon-name="icon-smile"
              width="24"
              height="24"
              viewBox="0 0 26 26"
            >
              <icon-smile />
            </icon-base>
          </div>
        </div>
        <div
          class="icon--send ml_2"
          v-if="isShowIconSendMessage === true"
          @click="sendMessage"
        >
          <div class="icons">
            <icon-base
              icon-name="icon-send"
              width="24"
              height="24"
              viewBox="0 0 540 540"
            >
              <icon-send />
            </icon-base>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowIconSendMessage: false,
      isShowIconEmoji: true,
      isShowIconNext: false,
      isShowIconOptionMessage: true,
      messageTxt: ""
    };
  },
  computed: {
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
    changeIconOption() {
        console.log("nothing");
      this.isShowIconOptionMessage = false;
      this.isShowIconNext = true;
    },
    changeDefault() {
      this.isShowIconOptionMessage = true;
      this.isShowIconNext = false;
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
        console.log(objectSender);
        this.$socket.emit("sendMessage", objectSender, function(cb) {
          let newData = cb;
          _.$store.dispatch("updateMessage", newData.data);
        });
      }

      this.messageTxt = "";
    }
  },
  watch: {
    messageTxt(value) {
      if (value.length >= 1) {
        this.isShowIconEmoji = false;
        this.isShowIconSendMessage = true;
      } else {
        this.isShowIconEmoji = true;
        this.isShowIconSendMessage = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "message_mobile.style";
</style>
