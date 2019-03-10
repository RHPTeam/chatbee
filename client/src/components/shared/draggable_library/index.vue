<template>
  <div id='app'>
    <div @dragover.prevent @drop="dragFinish(-1, $event)" v-if="dragging > -1" class="trash-drop todo-item"
      v-bind:class="{drag: isDragging}">Delete</div>

    <div v-else>
      <input placeholder="Type new task and press enter" type="text" class="new-todo todo-item" v-model="newItem"
        @keyup.enter="addItem">
    </div>
    <div class="r todo-list">

      <div class="c_md_6" id="todo" draggable="true"  @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="dragFinish('todo', $event)">
        <h2>Todo</h2>
        <div class="c_md_12 todo-item" v-for="(item) in works" :key="item.id" draggable="true" @dragstart="dragStart(item.id, $event)"
          @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="dragFinish(item.id, $event)"
          v-if="item.done==false"
          >
          <input type="checkbox" v-model="item.done" />
          <span :class="{done: item.done}">{{ item.title }}</span>
          <span class="remove-item" @click="removeItem(item)">x</span>
        </div>
      </div>
      <div class="c_md_6" id="done" draggable="true"  @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="dragFinish('done', $event)">
        <h2 id="done">Done</h2>
        <div class="c_md_12 todo-item" v-for="(item) in works" :key="item.id" draggable="true" @dragstart="dragStart(item.id, $event)"
          @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="dragFinish(item.id, $event)"
            v-if="item.done==true"
          >
          <input type="checkbox" v-model="item.done" />
          <span :class="{done: item.done}">{{ item.title }}</span>
          <span class="remove-item" @click="removeItem(item)">x</span>
        </div>
      </div>


    </div>
  </div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
  @import "./index.style";
</style>