<template>
  <div class="list--user-mobile p_3">
    <div class="user--mobile-item d_flex" @click="ishowMessage = true">
      <div class="user--avatar align_items_start">
        <img
          src="https://as2.ftcdn.net/jpg/01/66/47/65/500_F_166476508_4fPRhsEUS8FwZ35ipkn82lqvJfxg7mQ2.jpg"
          width="40"
          height="40"
          alt=""
        />
      </div>
      <div class="user--info align_items_end text_left ml_3">
        <h4 class="mb_1">Lê Khang</h4>
        <p class="m_0">Không có gì ngoài đẹp trai ...!!!</p>
      </div>
    </div>
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <user-item />
    <transition name="popup">
      <message-mobile
        v-if="ishowMessage == true"
        :data-theme="currentTheme"
        :popupMessage="ishowMessage"
        @closeMessage="ishowMessage = $event"
      />
    </transition>
  </div>
</template>
<script>
import MessageMobile from "./message_mobile";
import UserItem from "./chat/user_item";
export default {
  data() {
    return {
      ishowMessage: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    MessageMobile,
    UserItem
  }
};
</script>
<style lang="scss" scoped>
@import "./message_mobile.style";
</style>
