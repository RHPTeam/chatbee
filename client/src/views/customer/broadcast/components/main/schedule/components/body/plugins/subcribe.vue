<template>
  <div class="subcrible card text_left mb_4 mt_4" :data-theme="currentTheme">
    <div class="card_body">
      <div
        class="header d_flex align_items_center justify_content_between mb_3"
      >
        <h3 class="title">Đăng ký trình tự</h3>
        <div class="icon--remove ml_auto" @click="isDeleteItemSchedule = true">
          <icon-base
            icon-name="remove"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="desc mb_3">
        Theo dõi người dùng bằng cách nhập các thông tin cần thiết nhằm lọc ra
        những đối tượng chi tiết tùy vào các thuộc tính mà bạn lựa chọn trong bộ
        lọc.
      </div>
<!--      <div class="subcrible&#45;&#45;filter mb_3">-->
<!--        <div class="body mb_3" v-if="showFilter === true">-->
<!--          &lt;!&ndash;Start: Add Filter&ndash;&gt;-->
<!--          <div-->
<!--            class="option d_flex align_items_center pb_2 pt_2"-->
<!--            v-if="addFilter === true"-->
<!--          >-->
<!--            <filter-bee />-->
<!--            <div class="icon d_flex align_items_center">-->
<!--              <div-->
<!--                class="add and cp position_relative"-->
<!--                @click.prevent="showCondition = !showCondition"-->
<!--              >-->
<!--                và-->
<!--                <div-->
<!--                  class="condition position_absolute"-->
<!--                  v-if="showCondition === true"-->
<!--                >-->
<!--                  <div class="item">và</div>-->
<!--                  <div class="item">hoặc</div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="icon&#45;&#45;drop cp ml_1">-->
<!--                <icon-base-->
<!--                  icon-name="remove"-->
<!--                  width="18"-->
<!--                  height="18"-->
<!--                  viewBox="0 0 18 18"-->
<!--                >-->
<!--                  <icon-remove />-->
<!--                </icon-base>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash;End: Add Filter&ndash;&gt;-->
<!--          &lt;!&ndash;Start:  Filter&ndash;&gt;-->
<!--          <div class="option d_flex align_items_center pb_2 pt_2">-->
<!--            <filter-bee />-->
<!--            <div class="icon d_flex align_items_center">-->
<!--              <div class="add cp" @click.prevent="addFilter = !addFilter">-->
<!--                <icon-base-->
<!--                  icon-name="plus"-->
<!--                  width="18"-->
<!--                  height="18"-->
<!--                  viewBox="0 0 60 60"-->
<!--                >-->
<!--                  <icon-plus />-->
<!--                </icon-base>-->
<!--              </div>-->
<!--              <div class="icon&#45;&#45;drop cp ml_1">-->
<!--                <icon-base-->
<!--                  icon-name="remove"-->
<!--                  width="18"-->
<!--                  height="18"-->
<!--                  viewBox="0 0 18 18"-->
<!--                >-->
<!--                  <icon-remove />-->
<!--                </icon-base>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash;End:  Filter&ndash;&gt;-->
<!--          &lt;!&ndash;Start: Result Filter&ndash;&gt;-->
<!--          <div class="result d_flex align_items_center mb_3 mt_3">-->
<!--            <div class="item text_center">K</div>-->
<!--            <div class="item text_center">K</div>-->
<!--            <div class="desc ml_2">Xem những người phù hợp với bộ lọc</div>-->
<!--          </div>-->
<!--          &lt;!&ndash;End: Result Filter&ndash;&gt;-->
<!--        </div>-->
<!--        <button-->
<!--          class="btn btn_warning btn&#45;&#45;add"-->
<!--          @click="showFilter = !showFilter"-->
<!--        >-->
<!--          Thêm bộ lọc-->
<!--        </button>-->
<!--      </div>-->
      <div class="subcrible--edit mb_3">
        <list
          :sequence="item"
          :block="schedule"
          @update="updateToParent($event)"
        />
      </div>
    </div>
    <!--Start:Delete Item Popup-->
    <delete-item
      v-if="isDeleteItemSchedule === true"
      desc="Bạn có thực sự muốn xóa nội dung này trong chiến dịch không?"
      :block="schedule._id"
      :content="item._id"
      target="itemschedule"
      @close="isDeleteItemSchedule = $event"
    />
    <!--End: Delete Item Popup-->
  </div>
</template>
<script>
import List from "./list_sequence";
export default {
  props: {
    schedule: Object,
    item: Object
  },
  data() {
    return {
      showFilter: false,
      addFilter: false,
      showCondition: false,
      isDeleteItemSchedule: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateToParent(value) {
      this.$emit("updateItemFromMiddleComponent", value);
    }
  },
  components: {
    List
  }
};
</script>
<style lang="scss" scoped>
@import "./plugins.style";
</style>
