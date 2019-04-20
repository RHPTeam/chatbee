<template>
  <div
    class="login ct_f p_0 position_relative"
    :style="{ backgroundImage: 'url(' + srcDefaultLogin + ')' }"
  >
    <div class="login--above position_absolute"></div>
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
              width="210.21"
              height="78.65"
              viewBox="0 0 250.446 93.703"
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
          <app-alert
            :type="
              this.$store.getters.authStatus == '401' ? 'alert_danger' : ''
            "
            :message="
              this.$store.getters.authStatus == '401'
                ? 'Tài khoản email hoặc mật khẩu không đúng!'
                : ''
            "
          />
          <app-alert
            :type="
              this.$store.getters.authStatus == '405' ? 'alert_danger' : ''
            "
            :message="
              this.$store.getters.authStatus == '405'
                ? 'Tài khoản của bạn đã hết hạn hoặc bị ngừng truy cập!'
                : ''
            "
          />
          <h3 class="title">Đăng nhập</h3>
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
                placeholder="Mật khẩu"
                v-model="user.password"
              />
            </div>
            <div class="text--error">{{ errorText.password }}</div>
            <router-link
              :to="{ name: 'step1' }"
              class="forgot--pass text_left d_block"
              >Quên mật khẩu?</router-link
            >
            <div class="form--action">
              <button type="submit" class="btn btn--login">
                {{
                  this.$store.getters.authStatus === "loading"
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"
                }}
              </button>
            </div>
          </form>
          <div class="form--footer text_left">
            <div class="form--footer-note">
              <span
                >Bạn chưa có tài khoản?
                <router-link to="/signup">Đăng ký ngay</router-link>
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
