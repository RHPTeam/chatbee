<template>
  <div>
    <contenteditable
      tag="div"
      :contenteditable="true"
      v-model="hehe"
      @keyup="up"
      @keydown="down"
    />
    <span>{{ hehe }}</span>
  </div>
</template>

<script>
import Contenteditable from "../../../components/contenteditable/index";
let typingTimer;
let doneTypingInterval = 600;
export default {
  data() {
    return {
      hehe: "cak"
    };
  },
  methods: {
    up() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    },
    down() {
      clearTimeout(typingTimer);
    },
    doneTyping() {
      console.log(this.hehe);
    }
  },
  components: { Contenteditable }
};
</script>
