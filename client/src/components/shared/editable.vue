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
      isLocked: false,
      textTemp: ""
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
    async changeText() {
      await this.$emit("input", this.$el.innerHTML);
      this.textTemp = this.$el.innerHTML
    },
    updateText() {
      if (this.type === "syntax") {
        this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
      } else if (this.type === "itemSyntax") {
        this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
      } else if (this.type === "block") {
        this.$store.dispatch("updateBlock", this.$store.getters.block)
      }
      else if (this.type === "itemBlock") {
        const objSender = {
          itemId: this.target,
          valueText: this.textTemp,
          block: this.$store.getters.block
        };
        this.$store.dispatch("updateItemBlock", objSender);
      }
      else if (this.type === "itemSequence") {
        const objSender = {
          itemId: this.target,
          value: this.textTemp,
          block: this.$store.getters.block
        };
        this.$store.dispatch("updateItemSqc", objSender);
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
