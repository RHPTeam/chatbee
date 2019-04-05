<template>
  <div class="main" :data-theme="currentTheme">
    <!--Layout Desktop-->
    <div class="main--wrap d_none d_md_block">
      <app-bread-crumb
        nameBread="Thiết lập tài khoản"
        subBread="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita, voluptas?"
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
                    <div class="icon" @click.prevent="isDropZone = true">
                      <icon-base icon-name viewBox="0 0 20 20">
                        <icon-edit />
                      </icon-base>
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
      <dropzone :status="isDropZone" @close="isDropZone = $event" />
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
