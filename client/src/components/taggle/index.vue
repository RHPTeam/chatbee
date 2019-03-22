<template>
  <div
    class="input textarea cf"
    @click.prevent="focus"
    :data-theme="currentTheme"
  >
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
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
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
  border: 0;
  border-radius: 10px;
  box-shadow: none;
  cursor: text;
  margin-bottom: 2em;
  min-height: 60px;
  padding: 8px;
  position: relative;
  transition: all 0.25s;
  &.input {
    height: auto;
    min-height: 47px;
    padding-bottom: 0;
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
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 1.2;
        margin-right: 8px;
        padding: 7.5px 10px;
        position: relative;
        transition: all 0.3s;
      }
      .item--input {
        background-color: transparent;
        border: none;
        font-size: 14px;
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

/* ChangeColor */

// Light
.textarea[data-theme="light"] {
  background: #f7f7f7;
  color: #444;
  input {
    color: #444;
  }
  .item {
    background: #e2e1df;
  }
}

//Dark
.textarea[data-theme="dark"] {
  background: #2f3136;
  color: #ffffff;
  input {
    color: #f7f7f7;
  }
  .item {
    background: #27292d;
  }
}
</style>
