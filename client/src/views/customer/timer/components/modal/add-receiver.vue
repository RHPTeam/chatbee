<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content add--receiver">
        <div class="modal--body">
          <div
            class="receiver--list d_flex justify_content_start align_items_center"
          >
            <div
              class="list--item"
              v-for="user in listUsersShow"
              :key="user._id"
            >
              <img :src="user.avatar" width="36" alt="User Image" />
            </div>
            <div
              v-if="selected.length > 15"
              class="last--item d_flex justify_content_center align_items_center"
            >
              +{{ numberUsersHide }}
            </div>
          </div>
          <div class="receiver--search position_relative">
            <div class="receiver--search-icon position_absolute">
              <icon-base
                icon-name="input-search"
                width="18.066"
                height="18.712"
                viewBox="0 0 18.066 18.712"
              >
                <icon-input-search />
              </icon-base>
            </div>
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <div
            class="receiver--filter d_flex justify_content_center align_items_center"
          >
            <div class="select--wrapper position_relative">
              <select>
                <option>Chọn nhóm</option>
              </select>
            </div>
            <div class="select--wrapper position_relative">
              <select>
                <option>Chọn thẻ</option>
              </select>
            </div>
            <div class="select--wrapper position_relative">
              <select>
                <option>Chọn tài khoản</option>
              </select>
            </div>
            <div class="select--wrapper position_relative">
              <select>
                <option>Chọn số hiển thị</option>
              </select>
            </div>
          </div>
          <div class="receiver--user">
            <div
              class="select--all d_flex justify_content_between align_items_center"
            >
              <div>Chọn tất cả người dùng đang hiển thị</div>
              <div class="checkbox--wrap position_relative">
                <input
                  type="checkbox"
                  id="check-all"
                  v-model="selectAll"
                  @click="select"
                  class="position_absolute"
                />
                <label for="check-all"></label>
              </div>
            </div>
            <VuePerfectScrollbar class="scroll--user">
              <div
                v-for="user in users"
                :key="user._id"
                class="item--user d_flex justify_content_between align_items_center"
              >
                <div
                  class="user--info d_flex justify_content_start align_items_center"
                >
                  <img :src="user.avatar" width="50" alt="User Image" />
                  <span class="user--info-name">{{ user.name }}</span>
                </div>
                <div class="checkbox--wrap position_relative">
                  <input
                    type="checkbox"
                    :id="user._id"
                    :value="user"
                    v-model="selected"
                    class="position_absolute"
                  />
                  <label :for="user._id"></label>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_end align_items_center"
        >
          <button class="btn-cancel" @click="closeAddPopup">Hủy</button>
          <button class="btn-done" @click="submitList">Xong</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import IconBase from "@/components/icons/IconBase";
import IconInputSearch from "@/components/icons/IconInputSearch";
export default {
  props: ["showModal"],
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.users) {
          this.selected.push(this.users[i]);
        }
      }
    },
    submitList() {
      this.$store.dispatch("getUsersSelect", this.selected);
      this.$emit("closeAddPopup", false);
    }
  },
  components: {
    IconBase,
    IconInputSearch,
    VuePerfectScrollbar
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  watch: {
    selected: function() {
      if (this.selected.length == 0) {
        this.selectAll = false;
      }
      if (this.selected.length <= 15) {
        this.listUsersShow = this.selected;
      }
      if (this.selected.length > 15) {
        this.listUsersShow = this.selected.slice(0, 14);
        this.numberUsersHide = this.selected.length - this.listUsersShow.length;
      }
    }
  },
  data() {
    return {
      showModal: true,
      listUsersShow: [],
      numberUsersHide: 0,
      selected: [],
      selectAll: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./modal";
</style>
