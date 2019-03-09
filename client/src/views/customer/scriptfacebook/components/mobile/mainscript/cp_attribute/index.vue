<template>
  <div class="popup--content position_fixed">
    <div class="popup">
      <div class="popup--header pl_3 pr_3 pt_2 pb_2 mb_2">
        <div class="d_flex justify_content_between align_items_center">
          <div class="back" @click="closeAddPopup">
            <icon-base
              class="icon--arrow-left"
              width="22"
              height="28"
              viewBox="0 0 22.65 20.07"
            >
              <icon-arrow-left/>
            </icon-base>
          </div>
          <div class="search">
            <div
              class="search--wrap ml_3 mr_3 pl_3 pr_3 d_flex align_items_center"
            >
              <span v-text="'{{'"></span>
              <div
                class="search--value"
                contenteditable="true"
                data-placeholder="Nhập thẻ mới"
              ></div>
              <span v-text="'}}'"></span>
            </div>
          </div>
          <div class="action">
            <a href="javascript:void(0)">OK</a>
          </div>
        </div>
      </div>
      <div class="popup--body">
        <div class="attr d_flex flex_row pl_4 pr_4 pt_3 pb_3">
          <div class="attr--item">
            <div class="d_flex justify_content_between ">
              <div class="attr--item-text">
                <span v-text="'{{'"></span>
                <span>Mua táo</span>
                <span v-text="'}}'"></span>
              </div>
              <div class="attr--item-detail ml_auto ">
                <span>20</span>
                <icon-base
                  class="icon-"
                  width="15"
                  height="13"
                  viewBox="0 0 20.65 18.07"
                >
                  <icon-user/>
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconUser from "@/components/icons/IconUser";

export default {
  props: ["ishowAddPopup"],
  data() {
    return {};
  },
  methods: {
    closeAddPopup() {
      this.$emit("close", false);
    }
  },
  components: {
    IconBase,
    IconUser,
    IconArrowLeft
  }
};
</script>
<style lang="scss" scoped>
.popup--content {
  height: 100vh;
  left: 0;
  min-height: 100%;
  top: 0;
  width: 100%;
  z-index: 100;

  .action {
    a {
      color: #fff;
    }
  }

  .popup--header {
    height: 56px;
  }

  .search {
    width: 100%;

    &--wrap {
      border-radius: 10px;
      font-size: 14px;
      line-height: 1;
      height: 40px;
      width: auto;
    }

    &--value {
      &:empty:before {
        content: 'Nhập tên thẻ';
        margin: 0 5px;
      }

      &:hover {
        outline: none;
      }
    }
  }

  .attr--item {
    width: 100%;
  }

  .attr--item-detail {
    svg {
      margin-left: 10px;
    }
  }
}

div[data-theme="light"] {
  .popup--content {
    background-color: #fff;

    .search {
      &--wrap {
        background: #f7f7f7;

        span {
          color: #666666;
        }
      }
    }

    .action a {
      color: #666666;
    }

    .attr {
      background-color: #F7F7F7;
      color: #666666;
    }
    .attr--item-detail {
      svg {
        color: #fff;
      }
    }
  }
}

div[data-theme="dark"] {
  .popup--content {
    background-color: #2F3136;

    .search {
      &--wrap {
        background: #27292d;

        span {
          color: #fff;
        }
      }

      &--value {
        color: #CCCCCC;
      }
    }

    .action a {
      color: #ffff;
    }

    .attr a {
      background-color: #27292d;
      color: #fff;
    }

    .attr--item-detail {
      svg {
        color: #444444;
      }
    }
  }
}
</style>
