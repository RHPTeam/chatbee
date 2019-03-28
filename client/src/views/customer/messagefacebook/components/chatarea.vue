<template>
  <div class="chatarea" :data-theme="currentTheme">
    <div v-if="message.contents === ''">
      Nhập tin nhắn gửi đến bạn bè để bắt đầu cuộc trò chuyện ...
    </div>
    <div
      v-else
      class="chatarea--history"
      v-for="(item, index) in message.contents"
      :key="index"
    >
      <div class="receive d_flex justify_content_start align_items_end">
        <div class="user--send">
          <img
            :src="message._receiver.profilePicture"
            width="30"
            alt="User Avatar"
          />
        </div>
        <div class="message message--receive" v-if="item.reference === 1">
          <div class="message--item" v-if="item.typeContent === 'text'">
            {{ item.valueContent }}
          </div>
          <!--Start: gallery receive -->
          <div class="receive gallery" v-if="item.typeContent === 'image'">
            <div class="gallery--item">
              <img :src="item.valueContent" @click="isZoom = !isZoom" />
            </div>
          </div>
          <!--End: gallery receive -->
        </div>
      </div>
      <div
        class="send d_flex justify_content_end align_items_end"
        v-if="item.reference === 2"
      >
        <div class="message message--send">
          <div class="message--item" v-if="item.typeContent === 'text'">
            {{ item.valueContent }}
          </div>
          <!--Start: gallery sender -->
          <div class="sender gallery" v-if="item.typeContent === 'image'">
            <div class="gallery--item">
              <img :src="item.valueContent" @click="isZoom = !isZoom" />
            </div>
          </div>
          <!--End: gallery sender -->
        </div>
        <div class="user--seen">
          <img
            :src="message._sender.userInfo.thumbSrc"
            width="15"
            alt="User Avatar"
          />
        </div>
      </div>
    </div>
    <!--Start: when click image show gallery it-->
    <zoom :message="message" :isZoom="isZoom" />
    <!--End: when click image show gallery it-->
  </div>
</template>

<script>
import Zoom from "./chatarea/cp_chat/gallery";

export default {
  data() {
    return {
      isZoom: false
    };
  },
  async created() {
    
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    message() {
      return this.$store.getters.messageUser;
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
