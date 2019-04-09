<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts">
    <!--Component Loading-->
    <loading-component
      v-if="this.$store.getters.statusGroupBlocks === 'loading'"
    />
    <!--Regions Scripts Header-->
    <div v-else>
      <div class="script--header d_flex align_items_center">
        <contenteditable
          class="script--header-title"
          tag="div"
          :contenteditable="true"
          v-model="block.name"
          @keyup="upTypingText('nameblock', block)"
          @keydown="clear"
        />
        <div class="script--header-copy-link disabled--icon">
          <icon-base
            class="disable"
            icon-name="copy"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-copy />
          </icon-base>
          <icon-base
            class="disable"
            icon-name="link"
            width="26"
            height="26"
            viewBox="0 0 482.8 482.8"
          >
            <icon-link />
          </icon-base>
        </div>
        <div
          class="script--header-delete ml_auto"
          @click="isDeletePopup = true"
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
              <li class="disabled--icon">
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
              <li class="disabled--icon">
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
              <li @click="isDeletePopup = true">
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
      <!--Start: Regions Scripts Body-->
      <div class="script--body">
        <div v-for="(item, index) in block.contents" :key="index">
          <!--Start: Add text-->
          <div v-if="item.typeContent === 'text'">
            <div class="script--body-text mt_3">
              <div
                class="script--body-delete"
                @click="isDeleteItemBlock = true"
              >
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                >
                  <icon-remove />
                </icon-base>
              </div>
              <div class="script--body-move d_none">
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                >
                  <icon-move />
                </icon-base>
              </div>
              <div class="script--body-text-edit position_relative">
                <contenteditable
                  class="script--header-title"
                  tag="div"
                  :contenteditable="true"
                  v-model="item.valueText"
                  @keyup="upTypingText('updateitem', item)"
                  @keydown="clear"
                  v-click-outside="closeSuggestAttributeInItem"
                />
                <div
                  class="list--suggest position_absolute"
                  v-if="showSuggestAttribute === true"
                >
                  <VuePerfectScrollbar class="suggest">
                    <div
                      class="suggest--item"
                      v-for="(list, index) in resultFilterAttr"
                      :key="`l-${index}`"
                      @click="attachValue(list, item)"
                    >
                      {{ list.name }}
                    </div>
                    <div
                      class="suggest--item"
                      v-for="(fixed, index) in dataFixed"
                      :key="`f-${index}`"
                      @click="attachValueFixed(fixed, item)"
                    >
                      {{ fixed.value }}
                    </div>
                  </VuePerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
          <!--End: Add text-->
          <!--Start: add images-->
          <div v-if="item.typeContent === 'image'">
            <div class="script--body-image">
              <div
                class="script--body-delete"
                @click="isDeleteItemBlock = true"
              >
                <icon-base
                  icon-name="remove"
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                >
                  <icon-remove />
                </icon-base>
              </div>
              <div class="script--body-move d_none">
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
                  :src="item.valueText"
                  alt="Image for item block"
                  width="280"
                  height="207"
                />
              </div>
              <div class="script--body-upload-image">
                <form enctype="multipart/form-data" @submit.prevent="sendFile">
                  <input
                    type="file"
                    ref="file"
                    @change="selectFile(item._id)"
                    id="upload_image"
                  />
                </form>
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
          <!-- End: add images-->
          <!--Start: add timer-->
          <add-timer :item="item" :block="block" />
          <!--Start: add timer-->
          <!--Start: Add Tag-->
          <div v-if="item.typeContent === 'tag'">
            <add-tag :item="item" :content="block" />
          </div>
          <!--End: Add Tag-->
          <!--Start: Subscribe-->
          <div v-if="item.typeContent === 'subscribe'">
            <subcrible
              :item="item"
              :content="block"
              @updateItemFromMiddleComponent="block.contents[index] = $event"
            />
          </div>
          <!--End: Subscribe-->
          <!--Start: Unsubcrible-->
          <div v-if="item.typeContent === 'unsubscribe'">
            <un-subcrible :item="item" :content="block" />
          </div>
          <!--End: Unsubcrible-->
          <!--Start:Delete Item Popup-->
          <delete-item
            v-if="isDeleteItemBlock === true"
            desc="Bạn có thực sự muốn xóa nội dung kịch bản này không?"
            :content="item._id"
            :block="block._id"
            target="itemblock"
            @close="isDeleteItemBlock = $event"
          />
          <!--End: Delete Item Popup-->
        </div>
      </div>
      <!--Regions Script Footer-->
      <div class="script--footer">
        <div class="script--footer-addelm">
          <div class="title">Thêm phần tử</div>
          <div class="gr-addelm d_flex align_items_center">
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
                <icon-text /> </icon-base
              >Văn bản
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
                <icon-image /> </icon-base
              >Hình ảnh
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
                <icon-sand-clock /> </icon-base
              >Thời gian
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
                <icon-plus /> </icon-base
              >Thêm
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
            name
            id
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
        :content="block._id"
        :data-theme="currentTheme"
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @showAddAttribute="showAddAttribute = $event"
        @showSubcrible="showSubcrible = $event"
        @showUnSubcrible="showUnSubcrible = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
      />
    </transition>
    <!--Delete popup-->
    <delete-popup
      v-if="isDeletePopup === true"
      desc="Bạn có thực sự muốn xóa kịch bản này không?"
      :content="block._id"
      target="block"
      @close="isDeletePopup = $event"
    />
  </div>
</template>

<script src="./main_script.script.js"></script>

<style scoped lang="scss">
@import "./main_script.style";
</style>
