<template>
  <div
    class="editable"
    v-text="innerText"
    :contenteditable="edit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
    v-debounce.500="updateText"
  ></div>
</template>
<script>
export default {
  name: "editDiv",
  props: {
    value: {
      type: String,
      default: ""
    },
    edit: {
      type: Boolean,
      default: true
    },
    target: String,
    type: String
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    };
  },
  watch: {
    value() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    changeText() {
      this.$emit("input", this.$el.innerHTML);
    },
    updateText() {
      if (this.type === "syntax") {
        const obj = {
          title: this.value,
          id: this.target
        };
        this.$store.dispatch("updateSyntax", obj);
      }
    }
  }
};
</script>
<style lang="scss">
.editable {
  height: 100%;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  &[contenteditable="true"] {
    user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>
