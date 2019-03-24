<template>
  <div>
    <transition name="popup">
      <modal-delete
        v-if="ishowModalDelete == true"
        :data-theme="currentTheme"
        :modalDelete="ishowModalDelete"
        :list.sync="list"
        :index="index"
        @closeModal="ishowModalDelete = $event"
      />
    </transition>
    <transition name="popup">
      <message-mobile
        v-if="ishowMessage == true"
        :data-theme="currentTheme"
        :popupMessage="ishowMessage"
        @closeMessage="ishowMessage = $event"
      />
    </transition>
    <div
      class="user"
      :data-theme="currentTheme"
      :class="{ 'not--seen': isnewMessage }"
    >
      <div
        class="user--info d_flex justify_content_between align_items_center text_left position_relative"
        :class="{ delete: deleteItem }"        
        @touchstart="start"
        @touchend="stop"
        @touchcancel="stop"
        @click="ishowMessage = true"
      >
        <div class="user--img">
          <img
            src="http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
            width="40"
            alt="User Avatar"
          />
        </div>
        <div class="user--send" @click="deleteItem = false">
          <div class="user--send-name">Nguyễn Huyền</div>
          <div
            class="send--detail d_flex justify_content_start align_items_center"
          >
            <div class="send--detail-message">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              id ullamcorper mi. Donec suscipit sem vel faucibus maximus.
              Quisque in elit arcu. Ut eu justo diam.
            </div>
            <div class="send--detail-time text_right">10:28</div>
          </div>
        </div>
        <div class="icon--status"></div>
        <div
          class="icon--delete position_absolute"
          @click.stop="ishowModalDelete = true"
        >
          <icon-base
            icon-name="icon-delete"
            width="36"
            height="36"
            viewBox="0 0 40 40"
          >
            <icon-delete />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageMobile from "../message_mobile";
import ModalDelete from "../delete-message";
import IconBase from "@/components/icons/IconBase";
import IconDelete from "@/components/icons/IconDelete";
export default {
  props: ["isNewMessage", "list", "index"],
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    IconBase,
    IconDelete,
    ModalDelete,
    MessageMobile
  },
  data() {
    return {
      ishowMessage: false,
      ishowModalDelete: false,
      interval: false,
      count: 0,
      deleteItem: false,
      isnewMessage: false
    };
  },
  methods: {
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => this.count++, 500);
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = false;
      if (this.deleteItem != true) {
        this.ishowMessage = true;
      }
      console.log(this.ishowModalDelete);
    },
    showMessage() {
      this.$emit("showMessage", true);
    }
  },
  watch: {
    count() {
      if (this.count >= 1) {
        this.deleteItem = true;
        this.ishowMessage = false;
      } else if (this.count == 0) {
        // this.deleteItem = false;
      }
    },
    ishowModalDelete() {
      if (this.ishowModalDelete == false) {
        this.deleteItem = false;
      }
    },
    ishowMessage() {
      this.isnewMessage = false;
    }
  },
  created() {
    this.isnewMessage = this.isNewMessage;
  }
};
</script>

<style scoped lang="scss">
.user {
  transition: all 0.4s ease;
  .user--info {
    cursor: pointer;
    padding: 12px 20px;
    &.delete {
      transform: translateX(-50px);
      .icon--delete {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
    }
  }
  .user--img {
    margin-right: 10px;
  }
  .user--send {
    line-height: normal;
    width: calc(100% - 84px);
    .user--send-name {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .send--detail {
    font-size: 12px;
    .send--detail-message {
      max-width: calc(100% - 55px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .send--detail-time {
      margin-left: 25px;
      width: 30px;
    }
  }

  .icon--status {
    background-color: #ffb94a;
    border-radius: 50%;
    height: 14px;
    margin-left: 20px;
    opacity: 0;
    visibility: hidden;
    width: 14px;
  }
  .icon--delete {
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    right: -34px;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    z-index: 100;
  }
  &.not--seen {
    .user--send-name {
      font-weight: bold;
    }
    .icon--status {
      opacity: 1;
      visibility: visible;
    }
  }
}

/* ChangeColor */
// Light
.user[data-theme="light"] {
  color: #444;
  .send--detail {
    color: #999;
  }
  &.not--seen {
    background-color: #f7f7f7;
    .send--detail {
      color: #444;
    }
  }
}

//Dark
.user[data-theme="dark"] {
  color: #f7f7f7;
  .send--detail {
    color: #ccc;
  }

  &.not--seen {
    background-color: #27292d;
    .send--detail {
      color: #f7f7f7;
    }
  }
}
</style>
