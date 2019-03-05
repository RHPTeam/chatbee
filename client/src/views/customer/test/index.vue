<template>
 <div id='app'>
  <ul class="todo-list">
    <li @dragover.prevent @drop="dragFinish(-1, $event)" v-if="dragging > -1" class="trash-drop todo-item" v-bind:class="{drag: isDragging}">Delete</li>
    
    <li v-else>
      <input placeholder="Type new task and press enter" type="text" class="new-todo todo-item" v-model="newItem" @keyup.enter="addItem">
    </li>
    
    <li class="todo-item" v-for="(item,i) in todos" :key="item.id" draggable="true" @dragstart="dragStart(i, $event)" @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="dragFinish(i, $event)">
      <input type="checkbox" v-model="item.done" />
      <span :class="{done: item.done}">{{ item.title }}</span>
      <span class="remove-item" @click="removeItem(item)">x</span>
    </li>
  </ul>
</div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
  @import "./index.style";
</style>