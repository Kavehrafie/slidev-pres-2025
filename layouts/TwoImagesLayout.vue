<style>
.flex-1 {
  max-height: calc(100% - 1.5rem) !important;
}
</style>
<template>
  <div class="grid grid-cols-2 h-full w-full gap-4 p-4">
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-hidden flex items-center justify-center">
        <img :src="image1" class="max-h-full max-w-full object-contain" />
      </div>
      <div class="text-xs italic text-center text-base mt-2">
        <slot name="caption1" />
      </div>
    </div>
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-hidden flex items-center justify-center">
        <img :src="image2" class="max-h-full max-w-full object-contain" />
      </div>
      <div class="text-xs italic text-center text-base mt-2">
        <slot name="caption2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ image1: string; image2: string }>();
</script>
