<template>
  <div id="app">
    <!--    <app-dragg :works="data" />-->
    <!--    <zoom/>-->
    <form @submit.prevent="sendMessage" enctype="multipart/form-data">
      <div class="c mx_auto">
        <div class="r">
          <div class="c_4">
            <ul>
              <li
                style="cursor: pointer"
                v-for="(friend, index) in listFriends"
                :key="index"
                @click="getConver(friend._id)"
              >
                {{ friend._receiver.fullName }}
              </li>
            </ul>
          </div>
          <div class="c_8">
            <div class="" v-for="message in conver.contents">
              <div
                class="d_flex justify_content_start"
                v-if="message.reference === 1"
              >
                <span>{{ message.valueContent }}</span>
              </div>
              <div
                class="d_flex justify_content_end"
                v-if="message.reference === 2"
              >
                <span>{{ message.valueContent }}</span>
              </div>
            </div>
            <div class="d_flex">
              <input type="text" class="form_control" v-model="message" />
              <button type="submit" class="btn btn_success">Send</button>
            </div>
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
      message: ""
    };
  },
  computed: {
    conver() {
      return this.$store.getters.curConversation;
    },
    listFriends() {
      return this.$store.getters.allConversationsAcc;
    }
  },
  async created() {
    console.log("Created from test!")
    await this.$store.dispatch(
      "getAllConversationsByAcc",
      "5ca2c75f69e01621137907ae"
    );
  },
  sockets: {
    receiveMessage(value) {
      this.$store.dispatch("pushMessage", value.message);
    }
  },
  methods: {
    getConver(id) {
      this.$store.dispatch("getCurConversation", id);
    },
    sendMessage() {
      let _ = this;
      const objectSender = {
        message: this.message,
        type: "text",
        _account: this.conver._account,
        _sender: this.conver._sender._id,
        _receiver: this.conver._receiver._id
      };

      this.$socket.emit("sendMessage", objectSender, function(cb) {
        let newData = cb;
        _.$store.dispatch("pushMessage", newData.data);
      });
      this.message = "";
    }
  }
};
</script>
