<template>
  <div>
    <div class="text d_flex align_items_center mb_2">
      <div class="text-edit">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="Nhập văn bản..."
          :contenteditable="true"
          v-model="item.valueText"
          @keyup="upTypingText('itembroadcasts', item)"
          @keydown="clear"
        />
      </div>
      <div class="body--icon ml_2">
        <div class="icon--delete mb_1" @click="isDeleteItemSchedule = true">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="icon--move d_none">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <icon-move />
          </icon-base>
        </div>
      </div>
    </div>
    <!--Start:Delete Item Popup-->
    <delete-item
      v-if="isDeleteItemSchedule === true"
      desc="Bạn có thực sự muốn xóa nội dung này trong chiến dịch không?"
      :block="schedule._id"
      :content="item._id"
      target="itemschedule"
      @close="isDeleteItemSchedule = $event"
    />
    <!--End: Delete Item Popup-->
  </div>
</template>
<script>
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

// import VuePerfectScrollbar from "vue-perfect-scrollbar";

let typingTimer;

export default {
  props: ["item", "schedule"],
  data() {
    return {
      isDeleteItemSchedule: false
      // showSuggestAttribute: false,
      // listAttribute: null,
      // resultFilterAttr: null,
      // dataFixed: [
      //   { id: 0, value: "Danh xưng" },
      //   { id: 1, value: "Tên" },
      //   { id: 2, value: "Họ tên" }
      // ]
    };
  },
  methods: {
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "itembroadcasts") {
        typingTimer = setTimeout(this.updateSchedule(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    // Update item schedule
    async updateSchedule(group) {
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
        contentId: group._id,
        value: group.valueText
      };
      this.$store.dispatch("updateItemSchedule", objSender);
    }
    // closeSuggestAttributeInItem() {
    //   this.showSuggestAttribute = false;
    // },
    // attachValue(list, item) {
    //   item.valueText = "{{" + list.name + "}}";
    //   // item.valueText += '{{' +list.name + '}}' + ' ';
    //   const dataSender = {
    //     itemId: item._id,
    //     valueText: item.valueText,
    //     block: this.block
    //   };
    //   console.log(dataSender);
    //   this.$store.dispatch("updateItemBlock", dataSender);
    // },
    // attachValueFixed(fixed, item) {
    //   item.valueText = fixed.value;
    //   const dataSender = {
    //     itemId: item._id,
    //     valueText: item.valueText,
    //     block: this.block
    //   };
    //   console.log(dataSender);
    //   this.$store.dispatch("updateItemBlock", dataSender);
    // }
  }
  // components: {
  //   VuePerfectScrollbar
  // }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
