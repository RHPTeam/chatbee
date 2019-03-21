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
                  @click="isShowSuggestion = !isShowSuggestion"
                  v-model="pronounInput"/>
          <div class="suggestion--list" v-if="isShowSuggestion">
            <div class="suggestion--list-item"
                  v-for="(item, index) in filterSuggestionList()"
                  :key="index">{{ item }}
            </div>
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
    filterSuggestionList() {
      return this.pronounsArr.filter(item => {
        return item.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  components: {}
};
</script>

<style lang="scss" scoped>
@import "./pronoun-popup"
</style>
