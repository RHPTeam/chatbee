<template>
  <form>
    <div class="mb_4">
      <img
        :src="`${publicPath}images/svg/passwordreset--form-logo.svg`"
        alt=""
      />
    </div>
    <h3 class="mb_4">Password Reset</h3>
    <div class="form--reset-title mb_4">
      To reset your password, enter your email address you use to sing in
      ChatBee
    </div>
    <div class="form_group mb-4 position_relative">
      <input
        type="text"
        class="form_control position_absolute"
        placeholder="Enter your email"
      />
      <icon-base icon-name="envelop" viewBox="0 0 20 20"
        ><icon-envelop
      /></icon-base>
    </div>
    <button class="btn btn_primary form_control mb_4">Send verify code</button>
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
form {
  a {
    text-transform: uppercase;
  }
  h3 {
    font-family: "Segoe UI Semibold";
  }
  .form--reset-title {
    font-size: 15px;
  }
  input {
    top: 0;
    left: 0;
    outline: 0;
    padding-left: 35px;
    &:focus,
    &:active,
    &:visited {
      outline: 0;
    }
  }
  svg {
    position: absolute;
    top: 11px;
    left: 10px;
  }
  button {
    margin-top: 80px;
    font-size: 15px;
    font-family: "Segoe UI Semibold";
    color: #fff;
    background: #ffb94a;
    border-color: #ffb94a;
    text-transform: uppercase;
    &:hover,
    &:focus,
    &:active {
      background: #ff9e4a;
      border-color: #ff9e4a;
    }
  }
}
</style>
