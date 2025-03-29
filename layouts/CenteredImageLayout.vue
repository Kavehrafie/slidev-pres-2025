<template>
  <div class="grid h-full w-full" style="grid-template-rows: 1fr auto">
    <div
      class="flex items-center justify-center h-full w-full p-4 min-h-[0] min-w-[0]"
    >
      <img
        :src="image"
        class="h-full w-full max-h-full max-w-full object-center-center object-contain"
      />
    </div>
    <div class="text-xs text-center pb-4 pt-2 text-base-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ image: string }>();
</script>
