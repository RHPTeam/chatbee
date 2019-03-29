<template>
  <div class="input textarea cf" @click.prevent="focus" v-click-outside="close">
    <ul class="list">
      <span v-if="arrValueConverted.length === 0"></span>
      <span v-else>
        <li
          class="item"
          v-for="(item, index) in arrValueConverted"
          :key="index"
          @dblclick.prevent="removeItem(index)"
        >
          {{ item }}
        </li>
      </span>
    </ul>
    <div class="result" v-if="isShow === true">
      <ul class="l">
        <li class="l--item" v-for="(item, index) in content" :key="index">
          <div class="l--item-header">{{ item.name }}</div>
          <ul class="l--sub">
            <li
              class="l--sub-item"
              v-for="(block, index) in item.blocks"
              :key="`bs-${index}`"
              @click="addItem(block._id)"
            >
              {{ block.name }}
            </li>
          </ul>
        </li>
<!--        <li-->
<!--          class="l&#45;&#45;item"-->
<!--          v-for="(item, index) in contentOther"-->
<!--          :key="`s-${index}`"-->
<!--        >-->
<!--          <div class="l&#45;&#45;item-header">{{ item.name }}</div>-->
<!--          <ul class="l&#45;&#45;sub">-->
<!--            <li-->
<!--              class="l&#45;&#45;sub-item"-->
<!--              v-for="(ise, index) in item.sequences"-->
<!--              :key="`b-${index}`"-->
<!--            >-->
<!--              {{ ise._block.name }}-->
<!--            </li>-->
<!--          </ul>-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["placeholder", "arrValue", "type", "content", "contentOther"],
  data() {
    return {
      newValue: "",
      isShow: false
    };
  },
  created() {
    this.$store.dispatch("getBlocks");
  },
  computed: {
    arrValueConverted() {
      let result = this.arrValue;
      if (result === undefined || result === "") {
        return (result = []);
      } else {
        const results = [];
        const arr = result.split(",");
        let arrOther = this.blocks;
        arr.map(id => {
          return arrOther.map(item => {
            if (item._id === id) results.push(item.name);
          });
        });
        return results;
      }
    },
    blocks() {
      return this.$store.getters.blocks;
    },
    syntax() {
      return this.$store.getters.syntax;
    }
  },
  methods: {
    focus() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    async addItem(id) {
      let other = this.arrValue.split(",");
      other.push(id);
      this.$emit("update", other.toString());
      this.$store.dispatch("updateSyntax", this.syntax);
    },
    removeItem(index) {
      let other = this.arrValue.split(",");
      other.splice(index, 1);
      this.$emit("update", other.toString());
      this.$store.dispatch("updateSyntax", this.syntax);
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

  .result {
    background: #ffffff;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    box-shadow: 0 8px 32px 0 rgba(32, 32, 32, 0.08),
      0 0 0 1px rgba(16, 16, 16, 0.04);
    position: absolute;
    left: 0;
    top: 100%;
    transition: 0.3s ease-in-out;
    width: 100%;
    z-index: 999;
    .l,
    .l--sub {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    .l {
      &--item {
        &-header {
          color: #c6c6c6;
          font-size: 13px;
          padding: 0 1rem;
        }
      }
      &--sub {
        padding: 0 1rem;
        &-item {
          color: #101010;
          cursor: pointer;
          font-size: 15px;
          margin: 0 -1rem;
          padding: 0 1rem;
          transition: 0.3s ease-in-out;
          &:hover,
          &:focus,
          &:active {
            color: #ffffff;
            background-color: #ffba3c;
          }
        }
      }
    }
  }
}
</style>
