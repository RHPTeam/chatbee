<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th
            v-for="(field, index) in Object.keys(data[0])"
            :key="index"
            @click="sort('' + field + '')"
          >
            {{ field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, index) in sortedData" :key="index">
          <td v-for="item in cat" :key="item">{{ item }}</td>
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
