<!--Template Main Scripts Desktop-->
<template>
  <div class="main p_3">
    <!--Start: Main Header-->
    <app-header />
    <!--End: Main Header-->

    <!--Start: Main Desc-->
    <div class="main--desc">
      <div class="desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi
        eius ex officia voluptas. A, corporis delectus dolorum, enim
        exercitationem explicabo modi numquam obcaecati perferendis quas
        quibusdam quod sint, soluta!
      </div>
      <!--Start: Component filter-->
      <!--End: Component filter-->

      <!--Start: Component Timer-->
      <!--End: Component Timer-->
    </div>
    <!--End: Main Desc-->

    <!--Start: Main Body-->
    <!--End: Main Body-->

    <!--Start: Main Footer-->
    <!--End: Main Footer-->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";

/************* CUSTOM CSS COMPONENT ****************/
/**
* NOTE: U have to code scss with 3 level which mean is 3 indent
 */

.main {
  font-size: 14px;
  /********Script Header*******/
  .script--header {
    margin-bottom: 20px;

    .script--header-title {
      font-size: 24px;
    }

    .script--header-copy-link {
      margin-left: 1rem;

      > * + * {
        margin-left: 151rem;
      }
    }
    .script--header-delete {
      cursor: pointer;
    }
  }

  /**********Script Body*******/
  .script--body {
    > div {
      position: relative;
    }

    /***********Script Tag**********/
    .script--body-tag {
      text-align: left;
      padding: 15px;
      border-radius: 10px;
      max-width: 626px;

      .script--body-tag-icon {
        align-items: center;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        height: 30px;
        width: 30px;
        margin-right: 10px;
      }

      &-title {
        display: flex;
        align-items: center;
      }

      &-title {
        font-size: 14px;
        margin-bottom: 15px;
      }

      &-description {
        font-size: 13px;
        margin-bottom: 15px;
      }

      &-edit-title {
        text-transform: uppercase;
        margin-bottom: 10px;

        span {
          width: 50%;
          flex: 0 0 50%;
        }
      }

      &-item {
        margin: 0 -5px;
        position: relative;

        > div {
          align-items: center;
          border: 0;
          border-radius: 10px;
          display: flex;
          height: 40px;
          margin: 0 5px;
          padding: 0 10px;
          width: calc(50% - 30px);

          > div[name="text"],
          > div[name="value"] {
            color: #f96666;
            font-size: 14px;
          }
        }

        span {
          align-items: center;
          border-radius: 5px;
          display: inline-flex;
          justify-content: center;
          margin-left: 10px;
          height: 20px;
          width: 20px;
        }
      }

      &-footer {
        margin-top: 20px;
      }

      &-add {
        border-radius: 10px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin: 15px 0 0;
        padding: 10px;

        span + span {
          margin-left: 10px;
        }
      }
    }
  }
  .option--user-tag {
    .option--user-list {
      .item {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .option--user-item {
        background-size: cover;
        background-position: center;
        background-image: url("https://i.a4vn.com/2018/9/14/anh-gai-xinh-trong-bo-ao-ngu-sexy-nghet-tho-a15dfe.jpg");
      }
      .option--user-more {
        line-height: 36px;
      }
    }
  }
  .option--time {
    background: #f7f7f7;
    border-radius: 10px;
    max-width: 626px;
    .icon {
      top: 7px;
      right: 10px;
      svg {
        color: #ffffff;
      }
    }
    .option--time-item {
      height: 40px;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
      background: #ffffff;
      cursor: pointer;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
        border: solid 1px rgba(0, 0, 0, 0.16);
      }
    }
    .option--choose-days {
      top: 0;
      left: 0;
      z-index: 99;
      .datetime-picker {
        > input {
          width: 185px !important;
        }
      }
    }
    .option--time-hours {
      width: 100px;
    }
    .option--repeat {
      background: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
      cursor: pointer;
      top: 0;
      left: 0;
      width: 250px;
      z-index: 99;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
      border: solid 1px rgba(0, 0, 0, 0.12);
      transition: max-height 150ms cubic-bezier(0.22, 0.61, 0.36, 1),
        opacity 200ms cubic-bezier(0.22, 0.61, 0.36, 1);
      &-item {
        padding: 10px 36px 10px 16px;
        &:hover {
          background-color: #f7f7f7;
        }
        &:first-child {
          &:hover {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
        &:last-child {
          &:hover {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
  }
  .option--custom {
    width: 100%;
    &-wrap {
      background: #f7f7f7;
      margin: auto;
      width: 350px;
      border-radius: 10px;
      .option--custom-item {
        cursor: pointer;
        width: 50px;
        padding: 8px;
        &:hover {
          background: #ffb94a;
        }
        &:first-child {
          &:hover {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
        }
        &:last-child {
          &:hover {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
  }
  /********Script Footer******/
  .script--footer {
    .script--footer-addelm {
      text-align: left;

      .title {
        font-size: 18px;
        margin-bottom: 15px;
        margin-top: 25px;
        text-align: left;
      }
    }
    /**     Script Body Text Edit     **/
    .script--body-text {
      margin: 0 0 25px;
      position: relative;

      .script--body-text-edit {
        background: #ffffff;
        border-radius: 10px;
        border: 10px solid #f7f7f7;
        min-height: 60px;
        text-align: left;
        padding: 10px 16px;
        width: 280px;
        &:focus,
        &:active,
        &:visited {
          box-shadow: none;
          outline: 0;
        }
      }
    }

    /**      Script Body Upload Image    **/
    .script--body-image {
      height: 207px;
      margin-bottom: 25px;
      &:hover,
      &:focus,
      &:visited,
      &:active {
        > .script--body-upload-image {
          display: block;
        }
      }
      .scrip--body-image-link {
        border-radius: 10px;
        overflow: hidden;
        width: 280px;
      }

      .script--body-upload-image {
        background-color: rgba(153, 153, 153, 0.4);
        border-radius: 10px;
        color: #ffffff;
        display: none;
        height: 100%;
        width: 280px;
        top: 0;
        left: 0;
        z-index: 1;

        input#upload_image {
          cursor: pointer;
          height: 100%;
          left: 0;
          opacity: 0;
          top: 0;
          position: absolute;
          width: 100%;
          z-index: 2;
        }

        .script--body-image-icon {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          cursor: pointer;
          width: 100%;
        }
      }

      .script--body-delete,
      .script--body-move {
        cursor: pointer;
      }
    }

    .gr-addelm {
      margin: 0 -5px;

      .addelm-item {
        border-radius: 10px;
        padding: 9.5px 12px;
        font-size: 14px;
        min-width: 70px;
        margin: 1px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        svg {
          margin-bottom: 10px;
        }
      }

      @media (min-width: 992px) and (max-width: 1200px) {
        flex-wrap: wrap;
        .addelm-item {
          width: calc(50% - 10px);
        }
      }
    }
  }
}

/************* CUSTOM CSS THEME ****************/

/******** 01. Theme Light *********/

div[data-theme="light"] .main {
  background: #fff;
  /********Script Header*******/
  .script--header {
    .script--header-title {
      color: #444;
    }
  }

  /*********Script Body*******/
  .script--body {
    svg {
      fill: #ccc;
      color: #ccc;
    }

    /*****Script Body Timer*****/
    .script--body-timer {
      background: #f7f7f7;

      .script--body-timer-icon {
        background-color: #fff;
      }

      input[type="number"] {
        background-color: #fff;
        color: #444;
      }

      select#choose_timer {
        background-color: #fff;
        color: #444;
      }
    }

    /***********Script Tag**********/
    .script--body-tag {
      color: #444;
      background: #f7f7f7;

      &-icon {
        background: #fff;

        svg {
          fill: #999999;
          color: #999999;
        }
      }

      &-item {
        > div {
          background: #fff;
        }

        span {
          background: #cccccc;

          svg {
            color: #999999;
          }
        }
      }

      &-footer {
        border-top: 1px solid #e4e4e4;
      }

      &-add {
        border: 1px solid #ccc;
        color: #444;

        &:hover {
          background: #ffb94a;
          color: #fff;
        }

        svg {
          color: #ccc;
        }
      }
    }
  }

  /********Script Footer******/
  .script--footer {
    .script--footer-addelm {
      color: #444;

      .title {
        color: #666;
      }
    }
    .addelm-item {
      background-color: #f7f7f7;
    }
  }
}

/******** 02. Theme Dark *********/

div[data-theme="dark"] .main {
  color: #666666;
  /********Script Header*******/
  .script--header {
    .script--header-title {
      color: #fff;
    }
  }
  /*****Script Body Text Edit*****/
  .script--body-text {
    .script--body-text-edit {
      background: #27292d;
      border: 10px solid #2f3136;
      color: #fff;

      > div {
        &:focus,
        &:hover {
          outline: none;
        }
      }
    }
  }

  /*****Script Body Upload Image*****/
  .script--body-image {
    .script--body-upload-image {
      background: #2f3136;
    }

    &:hover {
      .scrip--body-image-link + .script--body-upload-image {
        color: #fff;
        background: rgba(153, 153, 153, 0.6);
        z-index: 2;
      }

      svg {
        fill: #fff;
        color: #fff;
      }
    }
  }

  /*********Script Body*******/
  .script--body {
    svg {
      fill: #ccc;
      color: #ccc;
    }

    /***********Script Tag**********/
    .script--body-tag {
      color: #fff;
      background: #27292c;

      &-icon {
        background: #27292d;

        svg {
          fill: #999999;
          color: #999999;
        }
      }

      &-item {
        > div {
          background: #27292d;
          color: #fff;
        }

        span {
          background: #444444;

          svg {
            color: #cccccc;
          }
        }
      }

      &-footer {
        border-top: 1px solid #444;
      }

      &-add {
        border: 1px solid #999;
        color: #fff;

        &:hover {
          background: #ffb94a;
          border: 1px solid #ffb94a;
          color: #fff;

          svg {
            color: #fff;
          }
        }

        svg {
          color: #cccccc;
        }
      }
    }
  }
  .filter--body-option {
    background: #27292d;
    .filter--item {
      border-right-color: #cccccc;
      &:last-child {
        border-right: none;
      }
    }
    .filter--attribute-option {
      background: #27292d;
      .filter--item {
        border-right: none;
      }
    }
  }
  .option--time {
    background: #2f3136;
    .option--time-item {
      background: #27292d;
    }
    .option--repeat {
      background: #2f3136;
    }
    .option--repeat-item {
      &:hover {
        background: #27292d;
      }
    }
  }
  .option--custom {
    width: 100%;
    &-wrap {
      background: #2f3136;
    }
  }
  /********Script Footer******/
  .script--footer {
    .script--footer-addelm {
      color: #f7f7f7;

      .title {
        color: #ccc;
      }
    }

    .addelm-item {
      background-color: #27292c;
    }

    .script--footer-syntax {
      .title {
        color: #ccc;
      }

      textarea {
        background-color: #27292d;
        border: 10px solid #2f3136;
        color: #fff;
      }
    }
  }
}
</style>
