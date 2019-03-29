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
    valueNumber: Number,
    sequenceId: String,
    edit: {
      type: Boolean,
      default: true
    },
    target: String,
    type: String
  },
  data() {
    return {
      innerText: this.value || this.valueNumber,
      isLocked: false,
      textTemp: ""
    };
  },
  watch: {
    value() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    },
    valueNumber() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.valueNumber();
      }
    }
  },
  methods: {
    async changeText() {
      await this.$emit("input", this.$el.innerHTML);
      this.textTemp = this.$el.innerHTML;
    },
    updateText() {
      if (this.type === "timesequence") {
        const objSender = {
          itemId: this.target,
          value: this.textTemp,
          sequenceId: this.sequenceId
        };
        console.log(objSender);
        this.$store.dispatch("updateNumberTimeItemSqc", objSender);
      } else if (this.type === "desctime") {
        const objSender = {
          itemId: this.target,
          value: this.textTemp,
          sequenceId: this.sequenceId
        };
        console.log(objSender);
        this.$store.dispatch("updateDescTimeItemSqc", objSender);
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
