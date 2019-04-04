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
// import AttributeService from "@/services/modules/attributes.service";

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
    type: String,
    attribute: null
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
      this.textTemp = this.$el.textContent;
    },
    async updateText() {
      if (this.type === "nameattribute") {
        this.$store.dispatch("updateAttribute", this.attribute);
      } else if (this.type === "valueattribute") {
        this.$store.dispatch("updateAttribute", this.attribute);
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
