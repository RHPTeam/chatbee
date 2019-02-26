<template>
  <div class="calendar">
    <div class="datetime-picker">
      <div class="picker-wrap">
        <table class="date-picker">
          <thead>
            <tr class="date-head">
              <th colspan="4">
                <span class="btn_prev" @click="yearClick(-1)">&lt;</span>
                <span class="show-year">{{ now.getFullYear() }}</span>
                <span class="btn_next" @click="yearClick(1)">&gt;</span>
              </th>
              <th colspan="2">
                <span class="btn_prev" @click="monthClick(-1)">&lt;</span>
                <span class="show-month">{{ months[now.getMonth()] }}</span>
                <span class="btn_next" @click="monthClick(1)">&gt;</span>
              </th>
              <th>
                <select>
                  <option>Day</option>
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </th>
            </tr>
            <tr class="date-days">
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, i) in 6" :key="i">
              <td
                v-for="(v, j) in 7"
                :key="j"
                :class="date[i * 7 + j] && date[i * 7 + j].status"
                :date="date[i * 7 + j] && date[i * 7 + j].date"
                @click="pickDate(i * 7 + j)"
              >
                <div class="day">
                  {{ date[i * 7 + j] && date[i * 7 + j].text }}
                </div>
                <div
                  v-for="item in dates"
                  :key="item.id"
                  v-if="
                    date[i * 7 + j] &&
                      date[i * 7 + j].time.getFullYear() ==
                        item.time_at.getFullYear() &&
                      date[i * 7 + j] &&
                      date[i * 7 + j].time.getMonth() ==
                        item.time_at.getMonth() &&
                      date[i * 7 + j] &&
                      date[i * 7 + j].time.getDate() == item.time_at.getDate()
                  "
                  class="item"
                >
                  {{ formatAMPM(item.time_at) + "-" + item.title }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="show" class="add">
        <transition name="fade">
          <form v-if="show" class="add_date">
            <h3>Đặt lịch ngày {{ pickedValue }}</h3>
            <div class="form_group">
              <table class="table table_striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Tiêu đề</th>
                    <th scope="col">Nội dung</th>
                    <th scope="col">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in dates"
                    :key="item.id"
                    v-if="stringify(item.time_at) == pickedValue"
                    class="add_item"
                  >
                    <th scope="row">1</th>
                    <td>{{ formatAMPM(item.time_at) }}</td>
                    <td>{{ item.title }}</td>
                    <td>Bài viết abc</td>
                    <td>
                      <span class="edit" @click="edit(item)">Sửa </span> ||
                      <span class="delete" @click="remove(item.id)"> Xóa </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form_group">
              <label for="exampleInputEmail1">Thời gian</label>
              <div class="r">
                <div class="c_md_2">
                  <input
                    type="number"
                    max="2"
                    v-model="gettersHour"
                    class="form_control"
                    placeholder="00"
                  />
                </div>
                <span style="margin-top: 5px;"> : </span>
                <div class="c_md_2">
                  <input
                    type="number"
                    max="2"
                    v-model="gettersMinute"
                    class="form_control"
                    placeholder="00"
                  />
                </div>
              </div>
            </div>
            <div class="form_group">
              <label for="exampleInputEmail1">Tiêu đề</label>
              <input
                type="text"
                v-model="item.title"
                class="form_control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nhập tiêu đề"
              />
            </div>
            <div class="btn_group mr_2" role="group" aria-label="Third group">
              <button type="button" @click="action()" class="btn btn_success">
                {{ acctionStt ? "Thêm" : "Sửa" }}
              </button>
            </div>
            <div class="btn_group" role="group" aria-label="Third group">
              <button type="reset" @click="hide()" class="btn btn_secondary">
                Thoát
              </button>
            </div>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
