
<template>
    <div id="app">

        <table>
            <thead>
                <tr>
                    <th  @click="sort('name')">Name</th>
                    <th @click="sort('age')">Age</th>
                    <th @click="sort('breed')">Breed</th>
                    <th @click="sort('gender')">Gender</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in sortedData">
                    <td>{{cat.name}}</td>
                    <td>{{cat.age}}</td>
                    <td>{{cat.breed}}</td>
                    <td>{{cat.gender}}</td>
                </tr>
            </tbody>
        </table>
        <p>
            Sort
            <button @click="setSort">{{enableSort==true?"On":"Off"}}</button>
        </p>
        <p>
            Show all
            <button @click="setPagination">{{enablePagination==true?"On":"Off"}}</button>
        </p>
        <p>
            <button @click="prevPage">Previous</button>
            <button @click="nextPage">Next</button>
        </p>

        Show: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}}
    </div>
</template>

<script>
    export default {
        props:['data','currentSort','currentSortDir','pageSize','currentPage','enablePagination','enableSort'],
        
        
        methods: {
            setPagination:function(){
                this.enablePagination = !this.enablePagination;
               
                this.$emit("enablePagination",this.enablePagination);
            },
            setSort:function(){
                this.enableSort=!this.enableSort;
                this.$emit("enableSort",this.enableSort);
            },
            sort: function (s) {
                //if s == current sort, reverse
                if(this.enableSort==true){
                    if (s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                    this.$emit("currentSortDir",this.currentSortDir)
                    }
                    this.currentSort = s;
                    this.$emit("currentSort",this.currentSort);
                }
            },
            nextPage: function () {
                if ((this.currentPage * this.pageSize) < this.data.length) this.currentPage++;
                this.$emit("currentPage",this.currentPage);
            },
            prevPage: function () {
                if (this.currentPage > 1) this.currentPage--;
                this.$emit("currentPage",this.currentPage);
            }

        },
        computed: {
            sortedData: function () {
                if(this.enablePagination==true){
                     return this.data.sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDir === 'desc') modifier = -1;
                    if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                    })
                }else{
                    return this.data.sort((a, b) => {
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