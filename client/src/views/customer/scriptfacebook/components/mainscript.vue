<template>
  <div :data-theme="currentTheme" class="scripts">
    <div class="script--title script--header d_flex align_items_center">
      <h1>Mua cam</h1>
      <div class="group-copy-link">
        <icon-base
          class="icon--base"
          width="26"
          height="26"
          viewBox="0 0 482.8 482.8"
        >
          <icon-copy />
        </icon-base>
        <icon-base
          class="icon--base"
          width="26"
          height="26"
          viewBox="0 0 482.8 482.8"
        >
          <icon-link />
        </icon-base>
      </div>
      <div class="delete ml_auto">
        <icon-base
          icon-name="remove"
          width="26"
          height="26"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <div class="script--body">
      <div v-if="textList.length > 0">
        <div
          class="script--body-text"
          v-for="(item, index) in textList"
          :key="index"
        >
          <div class="delete" @click="removeText(index)">
            <icon-base
              icon-name="remove"
              width="26"
              height="26"
              viewBox="0 0 15 15"
            >
              <icon-remove />
            </icon-base>
          </div>
          <div>
            <!--<div contenteditable="true">example</div>-->
            <textarea
              name=""
              cols="30"
              rows="10"
              v-model="textValue"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="script--body-image">
        <div class="delete">
          <icon-base
            icon-name="remove"
            width="26"
            height="26"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div>
          <input type="file" name="upload_image" id="upload_image" />
        </div>
      </div>
      <div class="script--body-timer">
        <div class="delete">
          <icon-base
            icon-name="remove"
            width="26"
            height="26"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div>
          <input type="number" />
          <select name="" id="">
            <option value="seconds">Giây</option>
            <option value="minutes">Phút</option>
            <option value="hour">Giờ</option>
          </select>
        </div>
      </div>
      <!--<div class="script&#45;&#45;body-tag">-->
      <!---->
      <!--</div>-->
    </div>

    <div class="script--footer">
      <div class="script--footer-addelm">
        <div class="title">Thêm phần tử</div>
        <div class="gr-addelm d_flex align_items_center ">
          <div
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
            @click.prevent="addText"
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
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
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
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
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
            class="addelm-item d_flex align_items_center justify_content_center flex_column"
          >
            <icon-base
              class="icon-tag"
              width="20"
              height="20"
              viewBox="0 0 337.7 487.85"
            >
              <icon-tag />
            </icon-base>
            Thẻ
          </div>
        </div>
      </div>
      <div class="script--footer-syntax">
        <div class="title">Cú pháp</div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <textarea
          name=""
          id=""
          cols="100"
          rows="6"
          placeholder="Nhập các cụm từ tại đây"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import IconRemove from "@/components/icons/IconRemove";
import IconBase from "@/components/icons/IconBase";
import IconCopy from "@/components/icons/IconCopy";
import IconLink from "@/components/icons/IconLink";
import IconImage from "@/components/icons/IconImage";
import IconText from "@/components/icons/IconText";
import IconSandClock from "@/components/icons/IconSandClock";
import IconTag from "@/components/icons/IconTag";

export default {
  data() {
    return {
      textValue: "",
      textList: []
    };
  },
  methods: {
    addText() {
      this.textList.push({ textValue: "" });
    },
    removeText(index) {
      this.textList.pop(index);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconCopy,
    IconLink,
    IconRemove,
    IconImage,
    IconText,
    IconSandClock,
    IconTag
  }
};
</script>

<style lang="scss" scoped>
.scripts {
  .script--header {
    .group-copy-link {
      margin-left: 30px;
      > * + * {
        margin-left: 15px;
      }
    }
  }
  .script--body {
    .script--body-text {
    }
  }
  .script--footer {
    .script--footer-addelm {
      text-align: left;
      .title {
        font-size: 18px;
        margin-bottom: 15px;
        margin-top: 25px;
        text-align: left;
      }
    }
    .gr-addelm {
      .addelm-item {
        border-radius: 10px;
        padding: 12px;
        svg {
          margin-bottom: 10px;
        }
      }
      .addelm-item + .addelm-item {
        margin-left: 10px;
      }
    }

    /*script--syntax*/
    .script--footer-syntax {
      margin-top: 30px;
      text-align: left;

      .title {
        margin-bottom: 20px;
      }
      .description {
        font-size: 14px;
        margin-bottom: 20px;
      }
      textarea {
        height: 72px;
        resize: none;
        border-radius: 10px;
      }
    }
  }
}

div[data-theme="light"] {
  background: #fff;
}
div[data-theme="dark"] {
  background-color: #27292c;
  .addelm-item {
    background-color: #2f3136;
  }
  .script--footer-syntax {
    .title {
    }
    .description {
    }
    textarea {
      background-color: #27292d;
      border: 10px solid #2f3136;
      padding: 16px;
      width: 100%;
    }
  }
}
</style>
