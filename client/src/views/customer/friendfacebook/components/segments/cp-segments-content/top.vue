<template>
    <div class="top d_flex">
        <div class="top--left d_flex">
            <div class="segment--name mr_1">
                Đã tiếp cận
            </div>
            <div class="segment--total">
                <span class="font_weight_bold">2046 out of</span> 187 741 people
            </div>
        </div>
        <div class="top--right d_flex">
            <div class="action mr_2">Save to Segment</div>
            <div class="action mr_2">Delete</div>
            <div class="action mr_2">Export</div>
            <div class="action sequence--menu">
                <div class="btn--sequence" @click="showSequenceDropdown = !showSequenceDropdown">
                    Sequence
                        <icon-base
                            class="ml_1"
                            icon-name="icon-arrow-down"
                            width="14"
                            height="14"
                            viewBox="0 0 160 160"
                        >
                            <icon-arrow-down />
                        </icon-base>
                </div>
                <div class="dropdown" v-if="showSequenceDropdown">
                    <div class="dropdown--item">
                        Subcribe to Sequence 
                    </div>
                    <div class="dropdown--item">
                        Unsubcribe from Sequence 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowDown from "@/components/icons/IconArrowDown";
export default {
    components: {
        IconBase,
        IconArrowDown,
    },

    data() {
        return {
            showSequenceDropdown: false,
        }
    }
}
</script>

<style lang="scss" scoped>
    .top {
        justify-content: space-between;

        &--left {
            align-items: center;

            .segment--name {
                cursor: pointer;
                padding: .375rem .75rem;

                &:hover {
                    background-color: #fff;
                    border: 1px solid #e4e4e4;
                    border-radius: 10px;
                }
            }
        }

        &--right {
            .action {
                border: 1px solid #e4e4e4;
                border-radius: 10px;
                cursor: pointer;
                padding: .375rem .75rem;

                &:hover {
                    background-color: #fbfbfb;
                }
            }

            .sequence--menu {
                position: relative;

                svg {
                    color: #444;
                    stroke: #444;
                    stroke-width: 5;
                    vertical-align: middle;
                }

                .dropdown {
                    background-color: #fff;
                    border: 1px solid #e4e4e4;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
                    padding: .375rem 0; 
                    position: absolute;
                    top: 100%;
                    right: 0;
                    min-width: 13rem;
                    width: auto;
                    z-index: 999;

                    &--item {
                        padding: .375rem .75rem;

                        &:hover {
                            background-color: #ffb94a;
                            color: #fff;
                            
                        }
                    }
                }
            }
        }
    }
</style>


