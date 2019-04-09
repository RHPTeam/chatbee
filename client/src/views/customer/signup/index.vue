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
              width="210.21"
              height="78.65"
              viewBox="0 0 250.446 93.703"
            >
              <icon-logo />
            </icon-base>
          </div>
          <app-alert
            :type="
              this.$store.getters.authStatus == 'error' ? 'alert_danger' : ''
            "
            :message="
              this.$store.getters.authStatus == 'error'
                ? this.$store.getters.textAuth
                : ''
            "
          />
          <h3 class="title">Đăng kí</h3>
          <form @submit.prevent="submit">
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.name,
                passed: statusClassPassed.name
              }"
            >
              <div class="icon position_absolute">
                <icon-base
                  icon-name="user"
                  width="16.425"
                  height="16.425"
                  viewBox="0 0 16.425 16.425"
                >
                  <icon-user />
                </icon-base>
              </div>
              <input
                id="nameField"
                type="text"
                placeholder="Họ tên"
                v-model="user.name"
              />
              <!--<span class="text&#45;&#45;error">{{ errorText.name }}</span>-->
            </div>
            <div class="text--error">{{ errorText.name }}</div>
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.phone,
                passed: statusClassPassed.phone
              }"
            >
              <div class="icon position_absolute">
                <icon-base
                  icon-name="phone"
                  width="20.896"
                  height="20.857"
                  viewBox="0 0 20.896 20.857"
                >
                  <icon-phone />
                </icon-base>
              </div>
              <div
                v-if="isStatusNetwork"
                :class="{
                  viettel: network.toString().toLowerCase() === 'viettel',
                  vina: network.toString().toLowerCase() === 'vinaphone',
                  mobi: network.toString().toLowerCase() === 'mobiphone',
                  vietnammb:
                    network.toString().toLowerCase() === 'vietnammobile',
                  gmb: network.toString().toLowerCase() === 'gmobile'
                }"
                class="network position_absolute"
              >
                {{ network }}
              </div>
              <input
                id="phoneField"
                type="text"
                placeholder="Số điện thoại"
                v-model="user.phone"
              />
              <span class="text--error"></span>
            </div>
            <div class="text--error">{{ errorText.phone }}</div>
            <div
              class="form_group position_relative"
              :class="{
                errors: statusClassError.presenter,
                passed: statusClassPassed.presenter
              }"
            >
              <div class="icon ic--security position_absolute">
                <icon-base
                  icon-name="security"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                >
                  <icon-security />
                </icon-base>
              </div>
              <input
                id="presenterField"
                type="text"
                placeholder="Mã giới thiệu"
                v-model="user.presenter"
              />
              <span class="text--error"></span>
            </div>
            <div class="text--error">{{ errorText.presenter }}</div>
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
              <span class="text--error"></span>
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
              <span class="text--error"></span>
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
                <icon-base
                  icon-name="lock-check"
                  width="14.8"
                  height="18.604"
                  viewBox="0 0 14.8 18.604"
                >
                  <icon-lock-check />
                </icon-base>
              </div>
              <input
                id="rePasswordField"
                type="password"
                placeholder="Nhập lại mật khẩu"
                v-model="confirmPassword"
              />
              <span class="text--error"></span>
            </div>
            <div class="text--error">{{ errorText.confirmPassword }}</div>
            <div class="form--action action--register">
              <button type="submit" class="btn btn--login">
                {{
                (this.$store.getters.authStatus === "loading"
                ? "Đang đăng ký..."
                : "Đăng ký")
                }}
              </button>
            </div>
          </form>
          <div class="form--footer text_left">
            <div class="form--footer-note">
              <span
                >Bạn đã có tài khoản?
                <router-link to="/signin">Đăng nhập</router-link>
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
@import "../signin/login";
</style>
