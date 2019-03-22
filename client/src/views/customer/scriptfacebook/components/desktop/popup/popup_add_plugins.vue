<template>
  <div class="modal--wrapper position_fixed" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content p_4">
        <div
          class="modal--header d_flex align_items_center justify_content_between"
        >
          <div class="modal-header-title">BeeChat Plugins</div>
          <div class="plugins--close" @click="closePopupPlugin">
            <icon-base
              icon-name="close"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-close />
            </icon-base>
          </div>
        </div>
        <div class="modal--body">
          <div class="plugins--title text_left mt_4">Most used :</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listMostUsed"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div class="plugin--item-tooltip" v-if="plugin.isActive == false">
                <app-tooltip />
              </div>
            </div>
          </div>
          <div class="plugins--title text_left mt_4">Sequences</div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listSequences"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div class="plugin--item-tooltip" v-if="plugin.isActive == false">
                <app-tooltip />
              </div>
            </div>
          </div>
          <div class="plugins--title text_left mt_4">
            Plugins with Subscriptions:
          </div>
          <div class="plugins--wrap d_flex m_n2 flex_wrap">
            <div
              v-for="(plugin, index) in listSubscriptions"
              :key="index"
              :class="{ active: plugin.isActive }"
              class="plugins--item d_flex align_items_center m_2 position_relative"
              @click="openModalPlugins"
            >
              <div class="plugin--item-wrap">
                <div class="plugins--item-icon position_absolute">
                  <img :src="plugin.src" alt class="position_absolute" />
                </div>
                {{ plugin.name }}
                <div
                  class="plugins--item-help position_absolute"
                  v-if="plugin.hasInfo"
                >
                  <icon-base
                    class="position_absolute"
                    icon-name="question"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <icon-question />
                  </icon-base>
                </div>
              </div>
              <div class="plugin--item-tooltip" v-if="plugin.isActive == false">
                <app-tooltip />
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
import IconQuestion from "@/components/icons/IconQuestion";
import AppTooltip from "./tooltip_plugin";
export default {
  props: ["showPopupPlugins"],
  data() {
    return {
      listMostUsed: [
        {
          name: "JSON API",
          src: require("@/assets/images/plugins/json.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "User input",
          src: require("@/assets/images/plugins/user-input.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Send Mail",
          src: require("@/assets/images/plugins/send-mail.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "List",
          src: require("@/assets/images/plugins/list.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Live Chat",
          src: require("@/assets/images/plugins/live-chat.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Setup User Attribute",
          src: require("@/assets/images/plugins/setup-attribute.svg"),
          hasInfo: false,
          isActive: true
        },
        {
          name: "Go to Block",
          src: require("@/assets/images/plugins/go-block.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Audio",
          src: require("@/assets/images/plugins/audio.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Video",
          src: require("@/assets/images/plugins/video.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Share Location",
          src: require("@/assets/images/plugins/location.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Comment",
          src: require("@/assets/images/plugins/comment.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "User Email",
          src: require("@/assets/images/plugins/user-email.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "User Phone Number",
          src: require("@/assets/images/plugins/user-phone.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Save to Google Sheets",
          src: require("@/assets/images/plugins/google-sheet.svg"),
          hasInfo: false,
          isActive: false
        }
      ],
      listSequences: [
        {
          name: "Subscribe from Sequence",
          src: require("@/assets/images/plugins/subscribe.svg"),
          hasInfo: false,
          isActive: true
        },
        {
          name: "Unsubscribe from Sequence",
          src: require("@/assets/images/plugins/unsubscribe.svg"),
          hasInfo: false,
          isActive: true
        }
      ],
      listSubscriptions: [
        {
          name: "Google Site Search",
          src: require("@/assets/images/plugins/google.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Bing Search",
          src: require("@/assets/images/plugins/bing.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Swiftype Search",
          src: require("@/assets/images/plugins/swiftype.svg"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "RSS Import",
          src: require("@/assets/images/plugins/rss.png"),
          hasInfo: true,
          isActive: false
        },
        {
          name: "Subscriber",
          src: require("@/assets/images/plugins/subscriber.svg"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Subscriptions List",
          src: require("@/assets/images/plugins/subscriptions-list.png"),
          hasInfo: false,
          isActive: false
        },
        {
          name: "Digest",
          src: require("@/assets/images/plugins/digest.png"),
          hasInfo: false,
          isActive: false
        }
      ]
    };
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
    AppTooltip,
    IconBase,
    IconQuestion
  }
};
</script>

<style lang="scss" scoped>
@import "popup_plugins.style";
</style>
