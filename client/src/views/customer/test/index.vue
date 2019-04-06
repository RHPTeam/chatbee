<template>
  <div>
    <contenteditable
      tag="div"
      :contenteditable="true"
      v-model="hehe"
      @keydown="inputHandler"
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
    },
    inputHandler(e) {
      console.log(e);
      if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        console.log("send file");
      } else {
        console.log("shift enter");
      }
    }
  },
  components: { Contenteditable }
};
</script>
