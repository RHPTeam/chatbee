<template>
  <div class="chatarea" :data-theme="currentTheme">
    <div v-if="curConversation.length === 0">
      <div class="none--content text_center">Không có nội dung để hiển thị</div>
    </div>
    <div v-else>
<!--      <div class="user&#45;&#45;never d_flex flex_column pt_2">-->
<!--        <div class="info d_flex flex_row">-->
<!--          <div class="user&#45;&#45;image">-->
<!--            <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681" alt="User avatar">-->
<!--          </div>-->
<!--          <div class="user&#45;&#45;info ml_3">-->
<!--            <h3>Khang Lê</h3>-->
<!--            <p>Bạn bè kích hoạt trên chatbee</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="time d_flex justify_content_center flex_column">-->
<!--          <div class="time&#45;&#45;create">18:55, 13 tháng 3, 2019</div>-->
<!--          <div class="image&#45;&#45;together">-->
<!--            <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681" width="32" height="32" alt="User Receiver avatar">-->
<!--            <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681" width="32" height="32" alt="User Receiver avatar">-->
<!--          </div>-->
<!--          <div class="time&#45;&#45;notice">Hãy gửi lời chào đến Khang nào.</div>-->
<!--        </div>-->
<!--      </div>-->


      <div
        class="chatarea--history"
        v-for="(item, index) in curConversation.contents"
        :key="index"
      >
        <div
          v-if="item != null && item != undefined && item.valueContent != ''"
        >
          <div
            class="receive d_flex justify_content_start align_items_end"
            v-if="item.reference === 1"
          >
            <div class="user--send">
              <img
                :src="curConversation._receiver.profilePicture"
                width="30"
                alt="User Avatar"
              />
            </div>
            <div class="message message--receive">
              <!-- Text -->
              <div class="message--item" v-if="item.typeContent === 'text'">
                {{ item.valueContent }}
              </div>
              <!-- End Text -->

              <!--Start: gallery receive -->
              <div class="receive gallery" v-if="item.typeContent === 'image'">
                <div class="gallery--item">
                  <img :src="item.valueContent" @click="isZoom = !isZoom" />
                </div>
              </div>
              <!--End: gallery receive -->

              <!-- Sticker -->
              <div
                class="receive sticker"
                v-if="item.typeContent === 'sticker'"
              >
                <img :src="item.valueContent" width="100px" />
              </div>
              <!-- End Sticker -->
            </div>
          </div>
          <div
            class="send d_flex justify_content_end align_items_end"
            v-if="item.reference === 2"
          >
            <div class="message message--send">
              <!-- Text -->
              <div class="message--item" v-if="item.typeContent === 'text'">
                {{ item.valueContent }}
              </div>
              <!-- End Text -->

              <!--Start: gallery sender -->
              <div class="sender gallery" v-if="item.typeContent === 'image'">
                <div class="gallery--item">
                  <img :src="item.valueContent" @click="isZoom = !isZoom" />
                </div>
              </div>
              <!--End: gallery sender -->

              <!-- Sticker -->
              <div
                class="receive sticker"
                v-if="item.typeContent === 'sticker'"
              >
                <img :src="item.valueContent" width="100px" />
              </div>
              <!-- End Sticker -->
            </div>
            <div class="user--seen" v-if="!curConversation._sender"></div>
            <div class="user--seen" v-else>
              <img
                :src="curConversation._sender.userInfo.thumbSrc"
                width="15"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </div>
      <!--Start: when click image show gallery it-->
      <zoom :message="curConversation" :isZoom="isZoom" />
      <!--End: when click image show gallery it-->

      <!--      Start: audio when listen new message-->
      <audio ref="audioTone">
        <source :src="audioToneOgg" type="audio/mpeg" />
        <source :src="audioToneMp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <!--      End: audio when listen new message-->
    </div>
  </div>
</template>

<script>
import Zoom from "./chatarea/cp_chat/gallery";

export default {
  props: ["parentRefs"],
  data() {
    return {
      isZoom: false,
      audioToneMp3: require("@/assets/audio/message-active.mp3"),
      audioToneOgg: require("@/assets/audio/message-active.ogg")
    };
  },
  async created() {},
  mounted() {
    this.$nextTick(() => this.scrollToEndChatContent());
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    replyFBAccount() {
      return this.$store.getters.replyFBAccount;
    }
  },
  sockets: {
    async receiveMessage(value) {
      console.log(value)
      let _ = this;
      if (
        this.curConversation._sender === undefined ||
        this.curConversation._receiver === undefined
      ) {
        if (localStorage.getItem("rid")) {
          await this.$store.dispatch(
            "getAllConversationsByAcc",
            localStorage.getItem("rid")
          );
          // Play audio when client listen new message
          console.log(1)
          _.$refs.audioTone.play();
        }
        return;
      }
      console.log(value);

      // Listen receive messages of current conversation
      if (
        value.message._sender._id === this.curConversation._sender._id &&
        value.message._receiver._id === this.curConversation._receiver._id
      ) {
        this.$store.dispatch("updateMessage", value.message);
        // Play audio when client listen new message
        console.log(2)
        _.$refs.audioTone.play();
      }
    }
  },
  updated() {
    this.$nextTick(() => this.scrollToEndChatContent());
  },
  methods: {
    scrollToEndChatContent() {
      // Scroll to bottom of message content
      this.parentRefs.chatContent.scrollTop = 99999999;
    }
  },
  components: {
    Zoom
  }
};
</script>

<style lang="scss" scoped>
@import "./chatarea/style";
</style>
