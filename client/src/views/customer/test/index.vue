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
                <tr v-for="cat in sortedCats">
                    <td>{{cat.name}}</td>
                    <td>{{cat.age}}</td>
                    <td>{{cat.breed}}</td>
                    <td>{{cat.gender}}</td>
                </tr>
            </tbody>
        </table>
        <p>
            <button @click="prevPage">Previous</button>
            <button @click="nextPage">Next</button>
        </p>

        Show: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
            cats: [{"name":"Alpha","age":2,"breed":"Calico","gender":"male"},{"name":"Beta","age":1,"breed":"Siamese","gender":"female"},{"name":"Gamma","age":6,"breed":"Calico","gender":"female"},{"name":"Delta","age":5,"breed":"Bengal","gender":"male"},{"name":"Epsilon","age":2,"breed":"Calico","gender":"female"},{"name":"Fenris","age":10,"breed":"Bengal","gender":"male"},{"name":"Gorf","age":4,"breed":"Calico","gender":"female"},{"name":"Hary","age":6,"breed":"Siamese","gender":"male"},{"name":"Irdis","age":1,"breed":"Siamese","gender":"female"},{"name":"Joker","age":7,"breed":"Calico","gender":"female"}],
            currentSort: 'name',
            currentSortDir: 'asc',
            pageSize: 3,
            currentPage: 1
            }
        },
        
        methods: {
            sort: function (s) {
                //if s == current sort, reverse
                if (s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = s;
            },
            nextPage: function () {
                if ((this.currentPage * this.pageSize) < this.cats.length) this.currentPage++;
            },
            prevPage: function () {
                if (this.currentPage > 1) this.currentPage--;
            }

        },
        computed: {
            sortedCats: function () {
                
                return this.cats.sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDir === 'desc') modifier = -1;
                    if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                }).filter((row, index) => {
                    let start = (this.currentPage - 1) * this.pageSize;
                    let end = this.currentPage * this.pageSize;
                    if (index >= start && index < end) return true;
                });
            }
        }
    }
</script>

<style scoped>
    td,
    th {
        padding: 5px;
    }

    th {
        cursor: pointer;
    }
</style>