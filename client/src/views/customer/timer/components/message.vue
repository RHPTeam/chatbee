<template>
  <div class="message text_left" :data-theme="currentTheme">
    <div class="message--desc">Nội dung tin nhắn</div>
    <div class="message--content">
      <VuePerfectScrollbar class="message--scroll">
        <div
          contenteditable="true"
          class="message--content-detail"
          placeholder="Nhập nội dung tin nhắn"
        ></div>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.message {
  border-radius: 10px;
  border: 0;
  padding: 24px;
  .message--desc {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .message--content {
    border-radius: 10px;
    padding: 5px 2.5px;
    .message--scroll {
      height: 230px;
    }
    .message--content-detail {
      height: 100%;
      padding: 5px 15px;
      outline: none;
      &:empty {
        &:before {
          content: attr(placeholder);
          font-size: 14px;
          display: block; /* For Firefox */
        }
      }
    }
  }
}

/* ChangeColor */
// Light
.message[data-theme="light"] {
  color: #444;
  background-color: #ffffff;
  .message--content {
    background-color: #f7f7f7;
    .message--content-detail {
      &:empty {
        &:before {
          color: #ccc;
        }
      }
    }
  }
}

//Dark
.message[data-theme="dark"] {
  color: #f7f7f7;
  background-color: #27292d;
  .message--content {
    background-color: #2f3136;
    .message--content-detail {
      &:empty {
        &:before {
          color: #999;
        }
      }
    }
  }
}
</style>