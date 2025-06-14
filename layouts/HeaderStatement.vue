<script setup lang="ts">
const props = defineProps({
  scale: {
    type: Number,
    default: 1,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  opacity: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="items-center justify-center flex h-full w-full p-10">
    <div>
      <div
        v-motion
        :initial="{
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          transition: { type: 'keyframes', ease: 'easeOut' },
        }"
        :click-1="{
          scale,
          x,
          y,
          opacity,
          transition: { type: 'keyframes', ease: 'easeOut' },
        }"
      >
        <slot />
      </div>

      <v-click>
        <slot name="statement" />
      </v-click>
    </div>
  </div>
</template>
