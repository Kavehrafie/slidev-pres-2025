<script setup lang="ts">
import { computed } from "vue";
import Nested from "../components/Nested.vue";
import { useSlideContext } from "@slidev/client";

type ListItem = {
  id: string;
  label: string;
  class?: string;
  children?: ListItem[];
  action?: "add" | "update" | "delete";
};

type List = Array<ListItem>;
interface Props {
  sequence: List[];
}

const { sequence } = defineProps<Props>();
const { $clicks } = useSlideContext();

const currentSequence = computed(() => {
  // Start with the initial state
  const result = [...sequence[0]];

  // Apply each action up to the current click
  for (let i = 1; i <= $clicks.value && i < sequence.length; i++) {
    const seq = sequence[i];

    seq.forEach((item) => applyAction(result, item));
  }

  return result;
});

function applyAction(list: ListItem[], item: ListItem) {
  switch (item.action) {
    case "add":
      list.push(item);
      break;
    case "update":
      const indexToUpdate = list.findIndex((i) => i.id === item.id);
      if (indexToUpdate !== -1) {
        list[indexToUpdate] = { ...list[indexToUpdate], ...item };
      }
      break;
    case "delete":
      const indexToDelete = list.findIndex((i) => i.id === item.id);
      if (indexToDelete !== -1) {
        list.splice(indexToDelete, 1);
      }
      break;
    default:
      // No action specified, treat as display-only
      break;
  }
}
</script>

<template>
  <div
    class="w-full h-full p-4 gap-2 overflow-auto flex justify-center items-center"
  >
    <!-- Use Nested component for recursive list -->
    <Transition name="fade" mode="out-in">
      <Nested :items="currentSequence" />
    </Transition>

    <!-- <div class="text-red">
      Error: The number of sequences and clicks are not equal. Please check
      "clicks" value in frontmatter.
    </div> -->
  </div>
</template>
