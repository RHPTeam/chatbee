import PopupPlugins from "../popup/popup_add_plugins";

import BlockService from "@/services/modules/block.service";
// import SequenceService from "@/services/modules/sequence.service";
export default {
    data() {
        return {
            textValue: "",
            showPopupPlugins: false,
            showAddAttribute: false,
            isShowAddAttribute: false,
            showOptionTablet: false,
            time: 2,
            maxtime: 24,
            mintime: 0,
            percentTime: 0
        };
    },
    methods: {
        // Close option in screen tablet
        closeOptionTablet() {
            this.showOptionTablet = false;
        },
        // Delete Block
        deleteBlock(blockId) {
            this.$store.dispatch("deleteBlock", blockId);
        },
        // Add Text Value in block
        addItemBlock(type, blockId) {
            const dataSender = {
                value: "",
                type: type,
                id: blockId
            };
            this.$store.dispatch("createItemBlock", dataSender);
        },
        changeTime(e) {
            this.time = e.target.value;

        },
    },
    computed: {
        currentTheme() {
            return this.$store.getters.themeName;
        },
        block() {
            return this.$store.getters.block;
        },
        sequence() {
            return this.$store.getters.itemSqc;
        }
    },
    async created() {
        this.percentTime = (parseInt(this.time) * 100) / (parseInt(this.maxtime) - parseInt(this.mintime));
        const blocks = await BlockService.index();
        const firstBlockId = blocks.data.data[0]._id;
        this.$store.dispatch("getBlock", firstBlockId);
    },
    components: {
        PopupPlugins
    },
    watch: {
        time() {
            this.percentTime = (parseInt(this.time) * 100) / (parseInt(this.maxtime) - parseInt(this.mintime));
        }
    }
};