import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore(
  'todos',
  () => {
    const todos = ref([]);

    function create(name) {
      todos.value.push({
        id: Date.now(),
        name,
        done: false,
      });
    }

    function remove(index) {
      todos.value.splice(index, 1);
    }

    return { todos, create, remove };
  },
  { persist: true },
);
