<template>
  <form>
    <div class="">
      <img
        :src="`${publicPath}images/svg/passwordreset--form-logo.svg`"
        alt=""
      />
    </div>
    <h3 class="">Password Reset</h3>
    <div class="form--reset-title">
      To reset your password, enter your email address you use to sing in
      ChatBee
    </div>
    <div class="form_group position_relative">
      <input
        type="text"
        class="form_control position_absolute"
        placeholder="Enter your email"
      />
      <icon-base icon-name="envelop" viewBox="0 0 20 20"
        ><icon-envelop
      /></icon-base>
    </div>
    <button class="btn btn_primary form_control">Send verify code</button>
    <div class="mb_1"><a href="#">Đăng nhập</a></div>
  </form>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconEnvelop from "@/components/icons/IconEnvelop";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    IconBase,
    IconEnvelop
  }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
