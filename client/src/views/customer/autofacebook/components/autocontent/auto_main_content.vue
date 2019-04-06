<template>
  <div class="auto--main-content text_left">
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
      <div class="c_md_6 c_xl_6">
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
                  <contenteditable
                    v-if="item.typeContent === 'text'"
                    class="editable"
                    tag="div"
                    placeholder="Nhập văn bản..."
                    :contenteditable="true"
                    v-model="item.valueContent"
                    @keyup="upTypingText('itemsyntax', item)"
                    @keydown="clear"
                  />
                  <multi
                    v-if="item.typeContent === 'block'"
                    :arrValue="item.valueContent"
                    :content="groupBlock"
                    :contentOther="sequences"
                    @update="item.valueContent = $event"
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
            :class="[
              syntax._facebook.includes(account._id) === true ? 'selected' : ''
            ]"
            v-for="(account, index) in accountFacebookList"
            :key="index"
            @click.prevent="toggleUser(account._id)"
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
</template>
<script>
let typingTimer;
export default {
  data() {
    return {
      isOpenDocument: false,
      isOpenScript: false,
      currentIndexOfUser: null
    };
  },
  async created() {
    await this.$store.dispatch("getAccountsFB");
    await this.$store.dispatch("getGroupBlock");
    await this.$store.dispatch("getSequence");
  },
  computed: {
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
    },
    toggleUser(userId) {
      if (this.syntax._facebook.includes(userId) === true) {
        this.syntax._facebook = this.syntax._facebook.filter(item => {
          if (item === userId) return;
          return true;
        });
        this.$store.dispatch("updateSyntax", this.syntax);
      } else {
        this.syntax._facebook.push(userId);

        this.$store.dispatch("updateSyntax", this.syntax);
      }
    },
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "itemsyntax") {
        typingTimer = setTimeout(this.updateSyntax(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateSyntax() {
      this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../auto_facebook.style";
.block {
  &--body,
  &--footer {
    padding: 0.5rem 0.75rem;
  }
  &--body {
    padding-top: 0;
    padding-bottom: 0;
    &-item {
      border-bottom: 1px solid #cccccc;
      line-height: 36px;
      padding: 0.75rem 0;
      position: relative;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        .action {
          display: flex;
        }
      }
      .action {
        align-items: center;
        cursor: pointer;
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        transition: all 0.4s ease;
        &:hover {
          color: #ffb94a !important;
        }
      }
    }
  }
  &--footer {
    color: #787878;
    font-size: 15px;
    line-height: 1.33;
    margin: 0.75rem 0;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    span {
      color: #ffba3c;
      cursor: pointer;
      border-bottom: 1px dotted #ffba3c;
    }
  }
}
</style>
