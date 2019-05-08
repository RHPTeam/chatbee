<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none">
      <app-auto-mobile />
    </div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        nameBread="Trả lời tự động"
        subBread="Trang giúp bạn thiết lập nhanh AI tự động trả lời"
      />
      <div class="main--content r">
        <div class="auto--sidebar c_md_12 c_xl_4">
          <auto-sidebar />
        </div>
        <div class="auto--main c_md_12 c_xl_8">
          <loading-component
            v-if="this.$store.getters.statusSyntax === 'loading'"
          />
          <div v-else class="auto--main-wrap p_4">
            <div class="auto--content-header d_flex align_items_center mb_3">
              <contenteditable
                class="header--title"
                tag="div"
                :contenteditable="true"
                v-model="syntax.title"
                @keyup="upTypingText('titlesyntax', syntax)"
                @keydown="clear"
              />
              <div class="icon--drop ml_auto" @click="isDeletePopup = true">
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
            <auto-reply-main />
          </div>
        </div>
      </div>
    </div>
    <delete-popup
      v-if="isDeletePopup === true"
      desc="Bạn có thực sự muốn xóa cú pháp này không?"
      :content="syntax._id"
      target="syntax"
      @close="isDeletePopup = $event"
    />
  </div>
</template>

<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AutoSidebar from "./components/auto_sidebar";
import AutoReplyMain from "./components/autocontent/auto_main_content";
import AppAutoMobile from "./mobile/index_mobile";
let typingTimer;
export default {
  data() {
    return {
      isDeletePopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    syntax() {
      if (this.$store.getters.syntax === undefined)
        return { title: "Mặc định (dữ liệu mẫu)" };
      return this.$store.getters.syntax;
    }
  },
  async created() {
    await this.$store.dispatch("getFirstSyntax");
  },
  methods: {
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "titlesyntax") {
        typingTimer = setTimeout(this.updateSyntax(group), 1000);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateSyntax() {
      this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
    }
  },
  components: {
    AppBreadCrumb,
    AutoSidebar,
    AutoReplyMain,
    AppAutoMobile
  }
};
</script>

<style scoped lang="scss">
@import "auto_facebook.style";
</style>
