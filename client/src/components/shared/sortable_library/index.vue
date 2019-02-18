<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('age')">Age</th>
          <th @click="sort('breed')">Breed</th>
          <th @click="sort('gender')">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, index) in sortedData" :key="index">
          <td>{{ cat.name }}</td>
          <td>{{ cat.age }}</td>
          <td>{{ cat.breed }}</td>
          <td>{{ cat.gender }}</td>
        </tr>
      </tbody>
    </table>
    <p>
      Sort
      <button @click="setSort">{{ enableSort == true ? "On" : "Off" }}</button>
    </p>
    <p>
      Show all
      <button @click="setPagination">
        {{ enablePagination == true ? "On" : "Off" }}
      </button>
    </p>
    <p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </p>
    Show: sort={{ currentSort }}, dir={{ currentSortDir }}, page={{
      currentPage
    }}
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
