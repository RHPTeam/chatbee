<!--Template Main Scripts Desktop-->
<template>
  <div class="scripts position_fixed p_4">
    <!--Regions Scripts Header-->
    <div
      class="script--header d_flex align_items_center justify_content_between"
    >
      <div class="auto--header-back mr_2" @click="closeMainBroad">
        <icon-base
          icon-name="icon-arrow"
          width="24"
          height="24"
          viewBox="0 0 25 25"
        >
          <icon-arrow-left />
        </icon-base>
      </div>
      <div class="script--header-title">Nội dung</div>
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
      <div class="main--head">
        <div class="main--head-content d_flex align_items_center">
          <div class="main--header-title text_left p_3">Mua cam</div>
          <div class="main--header-copy ml_auto text_right disable">
            <icon-base
              icon-name="icon-copy"
              width="26"
              height="26"
              viewBox="0 0 482.8 482.8"
            >
              <icon-copy />
            </icon-base>
          </div>
        </div>
      </div>
      <div class="mt_4">
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
            <!--Them Bộ lọc-->
            <div class="filter--body" v-if="showFilter == true">
              <div class="filter--body-option">
                <div
                  class="filter--attribute position_relative mb_2"
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
                  class="filter--body-created filter--item mb_2"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
                <div
                  class="filter--attribute position_relative mb_2"
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
                  class="filter--body-created filter--item mb_2"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
              </div>
              <hr class="hr--border mt_4 mb_4" />
            </div>
            <!--kết thúc them bộ lọc-->
            <!--Bộ lọc-->
            <div class="filter--body">
              <div class="filter--body-option">
                <div
                  class="filter--attribute position_relative mb_2"
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
                  class="filter--body-created filter--item mb_2"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
                <div
                  class="filter--attribute position_relative mb_2"
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
                  class="filter--body-created filter--item mb_2"
                  contenteditable="true"
                  data-placeholder="lead status"
                ></div>
              </div>
              <div
                class="filter--icon ml_auto mt_4"
                @click="showFilter = !showFilter"
              >
                <span class="filter--icon-plus">
                  <icon-base
                    class="icon-plus"
                    icon-name="plus"
                    width="20"
                    height="20"
                    viewBox="0 0 80 80"
                  >
                    <icon-plus />
                  </icon-base>
                  Thêm thẻ
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
                <div class="option--user-more item text_center">
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
      <delete-popup
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

<script>
import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
import IconCopy from "@/components/icons/IconCopy";
import IconPlus from "@/components/icons/IconPlus";
import IconTag from "@/components/icons/IconTag";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import OptionTimes from "./cp_mobile/option_time_mobile";
import AddElement from "./cp_mobile/add_element_mobile";
export default {
  props: ["showBroadMobile"],
  data() {
    return {
      showOptionAttribute: false,
      showOptionWith: false,
      showFilter: false,
      showModal: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeMainBroad() {
      this.$emit("closeMainBroad", false);
    }
  },
  components: {
    IconBase,
    IconCopy,
    IconRemove,
    IconTag,
    IconPlus,
    OptionTimes,
    AddElement,
    IconArrowLeft
  }
};
</script>

<style scoped lang="scss">
@import "./index_mobile.style";
</style>
