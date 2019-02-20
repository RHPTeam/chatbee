<template>
  <div class="main--draggable mt_4">
    <ul class="todo--list ml_3">
      <li
        @dragover.prevent
        @drop="dragFinish(-1, $event)"
        v-if="dragging > -1"
        class="trash-drop todo-item"
        v-bind:class="{ drag: isDragging }"
      >
        Delete
      </li>

      <li v-else>
        <input
          placeholder="Type new task and press enter"
          type="text"
          class="new-todo todo-item"
          v-model="newItem"
          @keyup.enter="addItem"
        />
      </li>

      <li
        class="todo-item"
        v-for="(item, i) in todos"
        :key="i"
        draggable="true"
        @dragstart="dragStart(i, $event)"
        @dragover.prevent
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragend="dragEnd"
        @drop="dragFinish(i, $event)"
      >
        <input type="checkbox" v-model="item.done" />
        <span :class="{ done: item.done }">{{ item.title }}</span>
        <span class="remove-item" @click="removeItem(item)">x</span>
      </li>
    </ul>
  </div>
</template>
<script src="draggable-index.js"></script>
<style scoped>
@import "draggable-index.scss";
</style>
