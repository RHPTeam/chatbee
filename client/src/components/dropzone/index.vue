<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header text_center">
          <h2 class="modal--title">Tải ảnh lên</h2>
        </div>
        <div class="modal--body">
          <form
            @submit.prevent="sendFile"
            class="zone"
            enctype="multipart/form-data"
          >
            <div class="field">
              <div class="file box primary">
                <label class="file--label">
                  <input type="file" ref="file" @change="selectFile" />
                  <span class="file--cta">
                    <span class="file--cta-icon">
                      <icon-base
                        icon-name="icon-upload-image"
                        class="icon-sort-down"
                        width="30"
                        height="30"
                        viewBox="0 0 40 40"
                      >
                        <icon-upload-image />
                      </icon-base>
                    </span>
                    <span class="file--cta-label">Chọn một ảnh...</span>
                  </span>
                  <span class="file--name" v-if="fileAvatar">
                    {{ fileAvatar.name }}
                  </span>
                </label>
              </div>
            </div>
            <button type="submit" class="btn--modal btn-add">
              Accept
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
