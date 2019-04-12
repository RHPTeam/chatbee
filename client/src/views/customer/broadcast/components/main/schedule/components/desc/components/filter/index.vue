<template>
  <div class="filter p_3 mb_3">
    <div
      class="filter--action d_flex align_items_center justify_content_between"
    >
      <!--Start: component filter-->
      <div class="left">
        <app-filter :bcId="broadId" :blockId="this.$route.params.scheduleId" />
      </div>
      <!--End: component filter-->
      <!--Start: Filter icon-->
      <div class="filter--icon d_flex ml_auto">
        <div class="filter--icon-plus text_center">
          <icon-base
            class="icon-plus"
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 63 63"
          >
            <icon-plus />
          </icon-base>
        </div>
        <div class="filter--icon-remove">
          <icon-base
            class="icon-remove"
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <!--End: Filter icon-->
    </div>
    <!--Start: Result filter-->
    <div v-if="!infoGroupFilter"></div>
    <div class="filter--result text_left mt_4" v-else>
      <div>Tìm thấy {{ infoGroupFilter.length }} người khả dụng</div>
      <div class="option--user-list d_flex align_items_center mt_3">
        <div v-for="(item, index) in filterMember" :key="index">
          <div
            :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
            class="option--user-item item d_flex align_items_center justify_content_center mr_2"
          ></div>
        </div>
        <!--        Click show data user in group-->
        <div
          class="option--user-more item text_center"
          v-if="infoGroupFilter.length > 5"
          @click="showMoreFriendFilter = true"
        >
          + {{ infoGroupFilter.length - 5 }}
        </div>
      </div>
    </div>
    <!--    Start: popup show more friend-->
    <transition name="more">
      <more-friend
        v-if="showMoreFriendFilter === true"
        :infoGroupFilter="infoGroupFilter"
        @close="showMoreFriendFilter = $event"
      />
    </transition>
    <!--    End: popup show more friend-->
  </div>
</template>
<script>
import AppFilter from "@/components/shared/filter";
import MoreFriend from "./more_friend";
import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
export default {
  data() {
    return {
      showFilterAttribute: false,
      showFilterOption: false,
      showMoreFriendFilter: false,
      broadId: null
    };
  },
  async created() {
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    this.broadId = result[0]._id;
  },
  computed: {
    infoGroupFilter() {
      return this.$store.getters.infoGroupFilter._friends;
    },
    filterMember() {
      return this.infoGroupFilter.slice(0, 5);
    }
  },
  methods: {},
  watch: {},
  components: {
    AppFilter,
    MoreFriend
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
