<template>
  <form @submit.prevent="sendMail">
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
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError,
        passed: statusClassPassed
      }"
    >
      <div class="icon position_absolute">
        <icon-base icon-name="envelop" viewBox="0 0 20 20"
          ><icon-envelop
        /></icon-base>
      </div>
      <input
        type="text"
        class="form_control"
        placeholder="Enter your email"
        v-model="email"
      />
    </div>
    <div class="text--error">{{ errorText }}</div>
    <button class="btn btn_primary form_control">Send verify code</button>
    <div class="mb_1"><a href="#">Đăng nhập</a></div>
  </form>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "index.style";
</style>
