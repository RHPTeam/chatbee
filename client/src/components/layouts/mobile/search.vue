<template>
  <div class="search" :data-theme="currentTheme">
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
      <input type="text" placeholder="Tìm kiếm" @click="showSearchModules" />
    </div>
<!--    Start: search message-->
    <search-message v-if="showSearchMessage === true"  @closeSearch="showSearchMessage =$event"/>
<!--    End: search message-->
  </div>
</template>

<script>
  import SearchMessage from "@/views/customer/messagefacebook/mobile/search/search_results_user";
export default {
  data() {
    return {
      keySearch: "",
      showSearchMessage: false,
      showSearchScript: false,
      showSearchBroadcasts: false,
      showSearchAccount: false,
      showSearchFriend: false,
      showSearchAuto: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showSearchModules() {
      if (this.$route.path === "/f-message") {
        this.showSearchMessage = true;
      } else if (this.$route.path === "/f-script") {
        console.log("hello script");
      } else if (this.$route.path === "/f-broadcasts") {
        console.log("hello broadcasts");
      } else if (this.$route.path === "/f-account") {
        console.log("hello account");
      } else if (this.$route.path === "/f-friend") {
        console.log("hello friend");
      } else if (this.$route.path === "/f-auto") {
        console.log("hello reply auto");
      }
    }
  },
  components: {
    SearchMessage
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 8px 16px;
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
}
/* ChangeColor */
// Light
.search[data-theme="light"] {
  input {
    background-color: #f7f7f7;
    color: #444444;
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
