<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div
          class="modal--header d_flex align_items_center justify_content_between"
        >
          <div class="plugins--icon" @click="closePopupPlugin">
            <icon-base
                    icon-name="back"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
            >
              <icon-arrow-left />
            </icon-base>
          </div>
          <div class="modal-header-title text_center">BeeChat Plugins</div>
        </div>
        <div class="modal--body mt_3">
          <div class="modal--plugins">
            <div class="modal--plugins-title text_left">
              Most used :
            </div>
            <div class="modal--plugins-wrap d_flex">
              <div
                class="modal--plugins-item d_flex align_items_center mr_2"
                @click="openModalPlugins"
              >
                <div class="modal--plugins-img">{}</div>
                <div class="modal--plugins-desc">Setup User Attribute</div>
              </div>
            </div>
          </div>
          <div class="modal--plugins mt_3">
            <div class="modal--plugins-title text_left">
              Sequences
            </div>
            <div class="modal--plugins-wrap d_flex">
              <div class="modal--plugins-item d_flex align_items_center mr_2">
                <div class="modal--plugins-img">
                  <icon-base
                    class="icon-image"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                  >
                    <icon-image />
                  </icon-base>
                </div>
                <div class="modal--plugins-desc">Subscribe to Sequence</div>
              </div>
              <div class="modal--plugins-item d_flex align_items_center mr_2">
                <div class="modal--plugins-img">
                  <icon-base
                    class="icon-image"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                  >
                    <icon-image />
                  </icon-base>
                </div>
                <div class="modal--plugins-desc">Unsubscribe to Sequence</div>
              </div>
            </div>
          </div>
          <div class="modal--plugins mt_3">
            <div class="modal--plugins-title text_left">
              Plugins with Subscriptions:
            </div>
            <div class="modal--plugins-wrap d_flex">
              <div class="modal--plugins-item d_flex align_items_center mr_2">
                <div class="modal--plugins-img">
                  <icon-base
                    class="icon-image"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                  >
                    <icon-image />
                  </icon-base>
                </div>
                <div class="modal--plugins-desc">Google Site Search</div>
              </div>
              <div class="modal--plugins-item d_flex align_items_center mr_2">
                <div class="modal--plugins-img">
                  <icon-base
                    class="icon-image"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                  >
                    <icon-image />
                  </icon-base>
                </div>
                <div class="modal--plugins-desc">Bing Search</div>
              </div>
            </div>
          </div>
          <div class="modal--plugins mt_3">
            <div class="modal--plugins-title text_left">
              Integrations
            </div>
            <div class="modal--plugins-desc text_left mt_3">
              Use these plugins to exchange subscriber data and content with 3rd
              party systems. You can set up similar functionalities (and more)
              directly via BeeChat
            </div>
            <div class="modal--plugins-wrap d_flex">
              <div class="modal--plugins-item d_flex align_items_center mr_2">
                <div class="modal--plugins-img">
                  <icon-base
                    class="icon-image"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                  >
                    <icon-image />
                  </icon-base>
                </div>
                <div class="modal--plugins-desc">Subscribe to Sequence</div>
              </div>
              <div class="modal--plugins-item d_flex align_items_center mr_2">
                <div class="modal--plugins-img">
                  <icon-base
                    class="icon-image"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                  >
                    <icon-image />
                  </icon-base>
                </div>
                <div class="modal--plugins-desc">Subscribe to Sequence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconImage from "@/components/icons/IconImage";
export default {
  props: ["showPopupPlugins"],
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopupPlugin() {
      this.$emit("closePopupPlugin", false);
    },
    openModalPlugins() {
      this.$emit("showAddAttribute", true);
      this.$emit("closePopupPluginClick", false);
    }
  },
  components: {
    IconBase,
    IconArrowLeft,
    IconImage
  }
};
</script>

<style lang="scss" scoped>
@import "./popup_mobile.style";
</style>
