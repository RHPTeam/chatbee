<template>
  <div class="login ct_f p_0">
    <div class="r m_0">
      <div class="c_12 c_md_12 c_xl_8 p_0 login--video d_none d_xl_block">
        <app-login-video />
      </div>
      <div class="c_12 c_md_12 c_xl_4 p_0 login--form">
        <div
          class="form-wrap m_auto d_flex flex_column justify_content_center align_items_center"
        >
          <div class="login--logo">
            <icon-base
              icon-name="logo"
              width="185.7"
              height="94.115"
              viewBox="0 0 185.7 94.115"
            >
              <icon-logo />
            </icon-base>
          </div>
          <app-alert
            :type="
              this.$store.getters.statusResetPassword ? 'alert_success' : ''
            "
            :message="
              this.$store.getters.statusResetPassword
                ? 'Bạn đã đặt lại mật khẩu thành công!'
                : ''
            "
          />
          <h3 class="title">Login</h3>
          <form @submit.prevent="signIn">
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.email,
                passed: statusClassPassed.email
              }"
            >
              <div class="icon position_absolute">
                <icon-base
                  icon-name="envelope"
                  width="20.554"
                  height="15.713"
                  viewBox="0 0 20.554 15.713"
                >
                  <icon-envelope />
                </icon-base>
              </div>

              <input
                id="emailField"
                type="email"
                placeholder="Email"
                v-model="user.email"
              />
            </div>
            <div class="text--error">{{ errorText.email }}</div>
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.password,
                passed: statusClassPassed.password
              }"
            >
              <div class="icon position_absolute">
                <icon-base
                  icon-name="lock"
                  width="14.782"
                  height="18.55"
                  viewBox="0 0 14.782 18.55"
                >
                  <icon-lock />
                </icon-base>
              </div>
              <input
                id="passwordField"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
            <div class="text--error">{{ errorText.password }}</div>
            <router-link
              :to="{ name: 'step1' }"
              class="forgot--pass text_left d_block"
              >Forgot your password?</router-link
            >
            <div class="form--action">
              <button type="submit" class="btn btn--login">LogIn</button>
            </div>
          </form>
          <div class="form--footer text_left">
            <div class="form--footer-note">
              <span
                >Don't have an account?
                <router-link to="/signup">Register now</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./login";
</style>
