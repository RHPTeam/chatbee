<template>
  <div class="search--result" :data-theme="currentTheme">
    <div class="user--filter d_flex">
      <div
        class="user--filter-item"
        v-for="(item, index) in filtersList"
        :key="index"
        :class="[item == filterSelected ? 'item--active' : '']"
        @click="filterBy(item)"
      >
        {{ item }}
      </div>
    </div>
    <loading-component
      class="text_center"
      v-if="this.$store.getters.friendsStatus === 'loading'"
    />
    <div v-else>
      <div v-if="filteredUsers.length === 0">
        <div class="conversation--empty px_3 text_center">Không có kết quả</div>
      </div>
      <div
        v-else
        class="user d_flex align_items_center"
        :data-theme="currentTheme"
        v-for="(user, index) in filteredUsers"
        :key="index"
        @click="getConversation(user)"
      >
        <div class="user--img">
          <img :src="user.profilePicture" width="32" alt="User Avatar" />
        </div>
        <div class="user--info">
          <div class="user--info-name">{{ user.fullName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchKey: String
  },
  data() {
    return {
      filtersList: ["Tất cả", "Mọi người", "Nhóm"],
      filterSelected: "Tất cả"
    };
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
        if (this.searchKey === "") {
          return this.users;
        } else {
          return this.users.filter(user => {
            return user.fullName
              .toLowerCase()
              .includes(this.searchKey.toString().toLowerCase());
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
    async getConversation(user) {
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
      this.$emit("hideSearchResult", false);
    },
    filterBy(item) {
      this.filterSelected = item;
    }
  },
  async created() {
    await this.$store.dispatch("getAllFriends");
  }
};
</script>

<style scoped lang="scss">
.conversation--empty {
  color: #999;
  font-size: 13px;
}
.user--filter {
  justify-content: center;
  padding: 0 20px 16px 0;
  &-item {
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    transition: all 0.4s ease;
  }
}
.user {
  padding: 8px 20px;
  cursor: pointer;
  .user--img {
    img {
      border-radius: 50%;
    }
  }
  .user--info {
    margin-left: 20px;
    .user--info-name {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* ChangeColor */
// Light
.search--result[data-theme="light"] {
  .user--filter {
    &-item {
      color: #999;
      &:hover {
        background-color: #f7f7f7;
        color: #444;
      }
    }
    .item--active {
      background-color: #f7f7f7;
      color: #444;
    }
  }

  .user {
    border-left: 1px solid #fff;
    .user--info {
      color: #999999;
      .user--info-name {
        color: #444;
      }
    }
    &.select,
    &:hover {
      background-color: #f7f7f7;
    }
  }
  .active {
    background-color: #f7f7f7;
  }
}

//Dark
.search--result[data-theme="dark"] {
  .user--filter {
    &-item {
      color: #999;
      &:hover {
        background-color: #2f3136;
        color: #f7f7f7;
      }
    }
    .item--active {
      background-color: #2f3136;
      color: #f7f7f7;
    }
  }
  .user {
    border-left: 1px solid #27292d;
    .user--info {
      color: #ccc;
      .user--info-name {
        color: #f7f7f7;
      }
    }
    &.select,
    &:hover {
      background-color: #2f3136;
    }
  }
  .active {
    background-color: #2f3136;
  }
}

/* Responsive */

// Extra large devices (large desktops, 1200px and up)
@media (max-width: 1025px) {
  .user {
    .user--info {
      display: none;
    }
    .user--img {
      margin-right: 0px;
    }
  }
}
</style>
