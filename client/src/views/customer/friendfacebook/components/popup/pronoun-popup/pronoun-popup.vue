<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Danh xưng</div>
          <div class="desc mt_2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        </div>
        <div class="modal--body">
          <input type="text"
                  class="modal--body-input" 
                  placeholder="Nhập danh xưng"
                  @click.stop="showSuggestion"
                  v-model="pronounInput"/>
          <div class="suggestion--list" 
                v-if="isShowSuggestion && filterSuggestionList().length > 0"
          >
            <VuePerfectScrollbar class="scroll">
              <div class="suggestion--list-item"
                    v-for="(item, index) in filterSuggestionList()"
                    :key="index"
                    @click="selectPronoun(item)"
              >{{ item }}
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-contact">
            LƯU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: ["isShowPronounPopup"],

  data() {
    return {
      isShowSuggestion: false,
      pronounsArr: ["Bạn", "Anh", "Chị", "Ông", "Bà"],
      pronounInput: '',
    };
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    showSuggestion(){
      this.isShowSuggestion = true;
    },
    filterSuggestionList() {
      return this.pronounsArr.filter(item => {
        return item.toLowerCase().includes(this.pronounInput.toLowerCase())
      })
    },
    selectPronoun(val) {
      this.pronounInput = val;
      this.isShowSuggestion = false;
    }
  },

  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
@import "./pronoun-popup"
</style>
