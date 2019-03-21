<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts">
    <!--Component Loading-->
    <loading-component v-if="this.$store.getters.statusBlocks === 'loading'" />
    <!--Regions Scripts Header-->
    <div v-else>
      <div class=" script--header d_flex align_items_center">
        <editable
          class="script--header-title"
          :value="block.name"
          @input="block.name = $event"
          placeholder="Nhập tên..."
          :target="block._id"
          type="block"
        ></editable>
        <div class="script--header-copy-link">
          <icon-base
            class="icon--base"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-copy />
          </icon-base>
          <icon-base
            class="icon--base"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-link />
          </icon-base>
        </div>
        <div
          class="script--header-delete ml_auto"
          @click="deleteBlock(block._id)"
        >
          <icon-base
            icon-name="remove"
            width="26"
            height="26"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="script--header-dropdown d_none ml_auto position_relative">
          <div
            class="icon--dropdown"
            v-click-outside="closeOptionTablet"
            @click="showOptionTablet = !showOptionTablet"
          >
            <icon-base
              icon-name="remove"
              width="26"
              height="26"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
            <ul
              class="header--dropdown-wrap position_absolute text_left p_0 m_0"
              v-if="showOptionTablet == true"
            >
              <li>
                <icon-base
                  class="icon--base"
                  width="16"
                  height="16"
                  viewBox="0 0 482.8 482.8"
                >
                  <icon-copy />
                </icon-base>
                <span class="ml_2">Sao chép</span>
              </li>
              <li>
                <icon-base
                  class="icon--base"
                  width="16"
                  height="16"
                  viewBox="0 0 482.8 482.8"
                >
                  <icon-link />
                </icon-base>
                <span class="ml_2">Sao chép link</span>
              </li>
              <li @click="deleteBlock">
                <icon-base
                  icon-name="remove"
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                >
                  <icon-remove />
                </icon-base>
                <span class="ml_2">Xóa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--Regions Scripts Body-->
      <div class="script--body">
        <!--Start: Add text-->
        <div>
          <div class="script--body-text">
            <div class="script--body-delete">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
            <div class="script--body-move">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 64 64"
              >
                <icon-move />
              </icon-base>
            </div>
            <div class="script--body-text-edit">
              <div contenteditable="true" v-model="textValue"></div>
            </div>
          </div>
        </div>
        <!--End: Add text-->
        <!--Start: add images-->
        <div>
          <div class="script--body-image">
            <div class="script--body-delete">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
            <div class="script--body-move">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 64 64"
              >
                <icon-move />
              </icon-base>
            </div>
            <div class="scrip--body-image-link">
              <img
                src="http://pipsum.com/280x207.jpg"
                alt="demo scripts facebook"
              />
            </div>
            <div class="script--body-upload-image" v-model="textValue">
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
        <!--End: add images-->
        <!--Start: add timer-->
        <div>
          <div class="script--body-timer">
            <div class="script--body-delete">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
            <div class="script--body-move">
              <icon-base
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 64 64"
              >
                <icon-move />
              </icon-base>
            </div>
            <div class="scripts--body-timer-edit " v-model="textValue">
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
        <!--End: add timer        -->
        <div v-if="showAddAttribute == true">
          <div class="script--body-tag">
            <div class="script--body-tag-title">
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
                <div class="tag--created">
                  <div
                    class="tag--created-item"
                    name="text"
                    placeholder="eg. Nhu cầu"
                    contenteditable="true"
                  >
                    eg. Nhu cầu
                  </div>
                </div>
                <div class="tag--created">
                  <div
                    class="tag--created-item"
                    name="value"
                    placeholder="Nhập giá trị"
                    contenteditable="true"
                  >
                    Nhập giá trị
                  </div>
                </div>
                <div
                  class="tag--icon-delete d_flex align_items_center position_absolute"
                >
                  <icon-base
                    icon-name="remove"
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                  >
                    <icon-remove />
                  </icon-base>
                </div>
              </div>
              <!--End add attribute-->
              <div
                class="script--body-tag-item d_flex align_items_center position_relative"
              >
                <div class="tag--created">
                  <div
                    class="tag--created-item"
                    name="text"
                    placeholder="eg. Nhu cầu"
                    contenteditable="true"
                  >
                    eg. Nhu cầu
                  </div>
                </div>
                <div class="tag--created">
                  <div
                    class="tag--created-item"
                    name="value"
                    placeholder="Nhập giá trị"
                    contenteditable="true"
                  >
                    Nhập giá trị
                  </div>
                </div>
                <div
                  class="tag--icon-delete d_flex align_items_center position_absolute"
                >
                  <icon-base
                    icon-name="remove"
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                  >
                    <icon-remove />
                  </icon-base>
                </div>
              </div>
              <div class="script--body-tag-footer">
                <div
                  class="script--body-tag-add"
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
                  <span> Thêm thẻ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Regions Script Footer-->
      <div class="script--footer">
        <div class="script--footer-addelm">
          <div class="title">Thêm phần tử</div>
          <div class="gr-addelm d_flex align_items_center ">
            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
              @click.prevent="addItemBlock('text', block._id)"
            >
              <icon-base
                class="icon-text"
                width="20"
                height="20"
                viewBox="0 0 13.53 20.11"
              >
                <icon-text />
              </icon-base>
              Văn bản
            </div>

            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
              @click.prevent="addItemBlock('image', block._id)"
            >
              <icon-base
                class="icon-image"
                width="20"
                height="20"
                viewBox="0 0 26 26"
              >
                <icon-image />
              </icon-base>
              Hình ảnh
            </div>

            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
              @click.prevent="addItemBlock('time', block._id)"
            >
              <icon-base
                class="icon-sand-clock"
                width="20"
                height="20"
                viewBox="0 0 14.41 20.14"
              >
                <icon-sand-clock />
              </icon-base>
              Thời gian
            </div>

            <div
              class="addelm-item d_flex align_items_center justify_content_center flex_column"
              @click="showPopupPlugins = true"
            >
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="20"
                height="20"
                viewBox="0 0 60 60"
              >
                <icon-plus />
              </icon-base>
              Thêm mới
            </div>
          </div>
        </div>
        <div class="script--footer-syntax d_none">
          <div class="title">Cú pháp</div>
          <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <textarea
            name=""
            id=""
            cols="100"
            rows="6"
            placeholder="Nhập các cụm từ tại đây"
          ></textarea>
        </div>
      </div>
    </div>
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

<script type="text/javascript" src="./main_script.script.js"></script>

<style scoped lang="scss">
@import "./main_script.style";
</style>
