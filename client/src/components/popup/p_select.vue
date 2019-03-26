<template>
  <div class="modal select--account">
    <div class="modal--wrapper">
      <div class="modal--content">
        <div class="modal--header">Chọn tài khoản trả lời</div>
        <div class="modal--body">
          <div class="alert alert_info desc text_left">
            <b>ĐỪNG LO LẮNG!</b> Trong quá trình nhắn tin bạn hoàn toàn có thể
            chuyển nhanh tài khoản để trả lời!
          </div>
          <div class="list account">
            <div
              class="list--item"
              v-for="(account, index) in accountList"
              :key="index"
            >
              <label class="custom check">
                <div class="block">
                  <img
                    class="image"
                    :src="account.userInfo.thumbSrc"
                    alt="User avatar"
                  />
                  <span class="name">{{ account.userInfo.name }}</span>
                </div>
                <input
                  type="radio"
                  name="radio"
                  @click="selectedAccount(account._id)"
                />
                <span class="space"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal--footer flex_column">
          <button type="button" class="btn btn_outline_warning" @click="close">
            Tiếp tục
          </button>
          <button type="button" class="btn btn_light mt_3" @click="goBack">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.$store.dispatch("getAccountsFB");
  },
  computed: {
    accountList() {
      return this.$store.getters.accountsFB;
    }
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    goBack() {
      this.$router.go(-1);
    },
    selectedAccount(fb_id) {
      window.localStorage.setItem("rid", fb_id);
    }
  }
};
</script>

<style lang="scss" scoped>
// Modal Delete
.modal {
  background-color: rgba(37, 47, 51, 0.8);
  display: block !important;
  font-family: "Open Sans", sans-serif;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  transition: 1s ease-in-out;
  .modal--wrapper {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
  .modal--content {
    background: #ffffff;
    border-radius: 7px;
    box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.12);
    padding: 2rem;
    width: 500px;
    transition: 1s ease-in-out;
    .modal--header {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
  }
  .modal--body {
    .modal--desc {
      font-size: 14px;
      font-weight: 700;
      margin: 15px 0 27px 0;
    }
  }
  .modal--footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    > button[type="button"] {
      width: 100%;
    }
  }
}

// Custom List
.list {
  &--item {
    padding: 1rem 0;
    border-bottom: 1px solid #f7f7f7;
    &:last-child {
      border-bottom: 0;
    }
  }
}

// Custom Radio
.custom {
  display: block;
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .space {
    position: absolute;
    top: 0;
    right: 0;
    height: 1rem;
    width: 1rem;
    background-color: #eee;
    border-radius: 50%;
  }
  &:hover input ~ .space {
    background-color: #ccc;
  }
  & input:checked ~ .space {
    background-color: #ffb94a;
  }
  .space:after {
    content: "";
    position: absolute;
    display: none;
  }
  & input:checked ~ .space:after {
    display: block;
  }
  & .space:after {
    top: 5px;
    left: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffffff;
  }
}

// Block
.block {
  align-items: center;
  display: flex;
  text-align: left;
  .image {
    border-radius: 50%;
    margin-right: 0.75rem;
    height: 24px;
    width: 24px;
  }
  .name {
    font-weight: 600;
  }
}

// Change theme
// Light
.modal--wrapper[data-theme="light"] {
  .modal--content {
    background: #ffffff;
    .modal--desc {
      color: #3f3f3f;
    }
  }
}
// Dark
.modal--wrapper[data-theme="dark"] {
  .modal--content {
    background: #27292d;
    .modal--desc {
      color: #ffffff;
    }
  }
}
</style>
