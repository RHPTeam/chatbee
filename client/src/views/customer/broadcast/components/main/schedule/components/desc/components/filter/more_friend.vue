<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <input type="text" class="search" placeholder="Tìm kiếm bạn bè ..." />
        </div>
        <div class="modal--body">
          <VuePerfectScrollbar class="show">
            <div
              class="item d_flex align_items_center p_2"
              v-for="(item, index) in infoGroupFilter"
              :key="index"
            >
              <div class="left">
                <div class="avatar image" v-if="item.profilePicture === ''">
                  {{ item.fullName }}
                </div>
                <div
                  class="avatar default"
                  v-else
                  :style="{
                    backgroundImage: 'url(' + item.profilePicture + ')'
                  }"
                ></div>
              </div>
              <div class="right ml_3">{{ item.fullName }}</div>
            </div>
          </VuePerfectScrollbar>
        </div>
        <div
          class="modal--footer d_flex justify_content_end align_items_center"
        >
          <button class="btn-add" @click="close">
            XONG
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  props: ["infoGroupFilter"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    close() {
      this.$emit("close", false);
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>
<style lang="scss" scoped>
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  font-family: "Open Sans", sans-serif;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .modal--dialog {
    width: 100%;
    height: 100%;
  }
  .modal--content {
    width: 440px;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .modal--header {
    padding: 1rem 1.5rem;
    .search {
      border-radius: 10px;
      border: none;
      background-color: #fafafa;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      padding-left: 1.5rem;
      width: 100%;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        box-shadow: none;
        outline: 0;
      }
    }
  }
  .modal--body {
    padding: 0 30px;
    .show {
      max-height: 390px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .item {
      .left {
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .default {
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .right {
        font-weight: 600;
      }
    }
  }
  .modal--footer {
    padding: 20px 30px 30px 30px;
    font-size: 14px;
    .btn-add {
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      background-color: #ffb94a;
      border: 1px solid #ffb94a;
      font-weight: 600;
      color: #fff;
      transition: all 0.4s ease;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .btn-skip {
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      background-color: transparent;
      border: 0;
      color: #999;
      font-weight: 600;
      cursor: pointer;
      outline: none;
    }
  }
}
// Light
.modal--wrapper[data-theme="light"] {
  color: #444444;
  .modal--header {
    color: #fff;
  }
  .modal--content {
    background-color: #fff;
    textarea {
      color: #444444;
      background-color: #f7f7f7;
      &::placeholder {
        color: #cccccc;
      }
    }
    .modal--body {
      .error--desc {
        color: #444;
      }
    }
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
}

//Dark
.modal--wrapper[data-theme="dark"] {
  color: #f7f7f7;
  .modal--header {
    color: #27292d;
  }
  .modal--content {
    background-color: #27292d;
    textarea {
      color: #f7f7f7;
      background-color: #2f3136;
      &::placeholder {
        color: #666;
      }
    }
    .modal--body {
      .error--desc {
        color: #f7f7f7;
      }
    }
    .modal--footer {
      .btn-skip {
        &:hover {
          background-color: #2f3136;
        }
      }
    }
  }
}
</style>
