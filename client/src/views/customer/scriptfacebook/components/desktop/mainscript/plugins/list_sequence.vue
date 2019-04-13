<template>
  <div class="input textarea cf mb_0" :data-theme="currentTheme">
    <ul class="list">
      <li class="d_flex">
        <div
          class="left"
          v-if="sequence.valueText === 'undefined' || sequence.valueText === ''"
        ></div>
        <div
          v-else
          class="right item d_flex align_items_center position_relative"
          v-for="(item, index) in nameGroupSequence"
          :key="`a-${index}`"
        >
          {{ item }}
          <div class="remove position_absolute" @click="removeItem(index)">
            <icon-base
              icon-name="remove"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
      </li>
      <li class="position_relative">
        <div
          class="item--input"
          @click="openSuggestNameSequence"
          v-click-outside="closesSuggetsNameSequence"
        >
          <span>Nhấn để chọn nhóm</span>
        </div>
        <div
          class="suggest--sequence position_absolute"
          v-if="showSuggetsNameSequence === true"
        >
          <div
            class="item--suggest"
            v-for="(item, index) in listSenquence"
            :key="`s-${index}`"
            @click="addNameSequence(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SequenceService from "@/services/modules/sequence.service";

export default {
  props: {
    sequence: Object,
    block: Object
  },
  data() {
    return {
      listSenquence: null,
      showSuggetsNameSequence: false
    };
  },
  async created() {
    await this.$store.dispatch("getSequence");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    // Show name sequence from id
    nameGroupSequence() {
      let result = this.sequence.valueText;
      if (result === undefined || result === "") {
        return (result = []);
      } else {
        const results = [];
        const arr = result.split(",");
        if (Object.entries(this.listGroupSequence).length === 0) return;
        let arrOther = this.listGroupSequence;
        arr.map(id => {
          return arrOther.map(item => {
            if (item._id === id) results.push(item.name);
          });
        });
        return results;
      }
    },
    //get name group sequence
    listGroupSequence() {
      return this.$store.getters.groupSqc;
    }
  },
  methods: {
    // attach name sequence item to array
    addNameSequence(item) {
      let other = this.sequence.valueText.split(",");
      other.push(item._id);
      if (this.sequence.valueText.length === 0) {
        this.sequence.valueText += item._id;
      } else {
        this.sequence.valueText += `,${item._id}`;
      }
      let otherChecked = other.toString();
      const objectReStructure = {
        _id: this.sequence._id,
        typeContent: this.sequence.typeContent,
        valueText: otherChecked
      };
      if (otherChecked.charAt(0) === ",") {
        otherChecked = otherChecked.substr(1);
        objectReStructure.valueText = otherChecked;
        console.log(objectReStructure);
        this.$emit("update", objectReStructure);
      } else {
        console.log(objectReStructure);
        this.$emit("update", objectReStructure);
      }

      const dataSender = {
        valueText: [item._id],
        itemId: this.sequence._id,
        block: this.block
      };
      this.$store.dispatch("updateItemBlock", dataSender);
    },
    // Delete item sequence
    removeItem(index) {
      // Get id follow index
      const sequencesID = this.sequence.valueText.split(",");
      console.log(sequencesID)
      console.log(index)
      // remove item follow index
      const dataSender = {
        sequenceId: sequencesID[index],
        itemId: this.sequence._id,
        blockId: this.block._id
      };
      this.$store.dispatch("deleteItemSequenceInBlock", dataSender);
      sequencesID.splice(index, 1);
      this.sequence.valueText = sequencesID.toString();
    },
    // open suggest name sequence when click on input
    async openSuggestNameSequence() {
      this.showSuggetsNameSequence = true;
      const resultSequence = await SequenceService.index();
      this.listSenquence = resultSequence.data.data;
    },
    // close list suggest name sequence
    closesSuggetsNameSequence() {
      this.showSuggetsNameSequence = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  border: 1px solid #e4e4e4;
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
      .item {
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
        &:hover,
        &:focus,
        &:active,
        &:visited {
          > .remove {
            display: block;
            transition: all 1s ease;
          }
        }
        .remove {
          display: none;
          top: -5px;
          right: -0.5rem;
        }
      }
      .item--input {
        background-color: transparent;
        border: none;
        font-size: 14px;
        font-weight: 300;
        outline: none;
        padding: 8px;
        float: left;
        height: 40px;
        margin-top: -5px;
        width: 200px;
        max-width: 100%;
        text-transform: lowercase;
        span {
          opacity: 0.6;
        }
      }
    }
    .suggest--sequence {
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: 6px;
      box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.16);
      top: 115%;
      z-index: 99;
      .item--suggest {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        padding: 0 1rem;
        text-transform: lowercase;
        &:hover {
          background-color: #ffb94a;
          color: #ffffff;
        }
      }
    }
  }
}

/* ChangeColor */

// Light
.textarea[data-theme="light"] {
  background: #ffffff;
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
  .suggest--sequence {
    background-color: #27292d;
  }
  .item--suggest {
    color: #ffffff;
    &:hover,
    &:active,
    &:focus,
    &:visited {
      background-color: #2f3136;
    }
    &:first-child {
      &:hover,
      &:active,
      &:focus,
      &:visited {
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
      }
    }
    &:last-child {
      &:hover,
      &:active,
      &:focus,
      &:visited {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }
  }
}
</style>
