<script setup lang="ts">
import { computed, type PropType } from "vue";

type ListItem = {
  id: string;
  label: string;
  class?: string;
  children?: ListItem[];
  action?: "add" | "update" | "delete";
};

type List = Array<ListItem>;

const { depth } = defineProps({
  items: {
    type: Array as PropType<List>,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <TransitionGroup
    :data-depth="depth"
    tag="ol"
    name="list"
    class="list-decimal relative"
  >
    <li
      v-for="item in items"
      :key="item.id"
      :class="[item?.class, 'transition-all duration-350']"
    >
      {{ item.label }}
      <Nested v-if="item?.children" :items="item.children" :depth="depth + 1" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
ol {
  padding-left: calc(1rem * v-bind("depth"));
}
</style>
