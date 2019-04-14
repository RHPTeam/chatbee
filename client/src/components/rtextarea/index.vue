<template>
  <div class="rtextarea" rhp-suggest-multiline>
    <contenteditable
      class="textarea"
      tag="div"
      :contenteditable="true"
      v-model="text"
      :noHTML="false"
      @keydown="handleDropdown"
    />
    <span class="max">500</span>
    <div class="wrap--mask">
      <div class="mask" v-html="text"></div>
    </div>
    <ul class="box">
      <li class="box--item attribute">
        <span>mua tao</span>
      </li>
      <li class="box--item default">
        <span>danh xung</span>
      </li>
      <li class="box--item default">
        <span>ho ten</span>
      </li>
    </ul>
    <span v-html="text"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    handleDropdown(e) {
      console.log(e)
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
