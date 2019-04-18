<template>
  <div class="message position_fixed">
    <div
      class="message--header d_flex align_items_center justify_content_between"
    >
      <div
        class="message--header-left d_flex align_items_center justify_content_start"
      >
        <div
          class="back--list d_flex align_items_center justify_content_start"
          @click="closeMessage"
        >
          <div class="message--number text_center ml_4">9</div>
        </div>
        <div class="user--info d_flex align_items_center">
          <div class="user--avatar">
            <img
              :src="curConversation._receiver.profilePicture"
              width="30"
              alt="User Avatar"
            />
          </div>
          <div class="user--profile text_left">
            <div class="user--profile-name">
              {{ curConversation._receiver.fullName }}
            </div>
            <span class="user--profile-status">Facebook</span>
          </div>
        </div>
      </div>
      <div class="message--info" @click="isShowInfo = true">
        <icon-base
          icon-name="icon-info"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <icon-info />
        </icon-base>
      </div>
    </div>
    <VuePerfectScrollbar class="message--content">
      <div v-if="curConversation.length === 0">
        <div class="none--content text_center">
          Không có nội dung để hiển thị
        </div>
      </div>
      <div v-else>
        <div
          class="user--never d_flex flex_column pt_2"
          v-if="isFirstTime === true"
        >
          <div class="info d_flex flex_row">
            <div class="user--image">
              <img
                :src="infoReceiverFirstTime.profilePicture"
                alt="User avatar"
              />
            </div>
            <div class="user--info ml_3">
              <h3>{{ infoReceiverFirstTime.fullName }}</h3>
              <p>Bạn bè kích hoạt trên chatbee</p>
            </div>
          </div>
          <div class="time d_flex justify_content_center flex_column">
            <div class="time--create">
              {{ infoReceiverFirstTime.created_at | formatDateTime }}
            </div>
            <div class="image--together">
              <img
                :src="infoReceiverFirstTime.profilePicture"
                width="32"
                height="32"
                alt="User Receiver avatar"
              />
              <img
                :src="infoActiveFacebook.userInfo.thumbSrc"
                width="32"
                height="32"
                alt="User Receiver avatar"
              />
            </div>
            <div class="time--notice">
              Hãy gửi lời chào đến {{ infoReceiverFirstTime.firstName }} nào.
            </div>
          </div>
        </div>
        <div
          class="show--message d_flex flex_column"
          v-for="(item, index) in curConversation.contents"
          :key="index"
        >
          <div
            v-if="
              item !== null && item !== undefined && item.valueContent !== ''
            "
          >
            <div
              class="message--user-1 text_left d_flex align_items_end"
              v-if="item.reference === 1"
            >
              <div class="avatar-chat">
                <img
                  :src="curConversation._receiver.profilePicture"
                  width="30"
                  alt="User Avatar"
                />
              </div>
              <div class="user--message d_flex flex_column">
                <div
                  class="item user--message-1"
                  v-if="item.typeContent === 'text'"
                >
                  {{ item.valueContent }}
                </div>
                <!--Start: gallery receive -->
                <div
                  class="receive gallery"
                  v-if="item.typeContent === 'image'"
                >
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
              class="message--user-2 text_right d_flex flex_row_reverse align_items_end"
              v-if="item.reference === 2"
            >
              <div class="user--seen" v-if="!curConversation._sender"></div>
              <div class="avatar-chat" v-else>
                <img
                  :src="curConversation._sender.userInfo.thumbSrc"
                  width="15"
                  alt="User Avatar"
                />
              </div>
              <div class="user--message d_flex flex_column">
                <!--                Start: Text-->
                <div
                  class="item user--message-2 text_left ml_auto"
                  v-if="item.typeContent === 'text'"
                >
                  {{ item.valueContent }}
                </div>
                <!--                End: Text-->
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
                <!--                <div class="time&#45;&#45;read text_center">12: 46</div>-->
              </div>
            </div>
          </div>
          <!--    Start: zoom image when click-->
          <transition name="info">
            <zoom-image
              v-if="isZoom == true"
              :item="item"
              @close="isZoom = $event"
            />
          </transition>
          <!--    End: zoom image when click-->
        </div>
      </div>
    </VuePerfectScrollbar>
    <!--      Start: audio when listen new message-->
    <audio ref="audioTone">
      <source :src="audioToneOgg" type="audio/mpeg" />
      <source :src="audioToneMp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <!--      End: audio when listen new message-->
    <create-message/>
    <!--Popup user info chat-->
    <transition name="info">
      <user-info-chat
        v-if="isShowInfo == true"
        :item="curConversation"
        :data-theme="currentTheme"
        :popupInfo="isShowInfo"
        @closeInfo="isShowInfo = $event"
      />
    </transition>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import UserInfoChat from "./user-info/index";
import ZoomImage from "./popup/gallery";
import CreateMessage from "./create_message";
export default {
  props: ["ishowMessage"],
  data() {
    return {
      isShowInfo: false,
      audioToneMp3: require("@/assets/audio/message-active.mp3"),
      audioToneOgg: require("@/assets/audio/message-active.ogg"),
      isZoom: false,
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    },
    infoActiveFacebook() {
      return this.$store.getters.infoActiveFacebook;
    },
    infoReceiverFirstTime() {
      console.log(this.$store.getters.infoReceiverFirstTime);
      return this.$store.getters.infoReceiverFirstTime;
    },
    isFirstTime() {
      return this.$store.getters.isFirstTime;
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
          _.$refs.audioTone.play();
        }
        return;
      }

      // Listen receive messages of current conversation
      if (
        value.message._sender._id === this.curConversation._sender._id &&
        value.message._receiver._id === this.curConversation._receiver._id
      ) {
        this.$store.dispatch("updateMessage", value.message);
        // Play audio when client listen new message
        _.$refs.audioTone.play();
      }
    }
  },
  // updated() {
  //   this.$nextTick(() => this.scrollToEndChatContent());
  // },
  methods: {
    closeMessage() {
      this.$emit("closeMessage", false);
    },
    setFocus() {
      console.log("OK");
    }
    // scrollToEndChatContent() {
    //   // Scroll to bottom of message content
    //   this.parentRefs.chatContent.scrollTop = 99999999;
    // }
  },
  filters: {
    formatDateTime(value) {
      // Input Time
      const dateTime = new Date(value);
      const date = dateTime.getDate();
      const month = dateTime.getMonth() + 1;
      const year = dateTime.getFullYear();
      const hour = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");

      return `${hour}:${minutes}, ${date} tháng ${month}, ${year}`;
    }
  },
  components: {
    VuePerfectScrollbar,
    UserInfoChat,
    ZoomImage,
    CreateMessage
  }
};
</script>
<style lang="scss" scoped>
@import "./message_mobile.style";
</style>
