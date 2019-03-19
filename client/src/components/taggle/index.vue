<template>
  <div class="input textarea cf" @click.prevent="focus">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in arrValue"
        :key="index"
        @dblclick.prevent="removeItem(index)"
      >
        {{ item }}
      </li>
      <li>
        <input
          type="text"
          class="item--input"
          ref="valueText"
          v-model="newValue"
          @keyup.enter="addItem"
          :placeholder="placeholder"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    arrValue: Array,
    type: String
  },
  data() {
    return {
      newValue: ""
    };
  },
  async created() {},
  computed: {},
  methods: {
    focus() {
      this.$refs.valueText.focus();
    },
    async addItem() {
      await this.arrValue.push(this.newValue);
      await this.$emit("update", this.arrValue);
      this.newValue = "";
      if (this.type === "syntax") {
        await this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
      }
    },
    async removeItem(index) {
      await this.arrValue.splice(index, 1);
      await this.$emit("update", this.arrValue);
      if (this.type === "syntax") {
        await this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  background: #fdfdfd;
  border: 0;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.7);
  color: #555;
  cursor: text;
  margin-bottom: 2em;
  min-height: 60px;
  padding: 8px;
  position: relative;
  transition: all 0.25s;
  &.input {
    height: auto;
  }
  &.cf:before,
  &.cf:after {
    clear: both;
    content: "";
    display: block;
    line-height: 0;
  }
  .list {
    float: left;
    list-style-image: none;
    list-style-position: outside;
    margin: 0;
    padding-left: 0;
    width: 100%;
    li {
      display: inline-block;
      float: left;
      font-weight: 500;
      margin-bottom: 5px;
      white-space: nowrap;
      &.item {
        animation-duration: 1s;
        animation-fill-mode: both;
        background: #e2e1df;
        border-radius: 3px;
        cursor: pointer;
        line-height: 1.2;
        margin-right: 8px;
        padding: 5px 10px;
        position: relative;
        transition: all 0.3s;
      }
      .item--input {
        border: none;
        font-size: 16px;
        font-weight: 300;
        outline: none;
        padding: 8px;
        float: left;
        margin-top: -5px;
        background: none;
        max-width: 100%;
        width: 130px;
      }
    }
  }
}
</style>
