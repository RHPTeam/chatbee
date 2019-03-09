<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts p_4">
    <!--Regions Scripts Header-->
    <div class="script--header d_flex align_items_center">
      <h1 class="script--header-title">Mua cam</h1>
      <div class="script--header-copy-link">
        <icon-base
          class="icon--base"
          icon-name="icon-copy"
          width="26"
          height="26"
          viewBox="0 0 482.8 482.8"
        >
          <icon-copy />
        </icon-base>
      </div>
      <div class="broad--keep-live ml_2">
        <icon-base
          class="icon--base"
          icon-name="icon-copy"
          width="14"
          height="16"
          viewBox="0 0 13.955 16"
        >
          <icon-play-button /> </icon-base
        >
        <span class="ml_2">Setlive</span>
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
      <!--add timer-->
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
      <!--end add timer-->
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
            <div class="script--body-tag-item r align_items_center mt_3">
              <div>
                <div
                  class=""
                  name="text"
                  placeholder="eg. Nhu cầu"
                  contenteditable="true"
                >
                  eg.Mua Cam
                </div>
              </div>
              <div>
                <div
                  class=""
                  name="value"
                  placeholder="Nhập giá trị"
                  contenteditable="true"
                >
                  20
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
            <!--List user connect-->
            <div class="option--user-tag mt_4">
              <div>122 người có thể truy cập</div>
              <div class="option--user-list d_flex align_items_center mt_2">
                <div class="option--user-item item mr_2">
                  <!--backgrounf images-->
                </div>
                <div class="option--user-more item text_center ml_auto">
                  +110
                </div>
              </div>
            </div>
            <!--End list user connect-->
          </div>
        </div>
      </div>
    </div>
    <!--Option times broadcast-->
    <option-times/>
    <!-- End Option times broadcast-->
    <hr class="hr--border mt_4">
    <!--Regions Script Footer add element-->
    <add-element/>
  </div>
</template>

<script type="text/javascript" src="./main_broadcast.script.js"></script>

<style scoped lang="scss">
@import "./main_broadcast.style";
</style>
