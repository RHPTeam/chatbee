<template>
  <div class="add--new" :data-theme="currentTheme">
    <form @submit.prevent="sendMessage">
      <div class="input-wrap d_flex justify_content_start align_items_end">
        <div class="add--text">
          <!--<textarea-->
          <!--id="contentMessageField"-->
          <!--placeholder="Nhập tin nhắn"-->
          <!--&gt;</textarea>-->
          <div id="contentMessageField" placeholder="Nhập tin nhắn" contenteditable="true"></div>
        </div>
        <div class="add--icon text_right">
          <icon-base icon-name="image" width="26" height="26" viewBox="0 0 26 26">
            <icon-image/>
          </icon-base>
        </div>
        <div class="add--icon text_right">
          <icon-base icon-name="smile" width="26" height="26" viewBox="0 0 26 26">
            <icon-smile/>
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
  },
   computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
};
</script>

<style scoped lang="scss">
.add--new {
  padding: 15px 20px;
  .add--text {
    width: calc(100% - 80px);
  }
  .add--icon {
    width: 40px;
    svg {
      cursor: pointer;
    }
  }
  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #999;
    display: block; /* For Firefox */
  }
  div[contenteditable="true"] {
    width: 100%;
    border-radius: 10px;
    border: 0;
    margin-bottom: -6px;
    outline: 0;
    padding: 10px 15px;
  }
}

/* ChangeColor */
// Light
.add--new[data-theme="light"] {
  color: #999;
  div[contenteditable="true"] {
    background-color: #f7f7f7;
  }
}

//Dark
.add--new[data-theme="dark"] {
  color: #ccc;
  div[contenteditable="true"] {
    background-color: #2f3136;
  }
}
</style>
