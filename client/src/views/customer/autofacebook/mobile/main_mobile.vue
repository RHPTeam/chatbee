<template>
  <div class="main--content-wrap position_fixed">
    <div
      class="auto--content-header d_flex align_items_center justify_content_between p_3"
    >
      <div class="auto--header-back" @click="closeMainAutoReply">
        <icon-base
          icon-name="icon-arrow"
          width="20"
          height="20"
          viewBox="0 0 25 25"
        >
          <icon-arrow-left />
        </icon-base>
      </div>
      <div class="auto--header-title">Mặc định</div>
      <div class="icon--drop" @click="showModal = true">
        <icon-base
          class="icon--remove"
          icon-name="remove"
          width="26"
          height="26"
          viewBox="0 0 20 20"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <div class="auto--main-content text_left p_3">
      <div class="r mb_4">
        <div class="c_md_6 c_xl_6">
          <div class="divide--title mb_3">Từ khóa</div>
          <taggle
          placeholder="Nhập từ khóa..."
          :arrValue="syntax.name"
          @update="syntax.name = $event"
          type="syntax"
        />
        </div>
        <div class="c_md_6 c_xl_6 mt_4">
          <div class="auto--answer">
            <div class="divide--title mb_3">Trả lời</div>
            <div class="auto--answer-add">
            <div class="block">
              <!-- Start: Add Block or Text Component -->
              <div class="block--body">
                <div
                  class="block--body-item"
                  v-for="(item, index) in syntax.content"
                  :key="index"
                >
                  <editable
                    v-if="item.typeContent === 'text'"
                    :value="item.valueContent"
                    @input="item.valueContent = $event"
                    placeholder="Nhập văn bản..."
                    type="itemSyntax"
                  ></editable>
                  <multi
                    v-if="item.typeContent === 'block'"
                    :value="item.valueContent"
                    :content="groupBlock"
                    :content2="sequences"
                    @input="item.valueContent = $event"
                    placeholder="Chọn nhóm..."
                    type="itemSyntax"
                  ></multi>
                  <span class="action" @click.prevent="removeItem(index)">
                    <icon-base
                      class="icon--remove"
                      icon-name="remove"
                      width="26"
                      height="26"
                      viewBox="0 0 18 18"
                    >
                      <icon-remove />
                    </icon-base>
                  </span>
                </div>
              </div>
              <!--End: Add Block or Text Component-->

              <!-- Start: Footer  Component -->
              <div class="block--footer">
                Thêm <span @click.prevent="createItem('block')">nhóm</span> hoặc
                <span @click.prevent="createItem('text')">văn bản</span>
              </div>
              <!--End: Footer Component-->
            </div>
          </div>
          </div>
        </div>
      </div>
      <div class="r">
        <div class="form_group c_12">
          <div class="divide--title mb_3">Tài khoản áp dụng</div>         
          <ul
          class="list--user"
          v-if="!accountFacebookList || accountFacebookList.length === 0"
        >
          <li>Bạn chưa thêm tài khoản facebook nào!</li>
        </ul>
        <ul v-else class="list--user">
          <!--Selected class-->
          <li
            class="list--user-item"
            v-for="(account, index) in accountFacebookList"
            :key="index"
          >
            <div class="d_flex">
              <div class="images--avatar mr_2">
                <img :src="account.userInfo.thumbSrc" alt="" />
              </div>
              <div>{{ account.userInfo.name }}</div>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from "@/components/icons/IconBase";
import IconRemove from "@/components/icons/IconRemove";
import IconPlus from "@/components/icons/IconPlus";
import IconCancel from "@/components/icons/IconCancel";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
export default {
  props: ["showMainAutoReply"],
  data() {
    return {
      isOpenDocument: false,
      isOpenScript: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    accountFacebookList() {
      return this.$store.getters.accountsFB;
    },
    groupBlock() {
      return this.$store.getters.groups;
    },
    sequences() {
      return this.$store.getters.groupSqc;
    },
    syntax() {
      return this.$store.getters.syntax;
    }
  },
  methods: {
    closeMainAutoReply() {
      this.$emit("closeMainAutoReply", false);
    },
    createItem(type) {
      this.syntax.content.push({
        typeContent: type,
        valueContent: ""
      });
      this.$store.dispatch("updateSyntax", this.syntax);
    },
    removeItem(index) {
      this.syntax.content.splice(index, 1);
      this.$store.dispatch("updateSyntax", this.syntax);
    }
  },
  components: {
    IconBase,
    IconRemove,
    IconPlus,
    IconCancel,
    IconArrowLeft
  }
};
</script>
<style lang="scss" scoped>
@import "./index_mobile.style";
</style>
