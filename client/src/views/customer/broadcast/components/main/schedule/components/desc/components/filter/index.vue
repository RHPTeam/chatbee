<template>
  <div class="filter p_3 mb_3">
    <div
      class="filter--action d_flex align_items_center justify_content_between"
    >
      <!--Start: component filter-->
      <div class="left">
        <app-filter
          :bcId="broadId"
          :blockId="this.$route.params.scheduleId"
          @openDone="showResultFilter($event)"
          @showSegment="showFriendSegment($event)"
          @showAttribute="showFriendAttr($event)"
          @conditionIsNot="showFriendConditionIsNot($event)"
          @conditionIs="showFriendConditionIs($event)"
        />
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
    <!--Start: Result before filter-->
    <div v-if="showListUserFilterBefore === true">
      <div v-if="!listUserFilter"></div>
      <div class="filter--result text_left mt_4" v-else>
        <div>Tìm thấy {{ listUserFilter.length }} người khả dụng</div>
        <div class="option--user-list d_flex align_items_center mt_3">
          <div v-for="(item, index) in userFilter" :key="index">
            <div
              :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
              class="option--user-item item d_flex align_items_center justify_content_center mr_2"
            ></div>
          </div>
          <!--        Click show data user in group-->
          <div
            class="option--user-more item text_center"
            v-if="listUserFilter.length > 5"
          >
            + {{ listUserFilter.length - 5 }}
          </div>
        </div>
      </div>
    </div>
    <!--End: Result before filter-->

    <!--Start: Result done filter-->
    <div v-if="showListUserFilterDone === true">
      <!--      Start: show result filter with segment-->
      <div v-if="showResultFilterSegment === true">
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
      </div>
      <!--      End: show result filter with segment-->
      <!--      Start: show result filter attribute with name -->
      <div v-if="showResultFilterNameAttr === true">
        <div v-if="!infoFriendWithNameAttr"></div>
        <div class="filter--result text_left mt_4" v-else>
          <div>Tìm thấy {{ infoFriendWithNameAttr.length }} người khả dụng</div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div v-for="(item, index) in sliceFriendWithNameAttr" :key="index">
              <div
                :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div>
            <!--        Click show data user in group-->
            <div
              class="option--user-more item text_center"
              v-if="infoFriendWithNameAttr.length > 5"
              @click="showMoreFriendFilter = true"
            >
              + {{ infoFriendWithNameAttr.length - 5 }}
            </div>
          </div>
        </div>
      </div>
      <!--      End: show result filter attribute with name-->
      <!--      Start: show result filter attribute with condition is -->
      <div v-if="showResultFilterWithConditionIs === true">
        <div v-if="!infoFriendWithConditonIs"></div>
        <div class="filter--result text_left mt_4" v-else>
          <div>
            Tìm thấy {{ infoFriendWithConditonIs.length }} người khả dụng
          </div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div
              v-for="(item, index) in sliceFriendWithConditionIs"
              :key="index"
            >
              <div
                :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div>
            <!--        Click show data user in group-->
            <div
              class="option--user-more item text_center"
              v-if="infoFriendWithConditonIs.length > 5"
              @click="showMoreFriendFilter = true"
            >
              + {{ infoFriendWithConditonIs.length - 5 }}
            </div>
          </div>
        </div>
      </div>
      <!--      End: show result filter attribute with condition-->
      <!--      Start: show result filter attribute with condition is not -->
      <div v-if="showResultFilterWithConditionIsNot === true">
        <div v-if="!infoFriendWithConditonIsNot"></div>
        <div class="filter--result text_left mt_4" v-else>
          <div>
            Tìm thấy {{ infoFriendWithConditonIsNot.length }} người khả dụng
          </div>
          <div class="option--user-list d_flex align_items_center mt_3">
            <div
              v-for="(item, index) in sliceFriendWithConditionIsNot"
              :key="index"
            >
              <div
                :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
                class="option--user-item item d_flex align_items_center justify_content_center mr_2"
              ></div>
            </div>
            <!--        Click show data user in group-->
            <div
              class="option--user-more item text_center"
              v-if="infoFriendWithConditonIsNot.length > 5"
              @click="showMoreFriendFilter = true"
            >
              + {{ infoFriendWithConditonIsNot.length - 5 }}
            </div>
          </div>
        </div>
      </div>
      <!--      End: show result filter attribute with condition-->
    </div>
    <!--End: Result done filter-->

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
      broadId: null,
      listUserFilter: null,
      userFilter: null,
      showListUserFilterBefore: true,
      showListUserFilterDone: false,
      showResultFilterSegment: false,
      showResultFilterNameAttr: false,
      showResultFilterWithConditionIs: false,
      showResultFilterWithConditionIsNot: false
    };
  },
  // show result before fiter
  async created() {
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    this.broadId = result[0]._id;
    const dataSender = {
      broadId: result[0]._id,
      blockId: this.$route.params.scheduleId
    };
    let listUser = await BroadcastService.showSchedule(
      dataSender.broadId,
      dataSender.blockId
    );
    this.userFilter = listUser.data.data[0]._friends;
    this.listUserFilter = this.userFilter.slice(0, 5);
  },
  computed: {
    // Get info group friend when choose segment
    infoGroupFilter() {
      return this.$store.getters.infoGroupFilter._friends;
    },
    // Get info item start 0 to 5 on array group friend
    filterMember() {
      return this.infoGroupFilter.slice(0, 5);
    },
    // Get info friend when user choose name attribute
    infoFriendWithNameAttr() {
      return this.$store.getters.filterFriendAttribute;
    },
    // Get info item start 0 to 5 on array group friend
    sliceFriendWithNameAttr() {
      return this.infoFriendWithNameAttr.slice(0, 5);
    },
    // Get info friend when user choose name attribute with condition is value
    infoFriendWithConditonIs() {
      return this.$store.getters.filterFriendCondition;
    },
    // Get info item start 0 to 5 on array group friend with condition is
    sliceFriendWithConditionIs() {
      return this.infoFriendWithConditonIs.slice(0, 5);
    },
    // Get info friend when user choose name attribute with condition is not value
    infoFriendWithConditonIsNot() {
      return this.$store.getters.filterFriendConditionIsNot;
    },
    // Get info item start 0 to 5 on array group friend with condition is not
    sliceFriendWithConditionIsNot() {
      return this.infoFriendWithConditonIsNot.slice(0, 5);
    }
  },
  methods: {
    // Show result after filter done
    showResultFilter(event) {
      this.showListUserFilterBefore = false;
      this.showListUserFilterDone = event;
    },
    // show result friend when choose segment
    showFriendSegment(event) {
      this.showResultFilterSegment = event;
      this.showResultFilterNameAttr = false;
      this.showResultFilterWithConditionIsNot = false;
      this.showResultFilterWithConditionIs = false;
    },
    // show result friend when choose name attribute
    showFriendAttr(event) {
      this.showResultFilterSegment = false;
      this.showResultFilterNameAttr = event;
      this.showResultFilterWithConditionIsNot = false;
      this.showResultFilterWithConditionIs = false;
    },
    // show result friend when choose condition is attribute
    showFriendConditionIsNot(event) {
      console.log("is not");
      this.showResultFilterSegment = false;
      this.showResultFilterNameAttr = false;
      this.showResultFilterWithConditionIs = false;
      this.showResultFilterWithConditionIsNot = event;
    },
    // show result friend when choose condition is not attribute
    showFriendConditionIs(event) {
      console.log("is");
      this.showResultFilterSegment = false;
      this.showResultFilterNameAttr = false;
      this.showResultFilterWithConditionIsNot = false;
      this.showResultFilterWithConditionIs = event;
    }
  },
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
