<template>
  <form @submit.prevent="sendCode">
    <div class="">
      <img :src="publicImages" alt="" />
    </div>
    <div class="form--reset-img">
      <img
        src="http://source.unsplash.com/random/50x50"
        width="50"
        height="50"
        alt=""
      />
      <h4>{{ user.name }}</h4>
    </div>
    <div class="form--reset-title">
      Chúng tôi vừa gửi một mã xác minh tới email của bạn. Nhập vào form bên dưới để xác minh tài khoản. 
    </div>
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError,
        passed: statusClassPassed
      }"
    >
      <div class="icon position_absolute">
        <icon-base icon-name="security" viewBox="0 0 20 20"
          ><icon-security
        /></icon-base>
      </div>
      <input
        type="text"
        class="form_control"
        placeholder="Nhập mã xác minh"
        v-model="code"
      />
    </div>
    <div class="text--error">{{ errorText }}</div>
    <button class="btn btn_primary form_control">Tiếp theo</button>
    <div class="form--redirect mb_1"><a href="#">Trở lại</a></div>
  </form>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "index.style";
</style>
