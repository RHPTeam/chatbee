<template>
  <div class="group text_left" :data-theme="currentTheme">
    <div class="d_flex justify_content_between align_items_center">
      <div class="group--desc">Lưu những người dùng đã chọn thành nhóm mới</div>
      <div class="group--radio">
        <input id="checkbox" class="radio" type="checkbox" :checked="radio" @change="updateValue">
        <label for="checkbox"></label>
      </div>
    </div>
    <div class="group--name" v-if="radio == true">
      <input type="text" placeholder="Nhập tên nhóm">
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconAddUser from "@/components/icons/IconAddUser";
export default {
  components: {
    IconBase,
    IconAddUser
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  data() {
    return {
      radio: true
    };
  },
  methods: {
    updateValue: function() {
      this.radio = !this.radio;
    }
  }
};
</script>

<style scoped lang="scss">
.group {
  .group--desc {
    font-size: 14px;
    margin-bottom: 15px;
  }
  .group--radio {
    $transition-duration: 0.4s;
    position: relative;
    .radio {
      position: absolute;
      opacity: 0;
      z-index: 0;
      + label {
        position: relative;
        display: inline-flex;
        width: 40px;
        height: 20px;
        border-radius: 20px;
        border: solid 1px;
        cursor: pointer;
        transition: all $transition-duration;
        &::after {
          font-weight: 400;
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          border: solid 1px;
          border-radius: 50%;
          position: absolute;
          left: 6px;
          top: 4px;
          transition: all $transition-duration;
        }
      }
      &:checked {
        + label {
          border-color: #ffb94a !important;
          background-color: #ffb94a;
          &::after {
            content: "";
            border-color: #fff !important;
            left: calc(100% - 16px);
            background-color: #ffffff;
            transform: rotate(360deg);
          }
        }
      }
    }
  }
  .group--name {
    input {
      width: 100%;
      max-height: 50px;
      border-radius: 10px;
      font-size: 14px;
      border: 0;
      outline: none;
      padding: 16px;
    }
  }
}

/* ChangeColor */
// Light
.group[data-theme="light"] {
  color: #444;
  .group--radio {
    .radio {
      + label {
        border-color: #999;
        &::after {
          border-color: #999;
        }
      }
    }
  }
  .group--name {
    input {
      background-color: #fff;
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #ccc;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #ccc;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #ccc;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #ccc;
    }
  }
}

//Dark
.group[data-theme="dark"] {
  color: #f7f7f7;
  .group--radio {
    .radio {
      + label {
        border-color: #ccc;
        &::after {
          border-color: #ccc;
        }
      }
    }
  }
  .group--name {
    input {
      background-color: #27292d;
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
}
</style>
