export default {
  props: {
    works: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: () => {
    return {
      newItem: "",
      dragging: -1
    };
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return;
      }
      this.works.push({
        id: Math.random(),
        title: this.newItem,
        done: false
      });
      this.newItem = "";
    },
    removeItem(item) {
      this.works.splice(this.works.indexOf(item), 1);
    },
    removeItemAt(index) {
      this.works.splice(index, 1);
    },
    dragStart(which, ev) {
      ev.dataTransfer.setData("Text", this.id);
      ev.dataTransfer.dropEffect = "move";
      this.dragging = which;
    },
    dragEnter(ev) {
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = "10px";
      } else {
        ev.target.style.marginTop = "10px";
      }
    },
    dragLeave(ev) {
      ev.target.style.marginTop = "2px";
      ev.target.style.marginBottom = "2px";
    },
    dragEnd(ev) {
      this.dragging = -1;
    },
    dragFinish(to, ev) {
      console.log(to);
      if (to == "done") {
        this.works[this.findIndex(this.dragging)].done = true;
      } else if (to == "todo") {
        this.works[this.findIndex(this.dragging)].done = false;
      } else {
        this.moveItem(this.dragging, to);
        ev.target.style.marginTop = "2px";
        ev.target.style.marginBottom = "2px";
      }
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(this.findIndex(from));
      } else {
        this.works.splice(
          this.findIndex(to),
          0,
          this.works.splice(this.findIndex(from), 1)[0]
        );
      }
    },
    findIndex(value) {
      return this.works.findIndex(x => x.id == value);
    }
  },
  computed: {
    isDragging() {
      return this.dragging > -1;
    }
  },
  // watch works change for localStorage persistence
  watch: {}
};
