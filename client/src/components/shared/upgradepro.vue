<template>
    <div class="modal--wrapper">
        <div class="modal--dialog d_flex justify_content_center align_items_center">
            <div class="modal--content">
                <div class="modal--header">
                    This is header
                </div>
                <div class="modal--body">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
                    nonumy eirmod tempor invidunt ut labore et.
                </div>
                <div class="modal--footer d_flex justify_content_between align_items_center">        
                    <button class="btn-skip" @click="closeAddPopup">HỦY</button>
                    <button class="btn-contact">
                        LIÊN HỆ NGAY
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: ["showUpgradePro"],

  data () {
    return {
      cookie: '',
    }
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    }
  },

  components: {
    
  },

};
</script>

<style lang="scss" scoped>
    .modal--wrapper {
        background-color: rgba(153, 153, 153, 0.4);
        font-family: "Open Sans", sans-serif;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;

        .modal--dialog {
            width: 100%;
            height: 100%;

            .modal--content {
                width: 440px;
                border-radius: 10px;
                padding: 1rem;
                background-color: #fff;

                .modal--footer {
                    padding: 20px 30px 30px 30px;
                    font-size: 14px;

                    .btn-contact {
                        width: 132px;
                        height: 40px;
                        border-radius: 10px;
                        background-color: #ffb94a;
                        border: 1px solid #ffb94a;
                        font-weight: 600;
                        color: #fff;
                        transition: all 0.4s ease;
                        cursor: pointer;
                        outline: none;
                    }

                    .btn-skip {
                        background-color: transparent;
                        border: 0;
                        color: #999;
                        font-weight: 600;
                        cursor: pointer;
                        outline: none;
                    }
                }
            }
        }
        
    }

    /*Transition popup*/
    .popup-enter {
        transform: translateY(-100%);
    }
    .popup-enter-to {
        transition: transform 0.75s;
        transform: translateY(0);
    }
    .popup-leave-to {
        transition: transform 0.75s;
        transform: translateY(-100%);
    }


    /* ChangeColor */

    // Light
    .modal--wrapper[data-theme="light"] {
        color: #444444;
        .modal--content {
            background-color: #fff;
            .modal--header {
                color: #fff;
            }
        }
    }

    //Dark
    .modal--wrapper[data-theme="dark"] {
        color: #f7f7f7;

        .modal--content {
            background-color: #27292d;
            .modal--header {
                color: #27292d;
            }
        }
    }
</style>
