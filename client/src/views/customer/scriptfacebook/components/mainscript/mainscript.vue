<template>
  <div :data-theme="currentTheme" class="scripts">
    <div class=" script--header d_flex align_items_center">
      <h1 class="script--header-title">Mua cam</h1>
      <div class="script--header-copy-link">
        <icon-base
          class="icon--base"
          width="26"
          height="26"
          viewBox="0 0 482.8 482.8"
        >
          <icon-copy/>
        </icon-base>
        <icon-base
          class="icon--base"
          width="26"
          height="26"
          viewBox="0 0 482.8 482.8"
        >
          <icon-link/>
        </icon-base>
      </div>
      <div class="script--header-delete ml_auto">
        <icon-base
          icon-name="remove"
          width="26"
          height="26"
          viewBox="0 0 15 15"
        >
          <icon-remove/>
        </icon-base>
      </div>
    </div>
    <div class="script--body">
      <div v-if="textList.length > 0">
        <div
          class="script--body-text"
          v-for="(item, index) in textList"
          :key="index"
        >
          <div class="delete" @click="removeText(index)">
            <icon-base
              icon-name="remove"
              width="26"
              height="26"
              viewBox="0 0 15 15"
            >
              <icon-remove/>
            </icon-base>
          </div>
          <div>
            <!--<div contenteditable="true">example</div>-->
            <textarea
              name=""
              cols="30"
              rows="10"
              v-model="textValue"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="script--body-image">
        <div class="delete">
          <icon-base
            icon-name="remove"
            width="26"
            height="26"
            viewBox="0 0 15 15"
          >
            <icon-remove/>
          </icon-base>
        </div>
        <div>
          <input type="file" name="upload_image" id="upload_image"/>
        </div>
      </div>
      <div class="script--body-timer">
        <div class="delete">
          <icon-base
            icon-name="remove"
            width="26"
            height="26"
            viewBox="0 0 15 15"
          >
            <icon-remove/>
          </icon-base>
        </div>
        <div>
          <input type="number"/>
          <select name="" id="choose_timer">
            <option value="seconds">Giây</option>
            <option value="minutes">Phút</option>
            <option value="hour">Giờ</option>
          </select>
        </div>
      </div>
    </div>

    <div class="script--footer">
      <div class="script--footer-addelm">
        <div class="title">Thêm phần tử</div>
        <div class="gr-addelm d_flex align_items_center ">
          <div
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
            @click.prevent="addText"
          >
            <icon-base
              class="icon-text"
              width="20"
              height="20"
              viewBox="0 0 13.53 20.11"
            >
              <icon-text/>
            </icon-base>
            Văn bản
          </div>

          <div
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
          >
            <icon-base
              class="icon-image"
              width="20"
              height="20"
              viewBox="0 0 26 26"
            >
              <icon-image/>
            </icon-base>
            Hình ảnh
          </div>

          <div
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
          >
            <icon-base
              class="icon-sand-clock"
              width="20"
              height="20"
              viewBox="0 0 14.41 20.14"
            >
              <icon-sand-clock/>
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
              <icon-tag/>
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

<script type="text/javascript" src="./mainscript.script.js"></script>

<style scoped lang="scss">
@import "mainscript.style";
</style>
