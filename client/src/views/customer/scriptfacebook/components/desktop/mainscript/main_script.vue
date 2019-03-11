<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts">
    <!--Regions Scripts Header-->
    <div class=" script--header d_flex align_items_center">
      <h1 class="script--header-title">Mua cam</h1>
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
      <div class="script--header-delete ml_auto">
        <icon-base
          icon-name="remove"
          width="26"
          height="26"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <!--Regions Scripts Body-->
    <div class="script--body">
      <div v-if="textList.length > 0">
        <div
          class="script--body-text"
          v-for="(item, index) in textList"
          :key="index"
        >
          <div class="script--body-delete" @click="removeText(index)">
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
            <div contenteditable="true" v-model="textValue">Nhập văn bản</div>
          </div>
        </div>
      </div>
      <div v-if="imageList.length > 0">
        <div
          class="script--body-image"
          v-for="(item, index) in imageList"
          :key="index"
        >
          <div class="script--body-delete" @click="removeText(index)">
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
      <div v-if="timerList.length > 0">
        <div
          class="script--body-timer"
          v-for="(item, index) in timerList"
          :key="index"
        >
          <div class="script--body-delete" @click="showModal = true">
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
      <div>
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
            Set a value for an existing user attribute or add a new one. Use it
            to segment users for broadcast subscriptions, to define bot flow
            scenarios, or to analyze users' activity. Note that you can use
            arithmetic expressions and attributes in the Value field.
          </div>
          <div class="script--body-tag-list">
            <div class="script--body-tag-edit-title d_flex ">
              <span>Tên thẻ</span>
              <span>Giá trị</span>
            </div>
            <div class="script--body-tag-item r align_items_center">
              <div>
                <div
                  class=""
                  name="text"
                  placeholder="eg. Nhu cầu"
                  contenteditable="true"
                >
                  eg. Nhu cầu
                </div>
              </div>
              <div>
                <div
                  class=""
                  name="value"
                  placeholder="Nhập giá trị"
                  contenteditable="true"
                >
                  Nhập giá trị
                </div>
              </div>
              <span>
                <icon-base
                  class="icon--cancel"
                  icon-name="cancel"
                  width="10"
                  height="10"
                  viewBox="0 0 15.642 15.642"
                >
                  <icon-cancel />
                </icon-base>
              </span>
            </div>
            <div class="script--body-tag-footer">
              <div class="script--body-tag-add">
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
            @click.prevent="addElm('text')"
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
            @click.prevent="addElm('image')"
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
            @click.prevent="addElm('timer')"
          >
            <icon-base
              class="icon-sand-clock"
              width="20"
              height="20"
              viewBox="0 0 14.41 20.14"
            >
              <icon-sand-clock />
            </icon-base>
            Thời gian chờ
          </div>

          <div
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
          >
            <icon-base
              class="icon-tag"
              width="20"
              height="20"
              viewBox="0 0 337.7 487.85"
            >
              <icon-tag />
            </icon-base>
            Thẻ
          </div>
        </div>
      </div>
      <div class="script--footer-syntax">
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
</template>

<script type="text/javascript" src="./main_script.script.js"></script>

<style scoped lang="scss">
@import "./main_script.style";
</style>
