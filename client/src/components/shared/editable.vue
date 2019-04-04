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
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
import AttributeService from "@/services/modules/attributes.service";

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
      this.textTemp = this.$el.textContent;
    },
    async updateText() {
      if (this.type === "syntax") {
        this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
      } else if (this.type === "itemSyntax") {
        this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
      } else if (this.type === "block") {
        this.$store.dispatch("updateBlock", this.$store.getters.block);
      } else if (this.type === "itemBlock") {
        const objSender = {
          itemId: this.target,
          valueText: this.textTemp,
          block: this.$store.getters.block
        };
        this.$store.dispatch("updateItemBlock", objSender);
      } else if (this.type === "groupFriend") {
        const objSender = {
          gr_id: this.target,
          name: this.textTemp
        };
        this.$store.dispatch("updateGroup", objSender);
      } else if (this.type === "namegroupblock") {
        const objSender = {
          gr_id: this.target,
          name: this.textTemp
        };
        this.$store.dispatch("updateGroupBlock", objSender);
      } else if (this.type === "namesequence") {
        const objSender = {
          sq_id: this.target,
          name: this.textTemp
        };
        this.$store.dispatch("updateSequence", objSender);
      } else if (this.type === "itemBroadcasts") {
        let result = await BroadcastService.index();
        result = result.data.data.filter(
          item =>
            StringFunction.convertUnicode(item.typeBroadCast)
              .toLowerCase()
              .trim() === "thiet lap bo hen"
        );
        const objSender = {
          bcId: result[0]._id,
          blockId: this.$store.getters.schedule._id,
          contentId: this.target,
          value: this.textTemp
        };
        this.$store.dispatch("updateItemSchedule", objSender);
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
