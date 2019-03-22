<template>
  <div class="footer mt_3">
    <div class="title text_left">Thêm phần tử</div>
    {{ schedule }}
    <div class="group d_flex align_items_center">
      <div
        class="item d_flex align_items_center justify_content_center flex_column"
        @click="addItemSchedule('text', schedule._id)"
      >
        <icon-base
          class="icon-text"
          width="20"
          height="20"
          viewBox="0 0 13.53 20.11"
        >
          <icon-text />
        </icon-base>
        Văn bản
      </div>

      <div
        class="item d_flex align_items_center justify_content_center flex_column"
        @click="addItemSchedule('image', schedule._id)"
      >
        <icon-base
          class="icon-image"
          width="20"
          height="20"
          viewBox="0 0 26 26"
        >
          <icon-image />
        </icon-base>
        Hình ảnh
      </div>
      <div
        class="item d_flex align_items_center justify_content_center flex_column"
        @click="addItemSchedule('time', schedule._id)"
      >
        <icon-base
          class="icon-sand-clock"
          width="20"
          height="20"
          viewBox="0 0 14.41 20.14"
        >
          <icon-sand-clock />
        </icon-base>
        Thời gian chờ
      </div>
      <div
        class="item d_flex align_items_center justify_content_center flex_column"
      >
        <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
          <icon-plus />
        </icon-base>
        Thêm mới
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconPlus from "@/components/icons/IconPlus";
import IconSandClock from "@/components/icons/IconSandClock";
export default {
  data() {
    return {};
  },
  methods: {
    addItemSchedule(type, id) {
      const dataSender = {
        value: "",
        type: type,
        id: id
      };
      this.$store.dispatch("createItemSchedule", dataSender);
      this.$emit("addText", true);
    }
  },
  computed: {
    schedule() {
      console.log(this.$store.getters.broadcast);
      return this.$store.getters.broadcast;
    }
  },
  async created() {
    await this.$store.dispatch("getAllBroadcasts");
  },
  components: {
    IconBase,
    IconImage,
    IconText,
    IconSandClock,
    IconPlus
  }
};
</script>
<style lang="scss" scoped>
.title {
  box-shadow: none;
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #666666;
  margin: 0 0 10px;
}
.group {
  margin: 0 -5px;

  .item {
    background: #ffffff;
    border-radius: 10px;
    padding: 9.5px 12px;
    font-size: 14px;
    width: calc((100% - 80px) / 4);
    margin: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    svg {
      margin-bottom: 10px;
    }
  }
}
/******** 01. Theme Light *********/

div[data-theme="light"] .footer {
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .footer {
  .title {
    color: #ffffff;
  }
  .item {
    background: #27292d;
    color: #ffffff;
  }
}
</style>
