<template>
  <form @submit.prevent="sendPassword">
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
      Xác minh tài khoản thành công. Bây giờ, bạn đã có thể đặt lại mật khẩu của mình.
    </div>
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError.password,
        passed: statusClassPassed.password
      }"
    >
      <div class="icon position_absolute">
        <icon-base icon-name="padlock" viewBox="0 0 20 20"
          ><icon-padlock
        /></icon-base>
      </div>
      <input
        type="password"
        class="form_control"
        placeholder="Nhập mật khẩu mới"
        v-model="reset.password"
      />
    </div>
    <div class="text--error">{{ errorText.password }}</div>
    <div
      class="form_group position_relative"
      :class="{
        errors: statusClassError.confirmPassword,
        passed: statusClassPassed.confirmPassword
      }"
    >
      <div class="icon position_absolute">
        <icon-base icon-name="checkpadlock" viewBox="0 0 20 20"
          ><icon-check-padlock
        /></icon-base>
      </div>
      <input
        type="password"
        class="form_control"
        placeholder="Nhập lại mật khẩu mới"
        v-model="reset.confirmPassword"
      />
    </div>
    <div class="text--error">{{ errorText.confirmPassword }}</div>
    <button class="btn btn_primary form_control">Xác nhận</button>
    <div class="mb_1"><a href="#">Đăng nhập</a></div>
  </form>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "index.style";
</style>
