<template>
  <div class="left--sidebar">
    <app-topbar />
    <VuePerfectScrollbar
      class="scroll-content"
      v-click-outside="hideSearchResult"
    >
      <app-search
        :searchKey="searchKey"
        @update="searchKey = $event"
        @showSearchResult="showSearchResult = $event"
      />
      <div class="list--content">
        <app-search-result
          v-show="showSearchResult"
          :searchKey="searchKey"
          @hideSearchResult="hideSearchResult"
        />
        <app-user
          v-show="!showSearchResult"
          :accountSelectedID="accountSelectedID"
          :friendChoice="friendChoice"
        />
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppTopbar from "./leftsidebar/topbar";
import AppSearch from "./leftsidebar/search";
import AppSearchResult from "./leftsidebar/search-result";
import AppUser from "./leftsidebar/user-item";
export default {
  props: ["friendChoice"],
  data() {
    return {
      searchKey: "",
      accountSelectedID: "",
      showSearchResult: false
    };
  },
  components: {
    AppTopbar,
    AppSearch,
    AppSearchResult,
    AppUser,
    VuePerfectScrollbar
  },
  methods: {
    hideSearchResult() {
      this.showSearchResult = false;
      this.searchKey = "";
    }
  }
};
</script>

<style scoped lang="scss">
.left--sidebar {
  border-right: 1px solid #e4e4e4;
  .scroll-content {
    height: calc(100vh - 322px);
    padding: 2px 0;
  }
}
</style>
