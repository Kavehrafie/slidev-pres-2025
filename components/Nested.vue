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

const { items, depth } = defineProps({
  items: {
    type: Array as PropType<List>,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
});

const getDelay = (index: number) => {
  return `${index * 50}ms`; // Staggering for li items
};

// --- JavaScript Transition Hooks for children container ---

const onBeforeEnter = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.maxHeight = "0px";
};

const onEnter = (el: HTMLElement, done: () => void) => {
  // Set transition properties
  el.style.transitionProperty = "max-height, opacity";
  el.style.transitionTimingFunction = "ease-in-out";
  el.style.transitionDuration = "300ms"; // Adjust duration as needed

  // Wait for the next frame to apply "to" styles and ensure scrollHeight is correct
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.maxHeight = el.scrollHeight + "px";
  });

  // Call done when the transition finishes
  el.addEventListener("transitionend", done, { once: true });
};

const onAfterEnter = (el: HTMLElement) => {
  // Reset maxHeight to allow content to dictate height naturally
  el.style.maxHeight = "";
  // Optional: Clean up transition properties if they were set for this specific transition
  // el.style.transitionProperty = "";
  // el.style.transitionTimingFunction = "";
  // el.style.transitionDuration = "";
};

const onBeforeLeave = (el: HTMLElement) => {
  // Set initial state for leaving (current height)
  el.style.maxHeight = el.scrollHeight + "px";
  el.style.opacity = "1";

  // Set transition properties
  el.style.transitionProperty = "max-height, opacity";
  el.style.transitionTimingFunction = "ease-in-out";
  el.style.transitionDuration = "300ms"; // Adjust duration as needed
};

const onLeave = (el: HTMLElement, done: () => void) => {
  // Wait for the next frame to apply "to" styles
  requestAnimationFrame(() => {
    el.style.opacity = "0";
    el.style.maxHeight = "0px";
  });

  // Call done when the transition finishes
  el.addEventListener("transitionend", done, { once: true });
};

const onAfterLeave = (el: HTMLElement) => {
  // Optional: Clean up styles after leave
  // el.style.opacity = "";
  // el.style.maxHeight = "";
  // el.style.transitionProperty = "";
  // el.style.transitionTimingFunction = "";
  // el.style.transitionDuration = "";
};
</script>

<template>
  <TransitionGroup
    :data-depth="depth"
    tag="ol"
    name="list"
    class="list-decimal"
    appear
  >
    <li
      v-for="(item, index) in items"
      :key="item.id"
      :class="[item?.class, 'transition-color duration-500 ease-out']"
      :style="{ 'transition-delay': getDelay(index) }"
    >
      {{ item.label }}
      <transition
        name="expand"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
      >
        <div
          v-if="item.children && item.children.length > 0"
          class="children-container"
        >
          <Nested :items="item.children" :depth="depth + 1" />
        </div>
      </transition>
    </li>
  </TransitionGroup>
</template>

<style scoped>
ol {
  padding-left: calc(1rem * v-bind("depth")); /* Indentation based on depth */
  font-size: calc(
    7rem / (v-bind("depth") + 5)
  ); /* Scale font size with depth */
  position: relative; /* Needed for TransitionGroup move animations */
  list-style-position: outside; /* Ensures list markers are outside the flow if padding is used extensively */
  margin-left: 1rem; /* Additional margin for deeper levels if needed */
}

/* Styles for the <li> elements themselves (handled by TransitionGroup "list") */
.list-enter-active {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  /* 'transition-delay' is applied inline via :style for staggering */
}
.list-enter-from {
  opacity: 0;
  transform: translateX(15px) scale(0.95);
}
.list-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.list-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute; /* Allows other items to smoothly fill the space */
  width: 100%; /* Prevent shrinking during leave if text wraps */
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-15px) scale(0.95);
}

.list-move {
  transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

/* Styles for the children container's expand/collapse transition */
.children-container {
  overflow: hidden; /* Crucial for the max-height animation to work visually */
  /*
    Transition properties (duration, timing-function, property) for max-height and opacity
    are set directly in the JavaScript hooks. No .expand-enter-active CSS needed for these properties.
  */
}
</style>
