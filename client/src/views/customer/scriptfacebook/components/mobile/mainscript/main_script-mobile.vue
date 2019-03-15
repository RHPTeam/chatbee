<!--Template Main Scripts Mobile-->
<template>
  <div class="scripts scripts--popup">
    <!--Component loading-->
    <loading-component v-if="status === 'loading'" />
    <!--Regions Scripts Header-->
    <div v-else>
      <div class=" script--header d_flex align_items_center">
        <div class="script--header-back mr_3" @click="close">
          <icon-base
            class="icon--arrow-left"
            width="15"
            height="24"
            viewBox="0 0 22.65 20.07"
          >
            <icon-arrow-left />
          </icon-base>
        </div>
        <h1 class="script--header-title">{{ block.name }}</h1>
        <div class="script--header-create ml_auto">
          Tạo
        </div>
      </div>
      <!--Regions Scripts Body-->
      <div class="script--body">
        <div>
          <div
            class="script--body-name  d_flex flex-row align_items_center mb_3"
          >
            <div class="script--body-name-edit">
              <editable
                :content="block.name"
                @update="block.name = $event"
              ></editable>
            </div>
            <div class="script--body-name-copy">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 482.8 482.8"
              >
                <icon-copy />
              </icon-base>
            </div>
          </div>
        </div>
        <div v-if="textList.length > 0">
          <div
            class="script--body-text"
            v-for="(item, index) in textList"
            :key="index"
          >
            <div class="script--body-text-edit">
              <div contenteditable="true">Nhập văn bản</div>
            </div>
          </div>
        </div>
        <div v-if="imageList.length > 0">
          <div
            class="script--body-image"
            v-for="(item, index) in imageList"
            :key="index"
          >
            <div class="scrip--body-image-link">
              <img
                src="http://pipsum.com/280x207.jpg"
                alt="demo scripts facebook"
              />
            </div>
            <div class="script--body-image-upload" v-model="textValue">
              <input type="file" name="upload_image" id="upload_image" />
              <div class="script--body-image-icon">
                <div class="icon-image">
                  <icon-base
                    class="icon-image"
                    width="32"
                    height="32"
                    viewBox="0 0 26 26"
                    name="upload-image"
                  >
                    <icon-upload-image />
                  </icon-base>
                </div>
                <span>Tải ảnh lên</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="timerList.length > 0">
          <div
            class="script--body-timer"
            v-for="(item, index) in timerList"
            :key="index"
          >
            <div class="scripts--body-timer-edit" contenteditable="true">
              <div class="script--body-timer-icon">
                <icon-base
                  class="icon-sand-clock"
                  width="16"
                  height="16"
                  viewBox="0 0 14.41 20.14"
                >
                  <icon-sand-clock />
                </icon-base>
              </div>
              <input type="number" value="1" />
              <select name="" id="choose_timer">
                <option value="seconds">Giây</option>
                <option value="minutes">Phút</option>
                <option value="hour">Giờ</option>
              </select>
            </div>
          </div>
        </div>
        <!--Block add attribute-->
        <div v-if="showAddAttribute == true">
          <div class="script--body-tag">
            <div class="script--body-tag-title mb_2">
              <span class="script--body-tag-icon">
                <icon-base
                  class="icon-tag"
                  width="15"
                  height="16"
                  viewBox="0 0 337.7 487.85"
                >
                  <icon-tag />
                </icon-base>
              </span>
              <span>Tag</span>
            </div>
            <div class="script--body-tag-description">
              Set a value for an existing user attribute or add a new one. Use
              it to segment users for broadcast subscriptions, to define bot
              flow scenarios, or to analyze users' activity. Note that you can
              use arithmetic expressions and attributes in the Value field.
            </div>
            <div class="script--body-tag-list">
              <div class="script--body-tag-edit-title d_flex ">
                <span>Tên thẻ</span>
                <span>Giá trị</span>
              </div>
              <!--Add Attribute when click button add-->
              <div
                class="script--body-tag-item d_flex align_items_center position_relative mb_2"
                v-if="isShowAddAttribute == true"
              >
                <div
                  class="tag--created"
                  @click="showModalAttribute = !showModalAttribute"
                >
                  <div
                    class="tag--created-item"
                    name="text"
                    placeholder="eg. Nhu cầu"
                    contenteditable="true"
                  >
                    eg. Nhu cầu
                  </div>
                </div>
                <div
                  class="tag--created"
                  @click="showModalValue = !showModalValue"
                >
                  <div
                    class="tag--created-item"
                    name="value"
                    placeholder="Nhập giá trị"
                    contenteditable="true"
                  >
                    Nhập giá trị
                  </div>
                </div>
              </div>
              <!--End add attribute-->
              <!--Add Attribute-->
              <div
                class="script--body-tag-item d_flex align_items_center position_relative mb_2"
              >
                <div
                  class="tag--created"
                  @click="showModalAttribute = !showModalAttribute"
                >
                  <div
                    class="tag--created-item"
                    name="text"
                    placeholder="eg. Nhu cầu"
                    contenteditable="true"
                  >
                    eg. Nhu cầu
                  </div>
                </div>
                <div
                  class="tag--created"
                  @click="showModalValue = !showModalValue"
                >
                  <div
                    class="tag--created-item"
                    name="value"
                    placeholder="Nhập giá trị"
                    contenteditable="true"
                  >
                    Nhập giá trị
                  </div>
                </div>
              </div>
              <!--End add attribute-->
              <div class="script--body-tag-footer mt_3">
                <div
                  class="script--body-tag-add mt_3"
                  @click="isShowAddAttribute = !isShowAddAttribute"
                >
                  <span>
                    <icon-base
                      class="icon--add"
                      icon-name="plus"
                      width="16"
                      height="16"
                      viewBox="0 0 60 60"
                    >
                      <icon-plus />
                    </icon-base>
                  </span>
                  <span class="ml_2">Thêm thẻ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Regions Script Footer-->
      <div class="script--footer">
        <div class="script--footer-addelm ">
          <div
            class="gr-addelm d_flex align_items_center justify_content_around"
          >
            <div
              class="addelm-item text_center"
              @click.prevent="addElm('text')"
            >
              <span>
                <icon-base
                  class="icon-text"
                  width="20"
                  height="20"
                  viewBox="0 0 13.53 20.11"
                >
                  <icon-text />
                </icon-base>
              </span>
              <span> Văn bản</span>
            </div>
            <div
              class="addelm-item text_center"
              @click.prevent="addElm('image')"
            >
              <span>
                <icon-base
                  class="icon-image"
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                >
                  <icon-image />
                </icon-base>
              </span>
              <span>Hình ảnh</span>
            </div>
            <div
              class="addelm-item text_center "
              @click.prevent="addElm('timer')"
            >
              <span>
                <icon-base
                  class="icon-sand-clock"
                  width="20"
                  height="20"
                  viewBox="0 0 14.41 20.14"
                >
                  <icon-sand-clock />
                </icon-base>
              </span>
              <span> Thời gian chờ </span>
            </div>
            <div
              class="addelm-item text_center"
              @click="showPopupPlugins = true"
            >
              <span>
                <icon-base
                  class="icon-plus"
                  icon-name="plus"
                  width="20"
                  height="20"
                  viewBox="0 0 60 60"
                >
                  <icon-plus />
                </icon-base>
              </span>
              <span>Thêm mới</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Start: Component for popup attr -->
    <transition name="popup">
      <add-attribute
        v-if="showModalAttribute == true"
        :data-theme="currentTheme"
        :modalAttr="showModalAttribute"
        @closeModalAttribute="showModalAttribute = $event"
      />
    </transition>
    <!-- End: Component for popup attr -->

    <!--Start: Component for modal add value-->
    <transition name="popup">
      <add-value
        v-if="showModalValue == true"
        :data-theme="currentTheme"
        :modalAttr="showModalValue"
        @closeModalValue="showModalValue = $event"
      />
    </transition>
    <!--End: Component for modal add value-->

    <!--Popup filter Attribute-->
    <transition name="popup">
      <popup-plugins
        v-if="showPopupPlugins == true"
        :data-theme="currentTheme"
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @showAddAttribute="showAddAttribute = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
      />
    </transition>
  </div>
</template>

<script type="text/javascript" src="./main_script_mobile.script.js"></script>

<style scoped lang="scss">
@import "./main_script_mobile.style";
</style>
