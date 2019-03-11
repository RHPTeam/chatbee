<template>
    <div class="users--table mt_3">
        <div class="user--table-item header">
            <div class="checkbox">
                <span class="checkbox--control">
                    <input type="checkbox" 
                            class="checkbox--control-input"
                            name="">
                    <span class="checkbox--control-checkmark"></span>
                </span>
            </div>
            <div class="name">Name</div>
            <div class="locale">Locale</div>
            <div class="updated-date">Last screen</div>
            <div class="created-date">Sign up</div>
            <div class="source">Source</div>
            <div class="sessions">Sesssions</div>
            <div class="attributes">Attributes</div>
            <div class="status">Status</div>
            <div class="last">
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
        </div>
        <div class="user--table-item record">
            <div class="checkbox">
                <span class="checkbox--control">
                    <input type="checkbox" 
                            class="checkbox--control-input"
                            name="">
                    <span class="checkbox--control-checkmark"></span>
                </span>
            </div>
            <div class="name">Name</div>
            <div class="locale">Locale</div>
            <div class="updated-date">Last screen</div>
            <div class="created-date">Sign up</div>
            <div class="source">Source</div>
            <div class="sessions">Sesssions</div>
            <div class="attributes">Attributes</div>
            <div class="status">Status</div>
            <div class="last">
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
        </div>
    </div>
</template>

<script>
import IconBase from "@/components/icons/IconBase";
import IconArrowDown from "@/components/icons/IconArrowDown";

export default {
    components: {
        IconBase,
        IconArrowDown
    }
}
</script>

<style lang="scss" scoped>
    .users--table {
        .user--table-item {
            display: flex;
            align-items: center;
            padding: 1rem 0;

            &.header {
                background-color: #fff;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }

            &.record {
                background-color: #f9f9f9;

                &:hover {
                    background-color: #fff;
                }
            }

            .checkbox {
                text-align: center;

                &--control {
                    display: inline-block;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;

                    &-input {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        width: 20px;
                        height: 20px;
                        z-index: 10;
                        opacity: 0;

                        &:checked {
                            &~.checkbox--control-checkmark {
                                border-color: #ffb94a;
                                background-color: #ffb94a;
                                opacity: 1;

                                &::after{
                                    display: block;
                                }
                            }
                        }
                    }
                    
                    &-checkmark {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 20px;
                        height: 20px;
                        z-index: 1;
                        border: 2px solid #e4e4e4;
                        border-radius: .375rem;
                        // background: url(/src/components/users/users-table/assets/images/ic_checkbox.svg) center center no-repeat;
                        opacity: 0.6;

                        &::after{
                            content: "";
                            position: absolute;
                            display: none;
                            left: 5px;
                            top: 2px;
                            width: 5px;
                            height: 10px;
                            border: solid #fff;
                            border-width: 0 3px 3px 0;
                            -webkit-transform: rotate(45deg);
                            -ms-transform: rotate(45deg);
                            transform: rotate(45deg);
                        }
                    }
                }
            }

            .last {
                text-align: center;
            }

            div:nth-of-type(1) {flex-grow: 1;}
            div:nth-of-type(2) {flex-grow: 3;}
            div:nth-of-type(3) {flex-grow: 1;}
            div:nth-of-type(4) {flex-grow: 1;}
            div:nth-of-type(5) {flex-grow: 1;}
            div:nth-of-type(6) {flex-grow: 2;}
            div:nth-of-type(7) {flex-grow: 1;}
            div:nth-of-type(8) {flex-grow: 1;}
            div:nth-of-type(9) {flex-grow: 2;}
            div:nth-of-type(10) {flex-grow: 1;}
        }
    }
</style>

