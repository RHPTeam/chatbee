<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content p_4">
        <div class="modal--header d_flex align_items_center justify_content_between">
          <div class="modal-header-title">BeeChat Plugins</div>
          <div class="plugins--close" @click="closePopupPlugin">
            <icon-base icon-name="close" width="24" height="24" viewBox="0 0 25 25">
              <icon-close/>
            </icon-base>
          </div>
        </div>
        <div class="modal--body">
          <div class="plugins--title text_left mt_4">Most used :</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/json.png" alt class="position_absolute">
                </div>JSON API
                <div class="plugins--item-help position_absolute">
                  <img src="@/assets/images/plugins/info.svg" alt class="position_absolute">
                </div>
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/user-input.png" alt class="position_absolute">
                </div>User input
                <div class="plugins--item-help position_absolute">
                  <img src="@/assets/images/plugins/info.svg" alt class="position_absolute">
                </div>
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/send-mail.png" alt class="position_absolute">
                </div>Send Mail
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/list.svg" alt class="position_absolute">
                </div>List
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/live-chat.png" alt class="position_absolute">
                </div>Live Chat
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img
                    src="@/assets/images/plugins/setup-attribute.svg"
                    alt
                    class="position_absolute"
                  >
                </div>Setup User Attribute
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/go-block.svg" alt class="position_absolute">
                </div>Go to Block
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/audio.svg" alt class="position_absolute">
                </div>Audio
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/video.svg" alt class="position_absolute">
                </div>Video
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/location.svg" alt class="position_absolute">
                </div>Share Location
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/comment.svg" alt class="position_absolute">
                </div>Comment
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/user-email.svg" alt class="position_absolute">
                </div>User Email
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/user-phone.svg" alt class="position_absolute">
                </div>User Phone Number
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/google-sheet.svg" alt class="position_absolute">
                </div>Save to Google Sheets
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
          </div>
          <div class="plugins--title text_left mt_4">Sequences</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/subscribe.svg" alt class="position_absolute">
                </div>Subscribe from Sequence
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/unsubscribe.svg" alt class="position_absolute">
                </div>Unsubscribe from Sequence
              </div>
            </div>
          </div>
          <div class="plugins--title text_left mt_4">Plugins with Subscriptions:</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/google.png" alt class="position_absolute">
                </div>Google Site Search
                <div class="plugins--item-help position_absolute">
                  <img src="@/assets/images/plugins/info.svg" alt class="position_absolute">
                </div>
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/bing.png" alt class="position_absolute">
                </div>Bing Search
                <div class="plugins--item-help position_absolute">
                  <img src="@/assets/images/plugins/info.svg" alt class="position_absolute">
                </div>
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/swiftype.svg" alt class="position_absolute">
                </div>Swiftype Search
                <div class="plugins--item-help position_absolute">
                  <img src="@/assets/images/plugins/info.svg" alt class="position_absolute">
                </div>
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/rss.png" alt class="position_absolute">
                </div>RSS Import
                <div class="plugins--item-help position_absolute">
                  <img src="@/assets/images/plugins/info.svg" alt class="position_absolute">
                </div>
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/subscriber.svg" alt class="position_absolute">
                </div>Subscriber
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img
                    src="@/assets/images/plugins/subscriptions-list.png"
                    alt
                    class="position_absolute"
                  >
                </div>Subscriptions List
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
            <div
              class="plugins--item d_flex align_items_center m_2 position_relative disable"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img src="@/assets/images/plugins/digest.png" alt class="position_absolute">
                </div>Digest
              </div>
              <div class="plugin--item-tooltip">
                <app-tooltip/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTooltip from "./tooltip_plugin";
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
    AppTooltip
  }
};
</script>

<style lang="scss" scoped>
@import "popup_plugins.style";
</style>
