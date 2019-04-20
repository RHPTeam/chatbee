<template>
  <div class="search position_relative" :data-theme="currentTheme">
    <div class="input--wrap position_relative">
      <div class="search--icon position_absolute">
        <icon-base
          icon-name="input-search"
          width="16.772"
          height="17.287"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm"
        v-model="searchKeyWord"
        @click="showSearchResult"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyWord: "",
      isShowSearchRersult: false
    };
  },
  methods: {
    update() {
      this.$emit("update", this.searchKeyWord);
    },
    showSearchResult() {
      this.isShowSearchRersult = true;
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 8px 16px;
  .input--wrap {
    width: calc(100% - 50px);
  }
  .s--close {
    width: 50px;
    font-size: 14px;
    font-weight: 500;
  }
  input {
    border-radius: 10px;
    padding: 8px 15px;
    padding-left: 50px;
    width: 100%;
    border: 0;
    outline: 0;
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
  .search--icon {
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    color: #999;
  }
  .w_20 {
    width: 25% !important;
  }
  .w_80 {
    width: 75% !important;
  }
  .user {
    height: 100%;
    left: 0;
    padding: 0.5rem 1rem;
    width: 100%;
    z-index: 99;
    .option {
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      .item {
        border-radius: calc(0.5rem + 2px);
        padding: 0.25rem 0.75rem;
        &:hover,
        &:focus,
        &:active,
        &:visited {
          background-color: #ffb94a;
          color: #999999;
          transition: all 0.5s ease;
        }
      }
      .active {
        background-color: #ffb94a !important;
      }
    }
    .scroll--user {
      height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .wrapper {
      .item {
        background-color: #fafafa;
        padding: 0.25rem;
        .avatar {
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          border-radius: 50%;
          height: 35px;
          width: 35px;
        }
        .avatar--default {
          background-color: #cccccc;
          border: 1px solid #e4e4e4;
          border-radius: 50%;
          font-size: 1rem;
          font-weight: 700;
          height: 35px;
          width: 35px;
        }
        .right {
          .small {
            font-size: 12px;
          }
        }
        .name {
          font-weight: 600;
        }
      }
    }
  }
}
/* ChangeColor */
// Light
.search[data-theme="light"] {
  input {
    background-color: #f7f7f7;
    color: #444444;
  }
  .user {
    .option {
      background-color: #fafafa;
    }
  }
}

//Dark
.search[data-theme="dark"] {
  input {
    background-color: #27292d;
    color: #f7f7f7;
  }
}
</style>
