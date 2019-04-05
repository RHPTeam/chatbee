<template>
  <div class="main" :data-theme="currentTheme">
    <!--Layout Desktop-->
    <div class="main--wrap d_none d_md_block">
      <app-bread-crumb
        nameBread="Thiết lập tài khoản"
        subBread="Giúp bạn thiết lập những cài đặt cá nhân về thông tin tài khoản của mình."
      />
      <loading-component v-if="this.$store.getters.authStatus === 'loading'" />
      <div v-else-if="this.$store.getters.authStatus === 'success'">
        <!--main top-->
        <div class="main--top d_flex align_items_center p_3">
          <div class="exp--account">
            Tài khoản hết hạn: {{ user.expireDate | formatDate }}
          </div>
          <div class="renewed--account text_center ml_auto">
            <button disabled>Gia hạn</button>
          </div>
        </div>
        <!--main content-->
        <div class="main--content mt_4 mb_4">
          <div class="r">
            <div class="c_sm_12 c_md_12 c_lg_8 or_2">
              <div class="left--content p_3">
                <div class="divide--title text_left">Thông tin cá nhân</div>
                <form>
                  <div class="user--email d_flex mb_2">
                    <div class="icon--envelope mt_1">
                      <icon-base icon-name viewBox="0 0 20 20">
                        <icon-envelop />
                      </icon-base>
                    </div>
                    <div class="text">{{ user.email }}</div>
                  </div>
                  <div class="r">
                    <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                      <div class="form_group position_relative">
                        <div class="icon position_absolute p_2">
                          <icon-base icon-name viewBox="0 0 20 20">
                            <icon-user />
                          </icon-base>
                        </div>
                        <input
                          type="text"
                          class="form_control"
                          placeholder="Nhập tên của bạn"
                          v-model="user.name"
                        />
                      </div>
                    </div>
                    <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                      <div class="form_group position_relative">
                        <div class="icon position_absolute p_2">
                          <icon-base icon-name viewBox="0 0 24 24">
                            <icon-phone />
                          </icon-base>
                        </div>
                        <input
                          type="text"
                          class="form_control"
                          placeholder="Nhập số điện thoại của bạn"
                          v-model="user.phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="divide--title d_flex mt_2">Mật khẩu</div>
                  <div class="r pb_lg_4">
                    <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                      <div
                        class="form_group position_relative"
                        :class="{
                          errors: statusClassError.newPassword,
                          passed: statusClassPassed.newPassword
                        }"
                      >
                        <div class="icon password position_absolute p_2">
                          <icon-base icon-name viewBox="0 0 20 20">
                            <icon-padlock />
                          </icon-base>
                        </div>
                        <input
                          type="password"
                          class="form_control"
                          placeholder="Nhập mật khẩu của bạn"
                          v-model="reset.newPassword"
                        />
                      </div>
                      <div class="text--error">{{ errorText.newPassword }}</div>
                    </div>
                    <div class="c_sm_12 c_md_12 c_lg_6 form_group">
                      <div
                        class="form_group position_relative input--reNewPass"
                        :class="{
                          errors: statusClassError.confirmNewPassword,
                          passed: statusClassPassed.confirmNewPassword
                        }"
                      >
                        <div class="icon password position_absolute p_2">
                          <icon-base icon-name viewBox="0 0 20 20">
                            <icon-check-padlock />
                          </icon-base>
                        </div>
                        <input
                          type="password"
                          class="form_control"
                          placeholder="Nhập lại mật khẩu của bạn"
                          v-model="reset.confirmNewPassword"
                        />
                      </div>
                      <div class="text--error">
                        {{ errorText.confirmNewPassword }}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="c_sm_12 c_md_12 c_lg_4 or_1">
              <div class="right--content p_3">
                <div
                  class="avatar--wrapper position_relative d_flex align_content_center"
                >
                  <p>Ảnh đại diện</p>
                  <div class="change--icon ml_auto">
                    <div
                      class="icon"
                      @click="isChangeImage = !isChangeImage"
                      v-click-outside="closeChangeImage"
                    >
                      <icon-base icon-name viewBox="0 0 20 20">
                        <icon-edit />
                      </icon-base>
                    </div>
                  </div>
                  <div
                    class="change--avatar position_absolute text_left"
                    v-if="isChangeImage == true"
                  >
                    <div class="change--avatar-item" @click="deleteImage(1)">
                      Xoá ảnh
                    </div>
                    <div class="change--avatar-item position_relative">
                      <input type="file" title @change="changeAvatar" />
                      Thay ảnh đại diện
                    </div>
                  </div>
                </div>
                <div class="main--av-wrap">
                  <div
                    class="main--av-content position_relative"
                    v-if="user.imageAvatar"
                  >
                    <div
                      class="main--av d_flex justify_content_center align_items_center"
                      :style="{
                        backgroundImage: 'url(' + user.imageAvatar + ')'
                      }"
                    ></div>
                    <div
                      class="main--av-img position_absolute"
                      :style="{
                        backgroundImage: 'url(' + user.imageAvatar + ')'
                      }"
                    ></div>
                  </div>
                  <div class="main--av-default position_relative" v-else>
                    <div
                      class="main--av-bg d_flex justify_content_center align_items_center"
                    ></div>
                    <div
                      class="main--av-letter position_absolute d_flex justify_content_center align_items_center"
                    >
                      {{ user.name | getFirstLetter }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main--option">
          <div class="r">
            <div class="option--theme c_sm_12 c_md_12 c_lg_8">
              <!--<div class="c_md_6">-->
              <p class="divide--title padding--option d_flex ml_0">Chủ đề</p>
              <div class="d_flex auto--change padding--option">
                <div class="mb_3">Tự động điều chỉnh</div>
                <div class="ml_auto">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <!--</div>-->
              <!--<div class="option&#45;&#45;theme-img ct_f mb_n4 mb_sm_0">
                &lt;!&ndash;Start: Option System&ndash;&gt;
                <div class="theme&#45;&#45;title text_left d_flex mb_2">
                  <span>
                    Tự điều chỉnh thời gian hiển thị màu sắc của màn hình theo
                    sở thích của cá nhân bạn.
                  </span>
                </div>
                <div class="r">
                  &lt;!&ndash;Start: option theme light&ndash;&gt;
                  <div
                    class="choose&#45;&#45;theme c_sm_12 c_md_12 c_lg_12 c_xl_6 mb_3"
                  >
                    <div class="choose&#45;&#45;theme-item d_flex flex_column mb_3">
                      <div class="theme&#45;&#45;setting theme&#45;&#45;light-img mb_2">
                        <img :src="imageLight" alt="images-theme-light" />
                      </div>
                      <div class="d_flex flex_column text_left mt_3 mb_n2">
                        <div
                          class="custom&#45;&#45;input"
                          @click.prevent="setupAlwaysThemeLight"
                        >
                          <input
                            type="radio"
                            id="checkRadio"
                            name="radio-group"
                            checked
                            v-model="alwaysShowLight"
                          />
                          <label for="checkRadio">Luôn luôn</label>
                        </div>
                        <div
                          class="check&#45;&#45;radio-about d_flex align_items_center mt_n2"
                        >
                          <div
                            class="custom&#45;&#45;input"
                            @click.prevent="setupCustomThemeLight"
                          >
                            <input
                              type="radio"
                              id="checkLight"
                              name="radio-group"
                              v-model="showCustomLight"
                            />
                            <label for="checkLight"></label>
                          </div>
                          <div class="check&#45;&#45;option-hours mt_3">
                            <span>Từ</span>
                            <input
                              type="text"
                              v-model="showCustomThemeLight.timeStart"
                            />
                            <span>đến</span>
                            <input
                              type="text"
                              v-model="showCustomThemeLight.timeOut"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  &lt;!&ndash;End: option theme light&ndash;&gt;
                  &lt;!&ndash;Start: option theme dark&ndash;&gt;
                  <div class="choose&#45;&#45;theme c_sm_12 c_md_12 c_lg_12 c_xl_6">
                    <div class="choose&#45;&#45;theme-item d_flex flex_column">
                      <div class="theme&#45;&#45;setting theme&#45;&#45;dark-img mb_2">
                        <img :src="imageDark" alt="images-theme-dark" />
                      </div>
                      <div class="d_flex flex_column text_left mt_3">
                        <div
                          class="custom&#45;&#45;input"
                          @click.prevent="setupAlwaysThemeDark"
                        >
                          <input
                            type="radio"
                            id="checkRadioDark"
                            name="radio-group"
                            v-model="alwaysShowDark"
                          />
                          <label for="checkRadioDark">Luôn luôn</label>
                        </div>
                        <div
                          class="check&#45;&#45;radio-about d_flex align_items_center mt_n2"
                        >
                          <div
                            class="custom&#45;&#45;input"
                            @click.prevent="setupCustomThemeDark"
                          >
                            <input
                              type="radio"
                              id="checkDark"
                              name="radio-group"
                              v-model="showCustomThemeDark"
                            />
                            <label for="checkDark"></label>
                          </div>
                          <div class="check&#45;&#45;option-hours mt_3">
                            <span>Từ</span>
                            <input
                              type="text"
                              v-model="showCustomThemeDark.timeStart"
                            />
                            <span>đến</span>
                            <input
                              type="text"
                              v-model="showCustomThemeDark.timeOut"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  &lt;!&ndash;End: option theme dark&ndash;&gt;
                </div>
              </div>-->
            </div>
            <!--Start: Setup system-->
            <div class="option--sytem c_sm_12 c_md_12 c_lg_4 mt_md_4 mt_lg_0">
              <p class="divide--title text_left padding--option mb_3">
                Thiết lập hệ thống
              </p>
              <div class="r">
                <div class="option--sytem-item c_sm_12 c_md_12 c_lg_12">
                  <div class="d_flex auto--change padding--option">
                    <p class="text_left">Gợi ý mẹo hay</p>
                    <div class="ml_auto">
                      <label class="switch" @click.prevent="switchSuggest">
                        <input type="checkbox" v-model="isSwitchSuggest" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="option--sytem-item c_sm_12 c_md_12 c_lg_12">
                  <div class="d_flex auto--change padding--option">
                    <p class="text_left">Hướng dẫn</p>
                    <div class="ml_auto">
                      <label class="switch" @click.prevent="switchTutorial">
                        <input type="checkbox" v-model="isSwitchTutorial" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- popup follow change varriable when user created -->
      <transition name="change--info">
        <modal-change-info
          v-if="showPopupChangeInfo == true"
          :data-theme="currentTheme"
          :popupData="showPopupChangeInfo"
          @closePopupChangeInfo="showPopupChangeInfo = $event"
        />
      </transition>
      <!-- pop up delete images -->
      <transition name="popup">
        <delete-popup
          v-if="showModal == true"
          :data-theme="currentTheme"
          :typePopup="typeDeletePopup"
          :dataUser="user"
          :popupData="showModal"
          @closeDeletePopup="showModal = $event"
          :descModal="'Vừa có sự thay đổi, bạn có muốn lưu lại không?'"
        />
      </transition>
      <!-- pop up delete images -->
      <transition name="popup">
        <modal-change-password
          v-if="showModalChangePassword == true"
          :data-theme="currentTheme"
          :reset="reset"
          @closeModalChangePassword="closeModalPassword($event)"
          :popupData="showModalChangePassword"
        />
      </transition>

      <!--Start: Dropzone Component-->
      <dropzone />
      <!--End: Dropzone Component-->
    </div>
    <!--Layouts Mobile-->
    <div class="main--wrap-mobile d_block d_md_none">
      <account-mobile />
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./account.scss";
</style>
