<template>
  <div class="auto--sidebar-wrap p_4">
    <auto-header />
    <auto-search :search.sync="search" @update="search = $event" />
    <loading-component
      v-if="this.$store.getters.statusSyntaxList === 'loading'"
    />
    <div v-else class="auto--list r d_flex align_items_center">
      <div
        class="c_md_6 c_xl_6 text_center mb_2"
        v-for="(syntax, index) in filteredSyntaxList"
        :key="index"
      >
        <div class="auto--list-item" @click="showSyntax(syntax._id)">
          {{ syntax.title }}
        </div>
      </div>
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div
          class="auto--list-item auto--list-plus"
          @click.prevent="createSyntax"
        >
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="16"
            height="16"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AutoHeader from "./autosidebar/auto_sidebar_header";
import AutoSearch from "./autosidebar/auto_sidebar_search";
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    syntaxList() {
      return this.$store.getters.syntaxList;
    },
    filteredSyntaxList() {
      return this.syntaxList.filter(syntax => {
        return syntax.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    createSyntax() {
      this.$store.dispatch("createSyntax");
    },
    showSyntax(syntaxId) {
      this.$store.dispatch("getSyntax", syntaxId);
    }
  },
  components: {
    AutoHeader,
    AutoSearch
  },
  async created() {
    await this.$store.dispatch("getSyntaxList");
  }
};
</script>
<style lang="scss" scoped>
@import "../auto_facebook.style";
</style>
