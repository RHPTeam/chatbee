<template>
  <div class="modal--wrapper position_fixed d_flex justify_content_center align_items_center">
    <div class="modal--content">
      <div class="modal--header pl_4 pr_4 pt_3 pb_3">Cấu hình tài khoản</div>
      <div class="modal--body pt_3 pb_0 pl_4 pr_4">
        <div class="user d_flex justify_content_start align_items_center mb_4">
          <div class="user--avatar mr_4">
            <img
              src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
              width="64"
              alt="User Avatar"
            >
          </div>
          <div class="user--info">
            <div class="user--info-name mb_2">{{ user.name }}</div>
            <div class="user--info-mail">{{ user.email }}</div>
          </div>
        </div>
        <div class="edit">
          <div class="edit--status d_flex justify_content_between align_items_center mb_3">
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="check-active"
                class="mr_2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active/>
              </icon-base>Kích hoạt:
            </div>
            <div class="status--radio">
              <input
                id="check-active"
                class="radio"
                type="checkbox"
                :checked="radio"
                @change="updateValue"
              >
              <label for="check-active"></label>
            </div>
          </div>
          <div class="edit--account d_flex justify_content_between align_items_center mb_3">
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="infinity"
                class="mr_2"
                width="20"
                height="9.813"
                viewBox="0 0 20 9.813"
              >
                <icon-infinity/>
              </icon-base>Số lượng tài khoản giới hạn:
            </div>
            <div class="account--input">
              <input type="number" v-model="user.maxAccountFb" size="10">
            </div>
          </div>
          <div class="edit--type d_flex justify_content_between align_items_center mb_3">
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="role"
                class="mr_2"
                width="16.667"
                height="20"
                viewBox="0 0 16.667 20"
              >
                <icon-role/>
              </icon-base>Loại tài khoản:
            </div>
            <div class="type--select">
              <div class="select--wrapper position_relative">
                <select v-model="user._role._id">
                  <option
                    v-for="role in roles"
                    :key="role._id"
                    :value="role._id"
                    :selected="role._id == user._role._id ? 'selected' : ''"
                  >{{role.level}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="edit--time d_flex justify_content_between align_items_center mb_3">
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="hourglass"
                class="mr_2"
                width="15.333"
                height="20"
                viewBox="0 0 15.333 20"
              >
                <icon-hourglass/>
              </icon-base>Thời gian hoạt động:
            </div>
            <div class="time--tick position_relative">
              <datepicker :readonly="true" format="DD-MM-YYYY" name="date-edit" :value="user.created_at | formatDate" @input="value => user.created_at = value"></datepicker>
              <div class="time--tick-icon position_absolute">
                <icon-base icon-name="calendar" width="12" height="12" viewBox="0 0 12 12">
                  <icon-calendar/>
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal--footer d_flex justify_content_end align_items_center pl_4 pr_4 pb_4 pt_2">
        <button class="btn-cancel" @click="closeAddEdit">Hủy</button>
        <button class="btn-done ml_4">Xong</button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "@/components/shared/datepicker_library";
import IconBase from "@/components/icons/IconBase";
import IconCheckActive from "@/components/icons/IconCheckActive";
import IconInfinity from "@/components/icons/IconInfinity";
import IconRole from "@/components/icons/IconRole";
import IconHourglass from "@/components/icons/IconHourglass";
import IconCalendar from "@/components/icons/IconCalendar";
export default {
  props: ["user"],
  components: {
    Datepicker,
    IconBase,
    IconCheckActive,
    IconInfinity,
    IconRole,
    IconHourglass,
    IconCalendar
  },
  computed: {
    roles() {
      return this.$store.getters.roles;
    }
  },
  filters: {
    formatDate(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      return `${date}-${month}-${year}`;
    }
  },
  methods: {
    closeAddEdit() {
      this.$emit("closeAddEdit", false);
    },
    updateValue: function() {
      this.radio = !this.radio;
    }
  },
  async created() {
    await this.$store.dispatch("getRoles");
  },
  data() {
    return {
      radio: true,
      date: ""
    };
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  max-height: 100vh;
  left: 0;
  height: 100vh;
  top: 0;
  width: 100%;
  z-index: 1000;
  .modal--content {
    background-color: #ffffff;
    border-radius: 8px;
    width: 600px;
  }
  .modal--header {
    border-bottom: 1px solid #dcdcdc;
    color: #646464;
    font-size: 16px;
    font-weight: 600;
  }
  .modal--footer {
    button {
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      padding: 2px 10px;
      transition: all 0.4s ease;
      &.btn-cancel {
        color: #aaaaaa;
        &:hover {
          border-color: #aaaaaa;
        }
      }
      &.btn-done {
        color: #56e8bd;
        &:hover {
          border-color: #56e8bd;
        }
      }
    }
  }
}

.user {
  .user--info {
    .user--info-name {
      color: #3d3d3d;
      font-size: 16px;
      font-weight: bold;
    }
    .user--info-mail {
      color: #7e7e7e;
      font-size: 14px;
    }
  }
}

.edit {
  color: #747474;
  font-weight: 600;
}

.edit--status {
  .edit--desc {
    svg {
      color: #56e8bd;
    }
  }
  .status--radio {
    $transition-duration: 0.4s;
    position: relative;
    .radio {
      cursor: pointer;
      height: 20px;
      opacity: 0;
      position: absolute;
      width: 40px;
      z-index: 1;

      + label {
        border: solid 1px;
        border-radius: 20px;
        cursor: pointer;
        display: inline-flex;
        height: 20px;
        position: relative;
        transition: all $transition-duration;
        width: 40px;

        &::after {
          border: solid 1px;
          border-radius: 50%;
          content: "";
          display: block;
          font-weight: 400;
          height: 10px;
          left: 6px;
          position: absolute;
          transition: all $transition-duration;
          top: 4px;
          width: 10px;
          z-index: 11;
        }
      }
      &:checked {
        + label {
          background-color: #56e8bd;
          border-color: #56e8bd !important;
          &::after {
            background-color: #ffffff;
            border-color: #fff !important;
            content: "";
            left: calc(100% - 16px);
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}

.edit--account {
  input[type="number"] {
    border: solid 1px #e4e4e4;
    border-radius: 10px;
    color: #444444;
    font-size: 14px;
    height: 40px;
    outline: none;
    text-align: center;
    width: 70px;
    -moz-appearance: textfield; /* Firefox */
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
}

.edit--type {
  .select--wrapper {
    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #ffffff;
      border: solid 1px #e4e4e4;
      border-radius: 10px;
      color: #444;
      cursor: pointer;
      font-size: 13px;
      font-weight: 300;
      height: 40px;
      line-height: 1.57;
      outline: none;
      padding: 0 16px;
      padding-right: 38px;

      &::-ms-expand {
        display: none;
      }
    }

    &:after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #999;
      content: "";
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 16px;
      transform: translateY(-50%);
      top: 50%;
      width: 0;
    }
  }
}

.edit--time {
  .time--tick-icon {
    color: #747474;
    pointer-events: none;
    right: 16px;
    top: 6px;
  }
}

/*Transition popup*/
.popup-enter {
  transform: translateY(-100%);
}
.popup-enter-to {
  transition: transform 0.75s;
  transform: translateY(0);
}
.popup-leave-to {
  transition: transform 0.75s;
  transform: translateY(-100%);
}
</style>

<style lang="scss">
.edit--time {
  .time--tick {
    input {
      border-radius: 10px;
      border: solid 1px #e4e4e4;
      color: #444;
      cursor: pointer;
      font-size: 13px;
      height: 40px;
      padding: 0 16px;
    }
  }
  .picker-wrap {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: none !important;
    height: auto !important;
    margin-top: 1px !important;
    right: 0;
    width: 283px !important;
  }
  .date-head {
    background-color: #56e8bd !important;
    height: 40px;
    position: relative;
    .btn-prev-year,
    .btn-next-year {
      display: none;
      pointer-events: none;
    }
    .btn-next-date,
    .btn-prev-date {
      background-color: #fff !important;
      border-radius: 50%;
      color: #56e8bd;
      height: 20px;
      line-height: 20px;
      padding: 0;
      text-align: center;
      top: 8px;
      width: 20px;

      &:hover {
        background-color: #fff !important;
      }
    }
    .btn-prev-date {
      left: 10px;
      position: absolute;
    }
    .btn-next-date {
      position: absolute;
      right: 10px;
    }
    .show-year {
      margin-right: 55px;
      position: relative;
      &:before {
        content: "/";
        left: -7px;
        position: absolute;
      }
    }
    .show-month {
      margin-left: 70px;
      margin-right: -10px;
    }
    th:first-child {
      border-top-left-radius: 10px;
    }
    th:nth-child(2) {
      border-top-right-radius: 10px;
    }
  }
  .date-days {
    font-size: 12px !important;
    height: 40px;
    th {
      border: solid 1px rgba(0, 0, 0, 0.03) !important;
      font-weight: normal !important;
    }
  }
  td {
    border: solid 1px rgba(0, 0, 0, 0.03) !important;
    height: 36px !important;
    transition: all 0.5s ease;
    &:hover {
      color: #56e8bd !important;
    }
  }
  .date-active {
    background-color: #56e8bd !important;
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }
}
</style>
