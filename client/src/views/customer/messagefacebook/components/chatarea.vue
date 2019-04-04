<template>
  <div class="chatarea" :data-theme="currentTheme">
    <div v-if="curConversation.length === 0">
      <div class="none--content text_center">Không có nội dung để hiển thị</div>
    </div>
    <div v-else>
      <div v-if="curConversation.contents === ''">
        Nhập tin nhắn gửi đến bạn bè để bắt đầu cuộc trò chuyện ...
      </div>
      <div
        v-else
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
    receiveMessage(value) {
      this.scrollToEndChatContent();
      // Play audio when client lesten new message
      this.$refs.audioTone.play();

      // Listen receive messages of current conversation
      if (
        value.message._sender._id === this.curConversation._sender._id &&
        value.message._receiver._id === this.curConversation._receiver._id
      ) {
        this.$store.dispatch("updateMessage", value.message);
      }
    }
  },
  updated() {
    this.$nextTick(() => this.scrollToEndChatContent());
  },
  methods: {
    scrollToEndChatContent() {
      console.log(this.parentRefs);
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
