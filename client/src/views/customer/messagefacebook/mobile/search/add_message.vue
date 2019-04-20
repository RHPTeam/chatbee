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
        @input="update"
      />
    </div>
    <div v-if="isShowSearchRersult === true">
      <loading-component
        class="text_center"
        v-if="this.$store.getters.friendsStatus === 'loading'"
      />
      <div v-else class="user mt_2">
        <!--              Start: option search-->
        <div
          class="option d_flex align_items_center justify_content_between mb_2"
        >
          <div
            class="item"
            v-for="(item, index) in filtersList"
            :key="`s-${index}`"
            :class="[item == filterSelected ? 'active' : '']"
            @click="filterBy(item)"
          >
            {{ item }}
          </div>
        </div>
        <!--              End: option search-->

        <div v-if="filteredUsers.length === 0">
          <div class="conversation--empty px_3 text_center">
            Không có kết quả
          </div>
        </div>
        <div v-else class="wrapper">
          <div
            class="item d_flex align_items_center justify_content_between"
            v-for="(user, index) in filteredUsers"
            :key="index"
            @click="getConversation(user)"
          >
            <div class="left mr_3">
              <div
                v-if="
                  user.profilePicture === '' ||
                    user.profilePicture === undefined
                "
                class="avatar--default d_flex align_items_center justify_content_center"
              >
                K
              </div>
              <div
                v-else
                class="avatar"
                :style="{
                  backgroundImage: 'url(' + user.profilePicture + ')'
                }"
              ></div>
            </div>
            <div class="right">
              <div class="name">{{ user.fullName }}</div>
              <div class="small text_left">Đã kết nối</div>
            </div>
            <div class="choose d_flex align_items_center">
              <div
                class="circle"
                :class="{ color: chooseUser == user._id }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtersList: ["Tất cả", "Mọi người", "Nhóm", "Khác"],
      filterSelected: "Tất cả",
      searchKeyWord: "",
      isShowSearchRersult: true,
      chooseUser: ""
    };
  },
  async created() {
    await this.$store.dispatch("getAllFriends");
  },
  computed: {
    allConversationsAcc() {
      return this.$store.getters.allConversationsAcc;
    },
    curConversation() {
      return this.$store.getters.curConversation;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    filteredUsers() {
      if (this.users === undefined) return;
      else {
        if (this.searchKeyWord === "") {
          return this.users;
        } else {
          return this.users.filter(user => {
            return user.fullName
              .toLowerCase()
              .includes(this.searchKeyWord.toString().toLowerCase());
          });
        }
      }
    },
    receiverFBAccount() {
      return this.$store.getters.receiverFBAccount;
    },
    replyFBAccount() {
      return this.$store.getters.replyFBAccount;
    },
    users() {
      return this.$store.getters.allFriends;
    }
  },
  methods: {
    update() {
      this.$emit("update", this.searchKeyWord);
    },
    showSearchResult() {
      this.isShowSearchRersult = true;
    },
    async getConversation(user) {
      this.chooseUser = user._id;
      let isHasConve = false;
      await this.allConversationsAcc.forEach(item => {
        if (item._receiver._id === user._id) {
          this.$store.dispatch("getCurConversation", item._id);
          this.$store.dispatch("receiverFBAccount", user._id);
          isHasConve = true;
          return false;
        }
      });
      if (isHasConve === false) {
        this.$store.dispatch("receiverFBAccount", user._id);
        this.$store.dispatch("emptyCurConversation");
      }
      // this.isShowSearchRersult = false;
    },
    filterBy(item) {
      this.filterSelected = item;
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 8px 16px;
  input {
    border-radius: 10px;
    border: 0;
    font-size: 14px;
    padding: 8px 15px;
    padding-left: 50px;
    outline: 0;
    width: 100%;
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
        padding: 0.25rem;
        .left {
          width: 38px;
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
        }
        .right {
          width: calc(100% - 58px);
          .small {
            font-size: 12px;
          }
        }
        .choose {
          width: 20px;
          .circle {
            background-color: transparent;
            border: 1px solid #707070;
            border-radius: 50%;
            height: 13px;
            width: 13px;
          }
          .color {
            background-color: #ffb94a;
            border-color: #ffb94a;
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
