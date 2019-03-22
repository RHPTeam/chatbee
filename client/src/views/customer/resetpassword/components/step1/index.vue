<template>
  <form @submit.prevent="sendMail">
    <div class="form--reset-logo">
      <icon-base
          icon-name="logo"
          width="210.21"
          height="78.65"
          viewBox="0 0 250.446 93.703"
        >
        <icon-logo />
      </icon-base>
    </div>
    <h3 class="">Password Reset</h3>
    <div class="form--reset-title">
      To reset your password, enter your email address you use to sing in
      ChatBee
    </div>
    <app-alert
      :type="this.$store.getters.authStatus == 'loading' ? 'alert_danger' : ''"
      :message="
        this.$store.getters.authStatus == 'loading'
          ? 'Tài khoản email không tồn tại!'
          : ''
      "
    />
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
    <div class="mb_1">
      <router-link to="/signin">Đăng nhập</router-link>
    </div>
  </form>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "index.style";
</style>
