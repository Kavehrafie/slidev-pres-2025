<script setup lang="ts">
import { computed } from "vue";
import Nested from "../components/Nested.vue";
import { useSlideContext } from "@slidev/client";
import { transformVNodeArgs } from "vue";

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
  const result = JSON.parse(JSON.stringify(sequence[0])); // Deep copy to avoid mutating original

  // Apply each action up to the current click
  for (let i = 1; i <= $clicks.value && i < sequence.length; i++) {
    const currentStepActions = sequence[i];

    currentStepActions.forEach((actionItem) => applyAction(result, actionItem));
  }

  return result;
});

function findItemAndParent(
  list: ListItem[],
  id: string,
  parent: ListItem | null = null,
  parentList: ListItem[] | null = null,
): {
  item: ListItem | null;
  parentItem: ListItem | null;
  listRef: ListItem[] | null;
  index: number;
} {
  for (let i = 0; i < list.length; i++) {
    const currentItem = list[i];
    if (currentItem.id === id) {
      return {
        item: currentItem,
        parentItem: parent,
        listRef: parentList || list,
        index: i,
      };
    }
    if (currentItem.children) {
      const found = findItemAndParent(
        currentItem.children,
        id,
        currentItem,
        currentItem.children,
      );
      if (found.item) {
        return found;
      }
    }
  }
  return { item: null, parentItem: null, listRef: null, index: -1 };
}

function applyAction(list: ListItem[], actionItem: ListItem) {
  const { item, parentItem, listRef, index } = findItemAndParent(
    list,
    actionItem.id,
  );

  switch (actionItem.action) {
    case "add":
      // Adding a new top-level item or a child to an existing item.
      // If actionItem.id is intended to be the parent's id for adding children,
      // this logic needs adjustment. Assuming actionItem.id is for the new item.
      if (parentItem && parentItem.children) {
        // Add as child
        parentItem.children.push(JSON.parse(JSON.stringify(actionItem)));
      } else {
        // Add as top-level item
        // If item exists, this 'add' might mean 'add to its children' or 'add after it'
        // For now, let's assume it means adding a new item to the root if not found.
        // Or, if actionItem has a 'parentId' property, use that.
        // This 'add' case needs clarification if it's not for top-level.
        // Let's assume for now, 'add' at root means pushing to the main list.
        // If actionItem.id is for a *new* item, it won't be found by findItemAndParent unless it's a child.
        // Let's reconsider. If 'add', it implies the item does not exist yet in its final position.
        // The current findItemAndParent looks for an existing item with actionItem.id.
        // This needs robust handling based on where the item should be added.
        // For simplicity now, let's assume 'add' adds to the root if not part of a specific parent in action.
        // A common pattern is to have a 'parentId' in actionItem.
        // Without it, if 'item' is null, we can add to the root list.
        if (!item) {
          list.push(JSON.parse(JSON.stringify(actionItem)));
        }
        // If item *is* found, and action is 'add', it's ambiguous.
        // Let's assume if children are specified in actionItem, it's an update to add children.
        else if (actionItem.children && item) {
          item.children = JSON.parse(JSON.stringify(actionItem.children));
          // Ensure other properties from actionItem are also updated if needed.
          Object.assign(item, { ...actionItem, children: item.children });
        }
      }
      break;
    case "update":
      if (item && listRef) {
        // Preserve existing children if not overridden by the actionItem
        const existingChildren = item.children;
        // Update the item by merging. actionItem properties take precedence.
        Object.assign(item, JSON.parse(JSON.stringify(actionItem)));
        // If actionItem explicitly sets children (even to []), use that.
        // If actionItem does not mention children, keep existing.
        if (!actionItem.hasOwnProperty("children")) {
          item.children = existingChildren;
        }
      }
      break;
    case "delete":
      if (item && listRef && index !== -1) {
        listRef.splice(index, 1);
      }
      break;
    default:
      // No action specified or 'display-only' could be handled here if needed.
      // If item is found without explicit action, it effectively remains.
      // If an item from a previous step isn't in the current step's action list,
      // it persists due to starting from `sequence[0]` and incrementally updating.
      break;
  }
}
</script>

<template>
  <div
    class="w-full h-full p-4 gap-2 overflow-auto flex justify-center items-center"
  >
    <slot />

    <!-- Nested component directly used, without outer Transition -->
    <Nested :items="currentSequence" />
    <!--
    <div v-if="$slidev.configs.dev && $clicks > sequence.length -1 " class="text-xs absolute bottom-2 right-2 p-1 bg-red-500 text-white rounded">
      Warning: $clicks ({{ $clicks }}) exceeds sequence length ({{ sequence.length }}).
    </div>
    -->
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here if needed */
</style>
