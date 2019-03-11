<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts p_4">
    <!--Regions Scripts Header-->
    <div class="script--header d_flex align_items_center">
      <h1 class="script--header-title">Deliver your message now</h1>
      <div class="broad--keep-live ml_2">
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
            <!--Bộ lọc-->
            <div class="filter--body d_flex align_items_center">
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
              <div class="filter--icon ml_auto">
                <span class="filter--icon-plus">
                  <icon-base
                    class="icon-plus"
                    width="20"
                    height="20"
                    viewBox="0 0 68 68"
                  >
                    <icon-plus />
                  </icon-base>
                </span>
                <span class="filter--icon-remove">
                  <icon-base
                    class="icon-remove"
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                  >
                    <icon-remove />
                  </icon-base>
                </span>
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
    <hr class="hr--border mt_4" />
    <!--Regions Script Footer add element-->
    <add-element />
  </div>
</template>

<script type="text/javascript" src="./main_broadcast.script.js"></script>

<style scoped lang="scss">
@import "./main_broadcast.style";
</style>
