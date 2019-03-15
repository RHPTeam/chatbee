<template>
  <div>
    <div @click="toggleShow" class="anchor">
        <icon-base
                class="icon"
                icon-name="more"
                width="20"
                height="20"
                viewBox="0 0 780 780"
        >
            <icon-more />
        </icon-base>
    </div>
    <div v-if="showMenu" class="menu">
      <div
        class="menu-item"
        v-for="item in this.items"
        @click="itemClicked(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      showMenu: false
    };
  },
  props: ["items"],
  methods: {
    toggleShow: function() {
      this.showMenu = !this.showMenu;
    },
    itemClicked: function(item) {
      this.toggleShow();
      this.onClick(item);
    }
  }
};
</script>
<style lang="scss" scoped>
.anchor {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #27ae60;
  border-color: #27ae60;
}


.anchor:hover {
  color: #fff;
  background-color: #229954;
  border-color: #229954;
  cursor: pointer;
}

.menu {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  color: #212529;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  list-style: none;
  margin: 0.125rem 0 0;
  padding: 0.5rem 0;
  position: absolute;
  text-align: left;
}

.menu-item {
  color: #212529;
  padding: 0.25rem 1.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.menu-item:hover {
  background-color: #f4f6f6;
  cursor: pointer;
}

span {
  font-weight: bold;
  color: #229954;
  font-size: 1.25rem;
}
</style>
