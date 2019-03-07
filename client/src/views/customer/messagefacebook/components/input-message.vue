<template>
  <div class="add--new">
    <form @submit.prevent="sendMessage">
      <div class="input-wrap d_flex justify_content_start align_items_end">
        <div class="add--text">
          <!--<textarea-->
          <!--id="contentMessageField"-->
          <!--placeholder="Nhập tin nhắn"-->
          <!--&gt;</textarea>-->
          <div
            id="contentMessageField"
            placeholder="Nhập tin nhắn"
            contenteditable="true"
          ></div>
        </div>
        <div class="add--icon text_right">
          <icon-base
            icon-name="image"
            width="26"
            height="26"
            viewBox="0 0 26 26"
          >
            <icon-image />
          </icon-base>
        </div>
        <div class="add--icon text_right">
          <icon-base
            icon-name="smile"
            width="26"
            height="26"
            viewBox="0 0 26 26"
          >
            <icon-smile />
          </icon-base>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconImage from "@/components/icons/IconImage";
import IconSmile from "@/components/icons/IconSmile";
export default {
  components: {
    IconBase,
    IconImage,
    IconSmile
  }
};
</script>

<style scoped lang="scss">
.add--new {
  padding: 15px 20px;
  color: #999;
  .add--text {
    width: calc(100% - 80px);
    textarea {
      width: 100%;
      border-radius: 10px;
      background-color: #f7f7f7;
      border: 0;
      margin-bottom: -6px;
      outline: 0;
      padding: 10px 15px;
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #999;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #999;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #999;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #999;
    }
  }
  .add--icon {
    width: 40px;
    svg {
      cursor: pointer;
    }
  }
}
[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
}
div[contenteditable="true"] {
  width: 100%;
  border-radius: 10px;
  background-color: #f7f7f7;
  border: 0;
  margin-bottom: -6px;
  outline: 0;
  padding: 10px 15px;
}
</style>
