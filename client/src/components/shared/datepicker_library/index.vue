<template>
  <div class="datetime-picker">
    <input
      type="text"
      :name="name"
      :style="inputStyle"
      :class="inputClass"
      :readonly="readonly"
      :autofocus="autofocus"
      :value="pickedValue"
      :placeholder="placeholder"
      @click="show = !show"
    />
    <div class="picker-wrap" v-show="show">
      <table class="date-picker">
        <thead>
          <tr class="date-head">
            <th colspan="3">
              <span class="btn-prev" @click="monthClick(-1)">&lt;</span>
              <span class="show-month">{{ months[now.getMonth()] }}</span>
              <span class="btn-next" @click="monthClick(1)">&gt;</span>
            </th>
            <th colspan="4">
              <span class="btn-prev" @click="yearClick(-1)">&lt;</span>
              <span class="show-year">{{ now.getFullYear() }}</span>
              <span class="btn-next" @click="yearClick(1)">&gt;</span>
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
              {{ date[i * 7 + j] && date[i * 7 + j].text }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
