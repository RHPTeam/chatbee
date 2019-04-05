<template>
  <div class="modal--wrapper" v-if="status === true">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header text_center"></div>
        <div class="modal--body">
          <form
            @submit.prevent="sendFile"
            class="zone"
            enctype="multipart/form-data"
          >
            <div class="field">
              <div class="file box primary">
                <label class="file--label" style="cursor: pointer">
                  <input
                    type="file"
                    ref="file"
                    @change="selectFile"
                    style="display: none"
                  />
                  <span
                    class="file--cta d_flex justify_content_center flex_column"
                  >
                    <span class="file--cta-icon">
                      <icon-base
                        icon-name="icon-upload-image"
                        class="icon-sort-down"
                        width="90"
                        height="90"
                        viewBox="0 0 22 22"
                      >
                        <icon-upload-image />
                      </icon-base>
                    </span>
                    <span
                      class="file--cta-label"
                      style="font-size: 1.25rem; font-weight: 700"
                      >Chọn một ảnh...</span
                    >
                  </span>
                </label>
              </div>
            </div>
          </form>

          <button
            type="button"
            class="btn btn_danger mt_3"
            @click.prevent="closeZone"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
