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
          <icon-play-button />
        </icon-base>
        <span class="ml_2">Setlive</span>
      </div>
      <div class="script--header-delete ml_auto" @click="showModal = true">
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
            <div class="script--body-tag-edit-title">
              <span>Bộ lọc</span>
            </div>
            <!--add Bộ lọc-->
            <div
              class="filter--body d_flex align_items_center mb_2"
              v-if="showFilter == true"
            >
              <div class="filter--body-option d_flex mr_2">
                <div
                  class="filter--attribute position_relative"
                  @click="showOptionAttribute = !showOptionAttribute"
                >
                  <div class="filter--attribute-name filter--item">
                    attribute
                  </div>
                  <div
                    class="filter--attribute-option position_absolute"
                    v-if="showOptionAttribute == true"
                  >
                    <div class="filter--attribute-item filter--item p_2">
                      sequence
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      sequence
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      sequence
                    </div>
                  </div>
                </div>
                <div
                  class="filter--body-created filter--item"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
                <div
                  class="filter--attribute position_relative"
                  @click="showOptionWith = !showOptionWith"
                >
                  <div class="filter--attribute-name filter--item">is</div>
                  <div
                    class="filter--attribute-option position_absolute"
                    v-if="showOptionWith == true"
                  >
                    <div class="filter--attribute-item filter--item p_2">
                      not
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      start withs
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      less than
                    </div>
                  </div>
                </div>
                <div
                  class="filter--body-created filter--item"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
              </div>
              <div class="filter--icon d_flex ml_auto">
                <div
                        class="filter--icon-plus text_center"
                >
                  and
                </div>
                <div class="filter--icon-remove">
                  <icon-base
                          class="icon-remove"
                          icon-name="remove"
                          width="20"
                          height="20"
                          viewBox="0 0 18 18"
                  >
                    <icon-remove />
                  </icon-base>
                </div>
              </div>
            </div>
            <!--kết thúc add bộ lọc-->
            <!--Bộ lọc-->
            <div class="filter--body d_flex align_items_center">
              <div class="filter--body-option d_flex">
                <div
                  class="filter--attribute position_relative"
                  @click="showOptionAttribute = !showOptionAttribute"
                >
                  <div class="filter--attribute-name filter--item">
                    attribute
                  </div>
                  <div
                    class="filter--attribute-option position_absolute"
                    v-if="showOptionAttribute == true"
                  >
                    <div class="filter--attribute-item filter--item p_2">
                      sequence
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      sequence
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      sequence
                    </div>
                  </div>
                </div>
                <div
                  class="filter--body-created filter--item"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
                <div
                  class="filter--attribute position_relative"
                  @click="showOptionWith = !showOptionWith"
                >
                  <div class="filter--attribute-name filter--item">is</div>
                  <div
                    class="filter--attribute-option position_absolute"
                    v-if="showOptionWith == true"
                  >
                    <div class="filter--attribute-item filter--item p_2">
                      not
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      start withs
                    </div>
                    <div class="filter--attribute-item filter--item p_2">
                      less than
                    </div>
                  </div>
                </div>
                <div
                  class="filter--body-created filter--item"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
              </div>
              <div class="filter--icon d_flex ml_auto">
                <div
                  class="filter--icon-plus text_center"
                  @click="showFilter = !showFilter"
                >
                  <icon-base
                    class="icon-plus"
                    icon-name="plus"
                    width="20"
                    height="20"
                    viewBox="0 0 63 63"
                  >
                    <icon-plus />
                  </icon-base>
                </div>
                <div class="filter--icon-remove">
                  <icon-base
                    class="icon-remove"
                    icon-name="remove"
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                  >
                    <icon-remove />
                  </icon-base>
                </div>
              </div>
            </div>
            <!--kết thúc bộ lọc-->
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
    <option-times />
    <!-- End Option times broadcast-->
    <hr class="hr--border mt_4" />
    <!--Regions Script Footer add element-->
    <add-element />
    <transition name="popup">
      <popup-delete
        v-if="showModal == true"
        :data-theme="currentTheme"
        :popupData="showModal"
        @closeDeletePopup="showModal = $event"
        :descModal="
          'Hành động này sẽ không được lưu lại, bạn có thực sự muốn xóa?'
        "
      />
    </transition>
  </div>
</template>

<script src="./main_broadcast.script.js"></script>

<style scoped lang="scss">
@import "./main_broadcast.style";
</style>
